angular.module('BookKeeper')
    .service("HeaderService", ["$filter", function ($filter) {

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

        function convertdateandtime(time) {
            return $filter('date')(time, 'medium')
            return converttodate(time) + ", " + converttotime(time)
        }

        self.converttotime = converttotime;

        self.aggrade = {
            "ENTRY DATE": {header: "aggradeItemEntryDate", type: converttodate},
            "ENTRY TIME": {header: "aggradeItemEntryTime", type: ""},
        };

        self.otherincomingmaterial = {
            "MATERIAL DESCRIPTION": {header: "materialDescription", type: ""}
        };

        self.bitumen = {
            "ENTRY DATE": {header: "bitumenItemEntryDate", type: converttodate},
        };

        self.ldo = {
            "ENTRY DATE": {header: "ldoEntryDate", type: converttodate},
            "VEHICLE NO": {header: "vehicleNumber", type: ""},
        };


        self.headers = {

		  "SI NO": {"header": "id", "type": ""},
		  "ACTIONS": {"header": "action", "type": function(cell){
								return (((converttodate(new Date ())-converttodate(cell.created)) / (1000 * 24 * 60 * 60)) > 1)  || (cell.buserid !== Number(sessionStorage.getItem("user")))
							}},
		  "ENTRY DATE": {"header": "entryDate", "type": converttodate},
		  "ENTRY TIME": {"header": "entryTime", "type": ""},
		  "CASH FROM": { header: "cashFrom", type: "" },
		  "EXPENDITURE": { header: "expenditure", type: "" },
		  "BALANCE": { header: "balance", type: "" },
		  "TRIP SHEET NO": {"header": "tripSheetNumber", "type": ""},
		  "VEHICLE NO": {"header": "vehicleNumber", "type": ""},
		  "SUPPLIER NAME": {"header": "supplierName", "type": ""},
		  "MATERIAL": {"header": "material", "type": ""},
		  "QUANTITY IN TONNES": {"header": "quantityInTonnes", "type": ""},
		  "RATE PER TONNE": {"header": "ratePerTonne", "type": ""},
		  "TOTAL AMOUNT (Rs)": {"header": "totalAmount", "type": ""},
		  "CREATED": {"header": "created", type: convertdateandtime},
		  "LAST MODIFIED": {"header": "lastmodified", type: convertdateandtime},
		  "USERID": {"header": "buserid", "type": ""},
		  "INVOICE NO": {"header": "invoiceNo", "type": ""},
		  "TOTAL TONE": {"header": "totalTone", "type": ""},
		  "INVOICE AMOUNT (Rs)": {"header": "invoiceAmount", "type": ""},
		  "EMPTY WEIGHT (Kgs)": {"header": "emptyWeightInKgs", "type": ""},
		  "LOAD WEIGHTIN (Kgs)": {"header": "loadWeightInKgs", "type": ""},
		  "NET WEIGHT (Kgs)": {"header": "netWeightInKgs", "type": ""},
		  "PRICE PER LITRE (Rs)": {"header": "pricePerLitre", "type": ""},
		  "TOTAL NET (ltrs)": {"header": "totalNetInLtrs", "type": ""},
		  "CONSUMED (ltrs)": {"header": "consumedNetInLtrs", "type": ""},
		  "BALANCE (ltrs)": {"header": "balance", "type": ""},
		  "INVOICE DATE": {"header": "invoiceDate", "type": converttodate},
		  "DIESEL RECEIVED (ltrs)": {"header": "dieselReceivedInLtrs", "type": ""},
		  "PRICE PER LITRE (Rs) ": {"header": "pricePerLitre", "type": ""},
		  "DIESEL DISPOSED (ltrs)": {"header": "dieselDisposedInLtrs", "type": ""},
		  "PURCHASER NAME": {"header": "purchaserName", "type": ""},
		  "MATERIAL DESCRIPTION": {"header": "typeOfMaterial", "type": ""},
		  "BOARD TYPE": {"header": "boardType", "type": ""},
		  "OP LOAD": {"header": "opLoad", "type": ""},
		  "START READING": {"header": "startReading", "type": ""},
		  "END READING": {"header": "endReading", "type": ""},
		  "TOTAL POWER CONSUMED (Hrs)": {"header": "totalHrsConsumed", "type": ""},
            "OUTPUT DATE": {"header": "outputDate", "type": converttodate},
            "OUTPUT TIME": {"header": "outputTime", "type": ""},
		  "DELIVERED SITE": {"header": "deliveredSite", "type": ""},
		  "TOTAL TONAGE": {"header": "totalTonage", "type": ""},
		  "SALARY MONTH": {"header": "salaryMonth", "type": ""},
		  "SALARY YEAR": {"header": "salaryYear", "type": ""},
		  "EMP  NAME": {"header": "empName", "type": ""},
		  "DESIGNATION": {"header": "designation", "type": ""},
		  "GENDER": {"header": "gender", "type": ""},
		  "DAYS IN MONTH": {"header": "totalDaysOfMonth", "type": ""},
		  "NUM OF LEAVE TAKEN": {"header": "noOfLeaveTaken", "type": ""},
		  "DAYS WORKED": {"header": "numOfDaysWorked", "type": ""},
		  "SALARY PER DAY": {"header": "salaryPerDay", "type": ""},
		  "EXTRA CONVEYANCE": {"header": "extraConveyance", "type": ""},
		  "SALARY ADVANCE": {"header": "salaryAdvance", "type": ""},
		  "BONUS": {"header": "bonus", "type": ""},
		  "NET PAYABLE": {"header": "netPayable", "type": ""},
		  "CASH RECEIVED FROM": {"header": "cashReceivedFrom", "type": ""},
		  "CASH GIVEN TO": {"header": "cashGivenTo", "type": ""},
		  "SHORT DESCRIPTION": {"header": "shortDescription", "type": ""},
		  "TOTAL CONSUMED (Hrs) ": {"header": "totalHrsConsumed", "type": ""},
		  "DELIVERED SITE": {"header": "deliveredSite", "type": ""},
		  "TYPE OF MATERIAL": {"header": "typeOfMaterial", "type": ""},
		  "BALANCE (ltrs)": {"header": "balanceInLtrs", "type": ""},
		  "AMOUNT (Rs)" : {"header" : "balance", "type" : ""},
		}
}])
