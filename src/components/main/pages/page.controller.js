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
				model: {},
				show: function (obj) {
					if(obj) this.model = obj;
					else this.model = {}
					this.visibile = true;
				},
				onAdd: function (form, obj){
					if(form.$valid)
						Service.create({page: $stateParams.page, data: obj})
							.then((data)=>{
								this.visibile = false;
								self.tableData.itemsData.push(data);
							})
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
			console.log(Data)
			
			// self.editContent =  function (data){
			// 	self.contentPopup.show(data);
			// };

			// self.remove = service.delete;

			// self.goto = function ({pageno, sortby}){
			// 	$state.go($state.current, { pageno, sortby });
			// };
		}
])