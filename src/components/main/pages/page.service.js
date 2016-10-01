// page template service
angular.module('BookKeeper')
	.service('PageService', [
		"$rootScope",
		"$state",
		"$stateParams",
		"Restangular",
		"$filter",
		"HeaderService",
		function($rootScope, $state, $stateParams, Restangular, $filter, HeaderService){

			var self = this;

			self.updateFields = function(category) {
				return HeaderService[category || $stateParams.page] || { };
			};

			self.getData = function ({category, page, userid}){
				$rootScope.showLoader = true;
				return Restangular.one("item/view")
					.get({category, page, userid})
					.then(function({data}){
						$rootScope.showLoader = false;
						data.dataOrder = {
							...HeaderService.headers||[],
							...self.updateFields(category)
						};

						data.headers = [...(data.headers || []).slice(0,1), 'ACTIONS',
							...(data.headers || []).slice(1)];
						return data
					})
			};

			self.getUsers = function ({category, userid}){
				$rootScope.showLoader = true;
				return Restangular.one("user/list")
					.get({adminId: userid})
					.then(function({data}){
						$rootScope.showLoader = false;
						data.headers = ["FIRST NAME", "LAST NAME", "USER ID", "ROLE", "PHONE NUMBER"]
						data.dataOrder = {
								...HeaderService.headers||[],
						...self.updateFields(category)
					};

						data.headers = [...(data.headers || []).slice(0,1), 'ACTIONS',
						...(data.headers || []).slice(1)];

						data.itemsData = data.users;

						return data
					})
			};

			self.delete = function ({id, userid}){
				$rootScope.showLoader = true;

                if(sessionStorage.getItem("isAdmin") == "true") {
                    console.log("item id", userid);
                    return Restangular.one("user/delete")
                        // .get({userid: sessionStorage.getItem('user'), category: $stateParams.page, itemid: id})
                        .get({adminId: sessionStorage.getItem('user'), userId: userid})
                        .then(function(data){
                            $rootScope.showLoader = false;
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true, inherit: false, notify: true
                            });
                        })
                } else {
                    return Restangular.one("item/delete")
                        .get({userid: sessionStorage.getItem('user'), category: $stateParams.page, itemid: id})
                        .then(function(data){
                            $rootScope.showLoader = false;
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true, inherit: false, notify: true
                            });
                        })
                }

			}

			self.update = function ({page, id, data}){
				$rootScope.showLoader = true;
				return Restangular.one("item/add", page).one(id)
				.customPUT(data)
			}


			self.modifyDateTime = function(cell) {
				let data = {};
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
				if (cell["invoiceDate"])
					data["invoiceDate"] = $filter('date')(cell["invoiceDate"], 'dd/MM/yyyy');
				if (cell["outputDate"])
					data["outputDate"] = $filter('date')(cell["outputDate"], 'dd/MM/yyyy');
				if (cell[ "outputTime"])
					data[ "outputTime"] = HeaderService.converttotime(cell["outputTime"]);

				return data;
			}

			self.create = function ({page, data}){
				$rootScope.showLoader = true;
				let convertedDatetime = self.modifyDateTime (data)

				if(sessionStorage.getItem('isAdmin') == "true") {
					return Restangular.one("user/create")
						.customPOST({
							...data,
						adminId: Number(sessionStorage.getItem("user"))
				}).then(function(response){
						$rootScope.showLoader = false;
						return response
					})
				} else {
					return Restangular.one("item/add", page)
						.customPOST({
							...data,
						...convertedDatetime||{},
						lastmodified: "",
						userId: Number(sessionStorage.getItem("user"))
				}).then(function(response){
						$rootScope.showLoader = false;
						return response
					})
				}

			}
		}
])