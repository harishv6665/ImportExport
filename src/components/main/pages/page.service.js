// page template service
angular.module('BookKeeper')
	.service('PageService', [
		"$rootScope",
		"$stateParams",
		"Restangular",
		"$filter",
		"HeaderService",
		function($rootScope, $stateParams, Restangular, $filter, HeaderService){

			var self = this;
			
			self.updateFields = function(category) {
				return HeaderService[category || $stateParams.page] || { };
			};

			self.getData = function ({category, page, userid}){
				return Restangular.one("item/view")
					.get({category, page, userid})
					.then(function({data}){
						
						data.dataOrder = {
							...HeaderService.headers,
							...self.updateFields(category)
						};
						
						data.headers = [...data.headers.slice(0,1), 'ACTIONS', 
							...data.headers.slice(1)];
						return data
					})
			};

			self.delete = function ({id}){
				console.log("delete", id)
				return Restangular.one("item/view", $stateParams.page)
				.one(id)
				.remove()
			}

			self.update = function ({page, id, data}){
				return Restangular.one("item/add", page).one(id)
				.customPUT(data)
			}


			self.modifyDateTime = function(cell) {
				let data = {}
				if (cell[$stateParams.page + "ItemEntryDate"])
					data[$stateParams.page + "ItemEntryDate"] = $filter('date')(cell[$stateParams.page+ "ItemEntryDate"], 'dd/MM/yyyy');
				if (cell[$stateParams.page + "ItemEntryTime"])
					data[$stateParams.page + "ItemEntryTime"] = HeaderService.converttotime(cell[$stateParams.page+ "ItemEntryTime"]);
				if (cell[$stateParams.page + "EntryDate"])
					data[$stateParams.page + "EntryDate"] = $filter('date')(cell[$stateParams.page+ "EntryDate"], 'dd/MM/yyyy');
				if (cell["entryDate"])
					data["entryDate"] = $filter('date')(cell["entryDate"], 'dd/MM/yyyy');
				if (cell["entryTime"])
					data["entryTime"] = HeaderService.converttotime(cell[$stateParams.page+ "entryTime"]);

				return data;
			}

			self.create = function ({page, data}){
				let convertedDatetime = self.modifyDateTime (data)

				return Restangular.one("item/add", page)
				.customPOST({
					...data,
					...convertedDatetime||{},
					userId: Number(sessionStorage.getItem("user"))
				})
			}
		}
])