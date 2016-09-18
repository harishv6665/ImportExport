angular.module('BookKeeper')
	.controller('LoginController', [
		"$rootScope",
		"$stateParams",
		"LoginService",
		function($rootScope, $stateParams, service){
			var self = this;
			self.username = ""
			self.password = ""
			console.log("login controlller")
			self.validate = function(form) {
				console.log("validate function called", form.$valid)
				if (form.$valid) {
					service.login({
						username: self.username,
						password: self.password,
						role: self.userType
					})
				}
			}

		}
])