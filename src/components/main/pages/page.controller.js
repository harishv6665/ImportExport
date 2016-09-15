angular.module('BookKeeper')
	.controller('PageController', [
		"$rootScope",
		"$stateParams",
		"PageService",
		"Data",
		function( $rootScope, $stateParams, Service, Data){

			var self = this;

			self.contentPopup = {
				visibile: false,
				show: function () {
					this.visibile = true;
				},
				onClose: function () {
					this.visibile = false;
				}
			};

			self.filterSlider = {
			    visible: false,
                show: function () {
                    this.visible = true;
                },
                onClose: function () {
                    this.visible = false
                }
            }

			self.tableData =  Data;

			// self.editContent =  function (data){
			// 	$roorScope.contentPopup.show(data);
			// };

			// self.remove = service.delete;

			// self.goto = function ({pageno, sortby}){
			// 	$state.go($state.current, { pageno, sortby });
			// };
		}
])