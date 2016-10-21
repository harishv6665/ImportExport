angular.module('BookKeeper')
    .controller('summaryController', [
        "$rootScope",
        "$stateParams",
        "$state",
        "summaryService",
        "$filter",
        function( $rootScope, $stateParams, $state, Service, $filter){

            var self = this;
            self.$stateParams = $stateParams;
            self.categories = ["Aggrade", "Bitumen ", "Powerreading", "Incoming material", "Outgoing material", "Salary Statements"]
            self.categoriesMap = {"Aggrade": "aggrade",
                "Bitumen ": "bitumen",
                "Powerreading": "powerreading",
                "Incoming material": "otherincomingmaterial",
                "Outgoing material": "outgoingmaterial",
                "Salary Statements": "salarystatements"}
            self.getBalances = function(){
                self.toggleBalances && Service.getBalances().then(function(data){
                    self.balances = data;
                })
            }
            self.reportsModel = {duration: 'monthly'};
            
            self.generateReport= function(){
                console.log("...",self.reportsModel.duration)
                var form = {};

                if (self.reportsModel.duration == 'monthly') {
                    var date = new Date(self.reportsModel.month), y = date.getFullYear(), m = date.getMonth();
                    var firstDay = new Date(y, m, 1);
                    var lastDay = new Date(y, m + 1, 0);
                    form.startDate = $filter('date')(firstDay, 'dd/MM/yyyy');
                    form.endDate = $filter('date')(lastDay, 'dd/MM/yyyy');
                    form.year = $filter('date')(firstDay, 'yyyy');
                    form.month = $filter('date')(firstDay, 'LLLL');

                    console.log(form)
                } else {
                    var date = new Date(self.reportsModel.day), y = date.getFullYear(), m = date.getMonth();
                    var firstDay = new Date(y, m, 1);
                    
                    form.startDate = $filter('date')(date, 'dd/MM/yyyy');
                    form.year = $filter('date')(firstDay, 'yyyy');
                    form.month = $filter('date')(firstDay, 'LLLL');
                }

                form.userId = sessionStorage.getItem('user');
                form.reportName = self.categoriesMap[self.reportsModel.category];
                form.reportType = self.reportsModel.duration;


                Service.generateReport(form).then(function(){
                    self.reportsModel = { duration: 'monthly'};
                });
            }
        }
    ])