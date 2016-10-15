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
							if(sessionStorage.getItem('isAdmin') === "true") {
								return false;
							}

							return (((converttodate(new Date ())-converttodate(cell.created)) / (1000 * 24 * 60 * 60)) > 1)  || (cell.buserid !== Number(sessionStorage.getItem("user")))
							}},
		  "ENTRY DATE": {"header": "entryDate", "type": converttodate},
		  "INDENT DATE": {"header": "indentDate", "type": converttodate},
		  "INCOMING DATE": {"header": "incomingDate", "type": converttodate},
		  "OUTGOING DATE": {"header": "outgoingDate", "type": converttodate},
		  "ENTRY TIME": {"header": "entryTime", "type": ""},
		  "CASH FROM": { header: "cashFrom", type: "" },
		  "EXPENDITURE": { header: "expenditure", type: "" },
		  "BALANCE": { header: "balance", type: "" },
		  "TRIP SHEET NO": {"header": "tripSheetNumber", "type": ""},
		  "VEHICLE NO": {"header": "vehicleNumber", "type": ""},
		  "SUPPLIER NAME": {"header": "supplierName", "type": ""},
		  "MATERIAL": {"header": "material", "type": ""},
		  "QUANTITY IN TONNES": {"header": "quantityInTonnes", "type": ""},
		  "TOTAL TONNES": {"header": "totalTonnes", "type": ""},
		  "RATE PER TONNE": {"header": "ratePerTonne", "type": ""},
		  "TOTAL AMOUNT (Rs)": {"header": "totalAmount", "type": ""},
		  "CREATED": {"header": "created", type: convertdateandtime},
		  "LAST MODIFIED": {"header": "lastmodified", type: convertdateandtime},
		  "USERID": {"header": "buserid", "type": ""},
		  "INVOICE NO": {"header": "invoiceNo", "type": ""},
		  "TDS": {"header": "tds", "type": ""},
		  "TOTAL TONE": {"header": "totalTone", "type": ""},
		  "DIFFERENCE": {"header": "difference", "type": ""},
		  "SHORTAGE OR EXCESS": {"header": "excessOrShortage", "type": ""},
		  "INVOICE AMOUNT (Rs)": {"header": "invoiceAmount", "type": ""},
		  "INVOICE AMOUNT": {"header": "invoiceAmount", "type": ""},
		  "INVOICE TONE": {"header": "invoiceTone", "type": ""},
		  "EMPTY WEIGHT (Kgs)": {"header": "emptyWeightInKgs", "type": ""},
		  "EMPTY WEIGHT": {"header": "emptyWeight", "type": ""},
		  "GROSS WEIGHT": {"header": "grossWeight", "type": ""},
		  "LOAD WEIGHT (Kgs)": {"header": "loadWeightInKgs", "type": ""},
		  "NET WEIGHT (Kgs)": {"header": "netWeightInKgs", "type": ""},
		  "NET WEIGHT": {"header": "netWeight", "type": ""},
		  "TRANSPORTATION CHARGES": {"header": "transprtationCharges", "type": ""},
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
            "OUTPUT TIME": {"header": "outputTime", "type": converttotime},
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
		  "CASH AMOUNT" : {"header" : "cashAmount", "type" : ""},
		  "EXPENDITURE AMOUNT" : {"header" : "expenditureAmount", "type" : ""},
		  "BALANCE (Rs)" : {"header" : "balance", "type" : ""},
		  "USER NAME" : {"header" : "username", "type" : ""},
		  "FIRST NAME" : {"header" : "firstName", "type" : ""},
		  "LAST NAME" : {"header" : "lastName", "type" : ""},
		  "USER ID" : {"header" : "userid", "type" : ""},
		  "ROLE" : {"header" : "role", "type" : ""},
		  "PHONE NUMBER" : {"header" : "phonenumber", "type" : ""},
		  "INDENT NO" : {"header" : "indentNo", "type" : ""},
		}
}])
