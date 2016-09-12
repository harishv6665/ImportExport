// page template service
angular.module('BookKeeper')
	.service('PageService', [
		"$rootScope",
		"$stateParams",
		"Restangular",
		function($rootScope, $stateParams, Restangular){
			var self = this;

			self.getData = function ({page, params}){
				return Restangular.one("rest", page).get(params)
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