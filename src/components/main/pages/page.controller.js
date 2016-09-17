angular.module('BookKeeper')
	.controller('PageController', [
		"$rootScope",
		"$stateParams",
		"PageService",
		"Data",
		function( $rootScope, $stateParams, Service, Data){

			var self = this;

			self.contentPopup = {
				model: {},
				show: function (obj) {
					if(obj) this.model = obj;
					else this.model = {}
					this[$stateParams.page + 'visibile'] = true;
				},
				onAdd: function (form, obj){
					let context = this;
					if(form.$valid)
						Service.create({page: $stateParams.page, data: this.model})
							.then((data)=>{
								this[$stateParams.page + 'visibile'] = false;
								self.tableData.itemsData.push(data);
							})
				},
				onEdit: function (form, obj){
					let context = this;
					if(form.$valid)
						Service.edit({page: $stateParams.page, data: context.model})
							.then((data)=>{

								this[$stateParams.page + 'visibile'] = false;
								
								var findItem = self.tableData.itemsData.find(function(item){
									return item.buserid = context.model.userid
								});
								
								_.assign(findItem, context.model);

							})
				},
				onClose: function () {
					this[$stateParams.page + 'visibile'] = false;
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
			self.delete = Service.delete;
			
		}
])