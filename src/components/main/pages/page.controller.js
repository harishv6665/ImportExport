angular.module('BookKeeper')
	.controller('PageController', [
		"$rootScope",
		"$stateParams",
		"PageService",
		"Data",
		"$state",
		"$filter",
		function( $rootScope, $stateParams, Service, Data, $state, $filter){

			var self = this;
			self.$stateParams = $stateParams;
			self.refresh = ()=>{
				$state.reload()
			};
			self.isAdmin = (sessionStorage.getItem('isAdmin') == "true");

			self.contentPopup = {
				model: {},
				show: function (obj, type='') {
					this.model = {};
					if(obj) {
						let data = {}
						
						data[$stateParams.page + "ItemEntryDate"] = obj[$stateParams.page + "ItemEntryDate"]
						data[$stateParams.page + "EntryDate"] = obj[$stateParams.page + "EntryDate"]
						data["entryDate"] = obj["entryDate"]
						data["invoiceDate"] = obj["invoiceDate"]
						data["incomingDate"] = obj["incomingDate"]
						data["outgoingDate"] = obj["outgoingDate"]
						
						let data2 = _.forEach(data, function(val, key){ 
						   data[key] = new Date(val)
						})

                        if (obj[$stateParams.page + "ItemEntryTime"]){
                            let time = obj[$stateParams.page + "ItemEntryTime"].split(":")
                            data2[$stateParams.page + "ItemEntryTime"] = new Date(1970, 0, 1, time[0], time[1], 0)
                        }
                        if (obj["outputTime"]){
                            let short = $filter('date')(obj["outputTime"], 'h:mm') 
                            let time = short.split(":")
                            console.log(short, time)
                            data2["outputTime"] = new Date(1970, 0, 1, time[0], time[1], 0)


                        }
                       
                      obj["outputDate"] = data2["outputDate"]
//                   if (obj["outputDate"]){
    //                        data2["outputDate"] = $filter('date')(obj["outputDate"], 'd/MMM/yyyy')
       //                  }

						this.model = {
							...obj,
							...data2
						};
					}

					this[$stateParams.page + (type) + 'visibile'] = true;
				},
				onAdd: function (form, obj, type=''){
					let context = this;
					if(form.$valid)
						Service.create({page: $stateParams.page, data: { ...context.model, userId: context.model.userid}})
							.then((data)=>{
								this[$stateParams.page + type + 'visibile'] = false;
								// self.tableData.itemsData.push(data);
								$state.transitionTo($state.current, $stateParams, { 
								  reload: true, inherit: false, notify: true
								});
							})
				},
				onEdit: function (form, obj, type =''){
					let context = this;
					if(form.$valid)
						Service.edit({page: $stateParams.page, data: { ...context.model, userId: context.model.userid}})
							.then((data)=>{

								this[$stateParams.page + type + 'visibile'] = false;
								
								var findItem = self.tableData.itemsData.find(function(item){
									return item.buserid = context.model.userid
								});
								
								_.assign(findItem, context.model);

							})
				},
				onReset: function(form, obj, type =''){
					let context = this;
					if (!obj.password){
						$rootScope.confirmPopup.show({
							title: "Notification",
							message: "Please provide a password.",
							okButtonText: "Ok",
							showCancelButton: false
						})
						return;
					}
					if(form.$valid && obj.password == obj.confirmpassword)
						Service.resetPassword({page: $stateParams.page, data: { ...context.model, userId: context.model.userid}

					})
							.then((data)=>{

								this[$stateParams.page + type + 'visibile'] = false;
								
								var findItem = self.tableData.itemsData.find(function(item){
									return item.buserid = context.model.userid
								});
								
								_.assign(findItem, context.model);

							})	
					else {
						$rootScope.confirmPopup.show({
							title: "Notification",
							message: "Passwords provided are not matching.",
							okButtonText: "Ok",
							showCancelButton: false
						})
					}
				},
				onClose: function (type='') {
					this[$stateParams.page + type + 'visibile'] = false;
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
			self.delete = function (id) {
				$rootScope.confirmPopup.show({
					title: "Confirm Deletion",
					callback: ()=>{Service.delete(id)},
					okButtonText: "Delete",
					showCancelButton: true
				})
			}



			self.pagination = {
				upperLimit: _.ceil(Data.count/50),
				
			}

			self.pagination.range = _.range($stateParams.pageno+1, self.pagination.upperLimit + 1).slice(0, 5);
			let last_page = _.last(self.pagination.range);
			self.pagination.last_page = last_page * 50 < Data.count ? last_page * 50 : Data.count;


		}
])
