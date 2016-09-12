angular.module('BookKeeper')
	.service('LoginService', [
		"$rootScope",
		"$stateParams",
		function(Data, $rootScope, $stateParams){
			var self = this;

			let save = function (data){
				sessionStorage.setItem("session", data);
			}

			self.login =  function ({ username, password}) {
				$rootScope.showLoader = true;

				return Restangular.one("rest/auth/login")
					.customPOST({username, password})
					.then(function (response) {
						if (response.success) {
							save(response)
							return response;
						}
					})
			}
		}
])