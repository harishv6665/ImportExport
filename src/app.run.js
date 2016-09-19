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
    	function ($rootScope, Restangular, $state) {

    		if (!sessionStorage.getItem("token") && $state.current.name !== 'login'){
    			sessionStorage.clear()
    			$state.go("login")
    		}

        	$rootScope.$on('$stateChangeStart', function () {
				$rootScope.showLoader = false;

            });

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

            Restangular.setErrorInterceptor(function (response = {}) {
	            $rootScope.showLoader = false;
	            console.log("response", response)
	            if (response.status === 422 && $state.current.name !== 'login') {
	            	sessionStorage.clear();
	                $state.go("login");
	                return false;
	            }
	            if (response.status === 400 && $state.current.name !== 'login') {
	                sessionStorage.clear();
	                $rootScope.confirmPopup.show({  message: "Bad Request", title: "Error" })
	                $state.go("login");
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