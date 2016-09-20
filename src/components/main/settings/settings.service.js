// page template service
angular.module('BookKeeper')
    .service('settingsService', [
        "$rootScope",
        "$state",
        "$stateParams",
        "Restangular",
        function($rootScope, $state, $stateParams, Restangular){

            var self = this;

            self.changePassword = function (data) {
                $rootScope.showLoader = true;
                return Restangular.one("user/changepassword")
                    .customPOST(data)
                    .then(function (response) {
                        $rootScope.showLoader = false;
                        return response;
                    })
            }

        }
    ])