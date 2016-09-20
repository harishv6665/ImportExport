angular.module('BookKeeper')
    .controller('settingsController', [
        "$rootScope",
        "$stateParams",
        "$state",
        "settingsService",
        function( $rootScope, $stateParams, $state, Service){

            var self = this;
            self.$stateParams = $stateParams;

            self.changePassword = function (obj) {

                Service.changePassword({
                    oldPassword:obj.oldPassword,
                    newPassword: obj.newPassword,
                    userId: sessionStorage.getItem("user")
                })

            };

            // self.contentPopup = {
            //     model: {},
            //
            //     onAdd: function (form, obj){
            //         let context = this;
            //         if(form.$valid)
            //             Service.create({page: $stateParams.page, data: this.model})
            //                 .then((data)=>{
            //                 this[$stateParams.page + 'visibile'] = false;
            //         // self.tableData.itemsData.push(data);
            //         $state.transitionTo($state.current, $stateParams, {
            //             reload: true, inherit: false, notify: true
            //         });
            //     })
            //     }
            // };

        }
    ])