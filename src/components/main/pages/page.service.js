// page template service
angular.module('BookKeeper')
	.service('PageService', [
		"$rootScope",
		"$stateParams",
		"Restangular",
		"$filter",
		function($rootScope, $stateParams, Restangular, $filter){

			var self = this;
			
			function converttodate(time) {
				var date = new Date(time);
				return $filter('date')(time, 'd/MMM/yyyy')
				return ("0" + date.getDate().toString()).substr(-2) + "/" + ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + (date.getFullYear().toString()).substr(2);
			
			}
			function converttotime(time) {
				var date = new Date(time);
				return $filter('date')(time, 'H:mm')

				return date.getHours() + ':' + date.getMinutes()
			}

			function convertdateandtime(time){
				return $filter('date')(time, 'medium')
				return converttodate(time) + ", "+ converttotime(time)
			}

			self.aggrade = {
					"SI NO": { header: "id",
								type: ""
							},
					"ACTIONS": { header:"action",
								type: ""
								},
					"ENTRY DATE": { header:"aggradeItemEntryDate",
								type: converttodate
								},
					"ENTRY TIME": { header:"aggradeItemEntryTime",
								type: ""
								},
					"TRIP SHEET NO": { header:"tripSheetNumber",
								type: ""
								},
					"VEHICLE NO": { header:"vehicleNumber",
								type: ""
								},
					"SUPPLIER NAME": { header:"supplierName",
								type: ""
								},
					"MATERIAL": { header:"material",
								type: ""
								},
					"QUANTITY IN TONNES": { header:"quantityInTonnes",
								type: ""
								},
					"RATE PER TONNE": { header:"ratePerTonne",
								type: ""
								},
					"TOTAL AMOUNT (Rs)": { header:"totalAmount",
								type: ""
								},
					"CREATED": { header:"created",
								type: convertdateandtime
								},
					"LAST MODIFIED": { header:"lastmodified",
								type: convertdateandtime
								},
					"USERID": { header:"buserid",
								type: ""
								}};

			self.bitumen ={
				"SI NO" : { header:"id",
							type: ""
							},
				"ENTRY DATE": { header:"bitumenItemEntryDate",
							type: converttodate
							},
				"INVOICE NO": { header:"invoiceNo",
							type: ""
							},
				"VEHICLE NO": { header:"vehicleNumber",
							type: ""
							},
				"SUPPLIER NAME": { header:"supplierName",
							type: ""
							},
				"MATERIAL": { header:"material",
							type: ""
							},
				"TOTAL TONE": { header:"totalTone",
							type: ""
							},
				"INVOICE AMOUNT (Rs)": { header:"invoiceAmount",
							type: ""
							},
				"CREATED": { header:"created",
							type: converttodate
							},
				"LAST MODIFIED": { header:"lastmodified",
							type: convertdateandtime
							},
				"USERID": { header:"buserid",
							type: ""
							}
			};
			
			self.ldo ={
				"SI NO" : { header:"id",
							type: ""
							},
				"ENTRY DATE" : { header:"ldoEntryDate",
							type: converttodate
							},
				"VEHICLE NO" : { header:"vehicleNumber",
							type: ""
							},
				"TRIP SHEET NO" : { header:"tripSheetNumber",
							type: ""
							},
				"EMPTY WEIGHT (Kgs)" : { header:"emptyWeightInKgs",
							type: ""
							},
				"LOAD WEIGHTIN (Kgs)" : { header:"loadWeightInKgs",
							type: ""
							},
				"NET WEIGHT (Kgs)" : { header:"netWeightInKgs",
							type: ""
							},
				"PRICE PER LITRE (Rs)" : { header:"pricePerLitre",
							type: ""
							},
				"TOTAL NET (ltrs)" : { header:"totalNetInLtrs",
							type: ""
							},
				"TOTAL AMOUNT (Rs)" : { header:"totalAmount",
							type: ""
							},
				"CONSUMED (ltrs)" : { header:"consumedNetInLtrs",
							type: ""
							},
				"BALANCE (ltrs)" : { header:"balanceInLtrs",
							type: ""
							},
				"CREATED" : { header:"created",
							type: converttodate
							},
				"LAST MODIFIED" : { header:"lastmodified",
							type: convertdateandtime
							},
				"USERID" : { header:"buserid",
							type: ""
							}
			};

			self.getData = function ({category, page, userid}){
				return Restangular.one("item/view")
					.get({category, page, userid})
					.then(function({data}){
						
						data.dataOrder = self [category || $stateParams.page];
						console.log(self [category || $stateParams.page], category, $stateParams.page)
						data.headers = [...data.headers.slice(0,1), 'ACTIONS', 
							...data.headers.slice(1)];
						return data
					})
			};

			self.delete = function ({id}){
				console.log("delete", id)
				return Restangular.one("item/view", $stateParams.page)
				.one(id)
				.remove()
			}

			self.update = function ({page, id, data}){
				return Restangular.one("item/add", page).one(id)
				.customPUT(data)
			}

			self.create = function ({page, data}){
				return Restangular.one("item/add", page)
				.customPOST({
					...data,
					buserid: sessionStorage.getItem("user")
				})
			}
		}
])