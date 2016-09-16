// page template service
angular.module('BookKeeper')
	.service('PageService', [
		"$rootScope",
		"$stateParams",
		"Restangular",
		function($rootScope, $stateParams, Restangular){

			var self = this;
			var aggrade = ["id", "aggradeItemEntryDate", "aggradeItemEntryTime", "tripSheetNumber","vehicleNumber","supplierName","material","quantityInTonnes","ratePerTonne","totalAmount","created","lastmodified","buserid"]
			self.getData = function ({category, page, userid}){
				return Restangular.one("/item/view")
					.get({category, page, userid})
					.then(function({data}){
						data.dataOrder = aggrade;
						return data
					})
			};

			self.delete = function ({page, id}){
				return Restangular.one("rest", page).one(id)
				.remove()
			}

			self.update = function ({page, id, data}){
				return Restangular.one("rest", page).one(id)
				.customPUT(data)
			}

			self.create = function ({page, data}){
				return Restangular.one("rest", page)
				.customPOST(data)
			}
		}
])