angular.module('BookKeeper').directive('bkHeader', ["Restangular", "$rootScope",
 "$state",
 function(Restangular, $rootScope, $state) {
    return {
        templateUrl : "/dist/views/header.html",
        restrict: "E",
        controller: ["$scope", function($scope){
                    $scope.username = sessionStorage.getItem("username");
                    
                	$scope.logout = function(){
                        $rootScope.showLoader = true;
                		Restangular.one("user/logout")
                		.get({ id: sessionStorage.getItem("user")})
                			.then(function(){
                                $rootScope.showLoader = false;
                			sessionStorage.clear()
                			$state.go("login")
                		})
                	}
                }]
    };
}
]);