// page template service
angular.module('BookKeeper')
    .service('summaryService', [
        "$rootScope",
        "$state",
        "$stateParams",
        "Restangular",
        function($rootScope, $state, $stateParams, Restangular){

            var self = this;

            self.getBalances = function(){
                $rootScope.showLoader = true;
                return Restangular.one("report/getbalances", sessionStorage.getItem("user"))
                    .get()
                    .then(function (response) {
                        $rootScope.showLoader = false;
                        console.log(response.data)
                        return response.data;
                    })
            };

            self.generateReport= function(data){
                $rootScope.showLoader = true;
                return Restangular.one("report/generate")
                    .customPOST(data)
                    .then(function (response) {
                        if (response && response.data) 
                        window.open(`${location.origin}/services/files/${sessionStorage.getItem('user')}/${response.data}/pdf`, '_blank');

                        $rootScope.showLoader = false;
                        console.log(response)
                        return response;
                    })
            }

        }
    ])