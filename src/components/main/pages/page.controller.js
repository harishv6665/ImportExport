angular.module('BookKeeper')
	.controller('PageController', [
		"$rootScope",
		"$stateParams",
		"PageService",
		"Data",
		"$state",
		function( $rootScope, $stateParams, Service, Data, $state){

			var self = this;
			self.$stateParams = $stateParams;
			self.contentPopup = {
				model: {},
				show: function (obj) {
					this.model = {};
					if(obj) {
						let data = {}
						
						data[$stateParams.page + "ItemEntryDate"] = obj[$stateParams.page + "ItemEntryDate"]
						data[$stateParams.page + "EntryDate"] = obj[$stateParams.page + "EntryDate"]
						
						let data2 = _.forEach(data, function(val, key){ 
						   data[key] = new Date(val)
						})
						
						let time = obj[$stateParams.page + "ItemEntryTime"].split(":")
						data2[$stateParams.page + "ItemEntryTime"] = new Date(1970, 0, 1, time[0], time[1], 0)
						this.model = {
							...obj,
							...data2
						};
					}
					
					this[$stateParams.page + 'visibile'] = true;
				},
				onAdd: function (form, obj){
					let context = this;
					if(form.$valid)
						Service.create({page: $stateParams.page, data: this.model})
							.then((data)=>{
								this[$stateParams.page + 'visibile'] = false;
								// self.tableData.itemsData.push(data);
								$state.transitionTo($state.current, $stateParams, { 
								  reload: true, inherit: false, notify: true
								});
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
					this.model = {}
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


			self.pagination = {
				upperLimit: _.ceil(Data.count/50),
				
			}

			self.pagination.range = _.range($stateParams.pageno+1, self.pagination.upperLimit + 1).slice(0, 5);
			let last_page = _.last(self.pagination.range);
			self.pagination.last_page = last_page * 50 < Data.count ? last_page * 50 : Data.count;


		}
])