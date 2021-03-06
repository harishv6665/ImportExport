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
				sessionStorage.setItem("username", `${response.data.firstName} ${response.data.lastName||''}`);
				sessionStorage.setItem("token", response.sessionId);
				sessionStorage.setItem("isAdmin", response.redirectParam === "/admin");

			};

			self.login =  function ({ username, password, role}) {
				$rootScope.showLoader = true;

				return Restangular.one("login")
					.customPOST({username, password, role})
					.then(function (response) {
						console.log(response)
						$rootScope.showLoader = false;
						if (response.successMessage === 'login successful') {
							
							save(response)
							console.log(response);
							if(response.redirectParam == '/admin'){
								$state.go("main.page", { page: "admin"})
							} else {
								$state.go("main.page", { page: "aggrade"})
							}
							return response;
						}
					})
			};
		}
])