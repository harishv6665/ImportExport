angular.module('BookKeeper').directive('bkHeader', ["Restangular",
 "$state",
 function(Restangular, $state) {
    return {
        templateUrl : "/dist/views/header.html",
        restrict: "E",
        controller: ["$scope", function($scope){

                	$scope.logout = function(){
                		console.log("...")
                		Restangular.one("user/logout")
                		.get({ user: sessionStorage.getItem("user")})
                			.then(function(){
                			sessionStorage.clear()
                			$state.go("login")
                		})
                	}
                }]
    };
}
]);