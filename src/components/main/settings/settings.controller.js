angular.module('BookKeeper')
    .controller('settingsController', [
        "$rootScope",
        "$stateParams",
        "$state",
        "settingsService",
        function( $rootScope, $stateParams, $state, Service){

            var self = this;
            self.$stateParams = $stateParams;

            self.changePassword = function (obj, form) {

                Service.changePassword({
                    oldPassword:obj.oldPassword,
                    newPassword: obj.newPassword,
                    userId: sessionStorage.getItem("user")
                }).then(function(data){
                    if (data.successMessage){
                        obj.oldPassword = "";
                        obj.newPasswordMatch = "";
                        obj.newPassword = "";
                        $rootScope.confirmPopup.show({
                            title: "Notification",
                            message: data.successMessage,
                            okButtonText: "Ok",
                            showCancelButton: false
                        });
                    }
                })

            };

        }
    ])