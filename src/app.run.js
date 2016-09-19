angular.module('BookKeeper')
    .run(["$rootScope", 
    	"Restangular",
    	"$state",
    	function ($rootScope, Restangular, $state) {

    		if (!sessionStorage.getItem("token") && $state.current.name !== 'login'){
    			sessionStorage.clear()
    			$state.go("login")
    		}

        	$rootScope.$on('$stateChangeStart', function () {
				$rootScope.showLoader = false;

            });

            Restangular.setErrorInterceptor(function (response) {
	            $rootScope.showLoader = false;
	            console.log("response", response)
	            if (response.status === 422 && $state.current.name !== 'login') {
	            	sessionStorage.clear();
	                $state.go("login");
	                return false;
	            }
	            if (response.status === 400 && $state.current.name !== 'login') {
	                sessionStorage.clear();
	                $state.go("login");
	                return false;
	            }
	            if (response.status === 404) {
	                $state.go("404");
	                return false;
	            }

	            return true;
	        })	

        
    }])