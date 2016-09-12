angular.module('BookKeeper')
	.controller('PageController', [
		
		"$rootScope",
		"$stateParams",
		"PageService",
		function( $rootScope, $stateParams, Service){
			var self = this;

			// self.data =  data;

			self.addContent =  function (){
				$roorScope.contentPopup.show();
			};

			self.editContent =  function (data){
				$roorScope.contentPopup.show(data);
			};

			// self.remove = service.delete;

			self.goto = function ({pageno, sortby}){
				$state.go($state.current, { pageno, sortby });
			};
		}
])