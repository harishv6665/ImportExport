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
					this.difference = undefined;
					if(obj) {
						let data = {}
						
						data[$stateParams.page + "ItemEntryDate"] = obj[$stateParams.page + "ItemEntryDate"]
						data[$stateParams.page + "EntryDate"] = obj[$stateParams.page + "EntryDate"]
						data["entryDate"] = obj["entryDate"]
						data["outputDate"] = obj["outputDate"]
						data["invoiceDate"] = obj["invoiceDate"]
						data["indentDate"] = obj["indentDate"]
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
				bitumenChange: function(){

					this.difference = (this.model.invoiceTone||0) - (this.model.netWeight||0);
					this.model.excessOrShortage = this.difference>0? 'shortage': (this.difference == 0? 'equal' : 'excess')
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
            function todate(time) {
                var date = new Date(time);
                return $filter('date')(time, 'dd/MM/yyyy')
            }

			self.filterData = function (startDate, endDate) {

                    $state.go("main.page", {
                        page: $stateParams.page,
                        from: startDate,
                        to: endDate,
                        pageno: 1
                    });
            }

            self.exportFilterData = function (startDate, endDate) {
                Service.exportFilterData(todate(startDate), todate(endDate))
            }

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
				upperLimit: _.ceil(Data.count / 50),
				
			}
			console.log("$stateParams.pageno", $stateParams.pageno)
			
			let max = 1+ (Math.ceil((Number($stateParams.pageno)+1)/5) * 5);
			self.pagination.range = _.range(1+ (Math.floor ((Number($stateParams.pageno)-1)/5.0) * 5), 
				max > Math.ceil(Data.count / 50)? Math.ceil(Data.count / 50)+1 : max);
			// let tempRange = [];
			
			// while (fullRange.length == 0){
			// 	tempRange.push(fullRange.splice(0, 5))
			// }
		
			// let index = (function (n) {
			// 	if(n > 0)
			//          return Math.ceil (n/5.0) * 5;
			//     else if( n < 0)
			//          return Math.floor (n/5.0) * 5;
			//     else
			//          return 5;
			// })(Number($stateParams.pageno))

			// self.pagination.range = tempRange[(index / 5) - 1];

		
			self.pagination.to = ((Number($stateParams.pageno - 1) * 50) + 50) < Data.count ? ((Number($stateParams.pageno - 1) * 50) + 50) : Data.count;
			self.pagination.from = self.pagination.to ==0 ? 0: ((self.pagination.to - 50 + 1) < 0 ? 1 : (self.pagination.to - 50 + 1));

			let listdates= _.map(self.tableData.itemsData, function (data) {
                return data[$stateParams.page + "ItemEntryDate"] || data[$stateParams.page + "EntryDate"] ||  data["entryDate"] || data["incomingDate"] || data.created
            });

            function converttodate(time) {
                return new Date(time);
            }
            
			self.startDate = converttodate($stateParams.from? ($stateParams.from): _.min(listdates));
            self.endDate = converttodate($stateParams.to? ($stateParams.to): _.max(listdates));

            console.log(self.startDate, self.endDate)
		}
])
