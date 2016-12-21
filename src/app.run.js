class popup {
	show (){
		this.visible = true;
	}
	close (){
		this.visible = false;
	}
};

angular.module('BookKeeper')
    .run(["$rootScope", 
    	"Restangular",
    	"$state",
		"$stateParams",
    	function ($rootScope, Restangular, $state, $stateParams) {

    		if (!sessionStorage.getItem("token") && $state.current.name !== 'login'){
    			sessionStorage.clear()
    			$state.go("login")
    		}

            class confirmPopup extends popup{
        		show({title, message, okButtonText, showCancelButton, callback}){
        			super.show()
        			this.title = title;
        			this.message = message;
        			this.onOkcallback = callback;
					this.okButtonText = okButtonText;
					this.showCancelButton = showCancelButton;
        		}
        		onOk(){
        			if (typeof this.onOkcallback == 'function') this.onOkcallback();
        			super.close();
        		}
        		close(){
        			super.close();
        		}
            }
        	
        	$rootScope.confirmPopup = new confirmPopup();
			
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				
				if (toState.name !== "404" && toParams.page){
					if(sessionStorage.getItem('isAdmin') == "true" && (toParams.page !== "admin")) {
						event.preventDefault();
						$state.go("404");
					}

					else if (sessionStorage.getItem('isAdmin') == "false" && (toParams.page === "admin")) {
						event.preventDefault();
						$state.go("404");
					}
				}

				if(sessionStorage.getItem('isAdmin') == "false")
				$rootScope.showLoader = false;
				$rootScope.confirmPopup.close();



            });
            
            Restangular.setErrorInterceptor(function (response = {}) {
	            $rootScope.showLoader = false;
	            console.log("response", response)
	            if (response.data && response.data.errorcode === 10000001 && $state.current.name !== 'login') {
	            	sessionStorage.clear();
	             	$state.go("login");
	                return false;
	            }
	            if (response.status === 400 && $state.current.name !== 'login') {
	                // sessionStorage.clear();
	                $rootScope.confirmPopup.show({  message: "Bad Request", title: "Error" })
	                // $state.go("login");
	                return false;
	            }
	            if (response.status === 404) {
	                $state.go("404");
	                return false;
	            }
	            
	            $rootScope.confirmPopup.show({  message: ((response.data||{}).errormessage) || "Something went wrong!!!", title: "Error" });

	            return true;
	        })	

        
    }])