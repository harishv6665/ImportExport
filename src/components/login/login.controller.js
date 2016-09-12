angular.module('BookKeeper')
	.controller('LoginController', [
		"$rootScope",
		"$stateParams",
		function(Data, $rootScope, $stateParams){
			var self = this;

			self.validate = function(form, { name, password }) {
				if (form.$valid) {
					service.login({name, password})
				}
			}

		}
])