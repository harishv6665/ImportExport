// page template service
angular.module('BookKeeper')
	.service('PageService', [
		"$rootScope",
		"$stateParams",
		"Restangular",
		function($rootScope, $stateParams, Restangular){

			var self = this;
			var aggrade = ["id", "action", "aggradeItemEntryDate", "aggradeItemEntryTime", "tripSheetNumber","vehicleNumber","supplierName","material","quantityInTonnes","ratePerTonne","totalAmount","created","lastmodified","buserid"]
			self.getData = function ({category, page, userid}){
				return Restangular.one("item/view")
					.get({category, page, userid})
					.then(function({data}){
						data.dataOrder = aggrade;
						data.headers = [...data.headers.slice(0,1), 'Actions', 
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

			self.create = function ({page, data}){
				return Restangular.one("item/add", page)
				.customPOST(data)
			}
		}
])