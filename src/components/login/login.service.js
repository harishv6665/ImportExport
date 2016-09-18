// vinoj
angular.module('BookKeeper')
	.service('LoginService', [
		"$rootScope",
		"$state",
		"$stateParams",
		"Restangular",
		function($rootScope, $state, $stateParams, Restangular){
			var self = this;
			let save = function (response){
				sessionStorage.setItem("user", response.data.userid);
				sessionStorage.setItem("username", `${response.data.users[0].firstName} ${response.data.users[0].lastName}`);
				sessionStorage.setItem("token", response.sessionId);
			};

			self.login =  function ({ username, password, role}) {
				$rootScope.showLoader = true;

				return Restangular.one("login")
					.customPOST({username, password, role})
					.then(function (response) {
						if (response.successMessage === 'login successful') {
							
							save(response)
							$state.go("main.page", { page: "aggrade"})
							return response;
						}
					})
			};
		}
])