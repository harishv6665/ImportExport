angular.module('BookKeeper')
    .directive('bkSidenav', ["$stateParams", '$state',function ($stateParams, $state) {
            return {
                templateUrl: "/dist/views/sidenav.html",
                restrict: "E",
                controller: ['$scope', '$http', function ($scope, $http) {
    
                    // $scope.getData = function(path) {
                    //     $http.get(path).then(function (result) {
                    //         console.log("got the path", result);
                    //     })
                    // }
    
                    $scope.sideNavLinks = [
                        {
                            label: "AGGRADE",
                            sref: "main.page({page: 'aggrade', pageno: '1'})",
                            isActive: function(){ return 'aggrade' === $stateParams.page}
                        },
                        {
                            label: "BITUMEN",
                            sref: "main.page({page: 'bitumen', pageno: '1'})",
                            isActive: function(){ return 'bitumen' === $stateParams.page}
                        },
                        {
                            label: "LDO",
                            sref: "main.page({page: 'ldo', pageno: '1'})",
                            isActive: function(){ return 'ldo' === $stateParams.page}
                        },
                        {
                            label: "DIESEL",
                            sref: "main.page({page: 'diesel', pageno: '1'})",
                            isActive: function(){ return 'diesel' === $stateParams.page}
                        },
                        {
                            label: "INCOMING MATERIAL",
                            sref: "main.page({page: 'otherincomingmaterial', pageno: '1'})",
                            isActive: function(){ return 'otherincomingmaterial' === $stateParams.page}
                        },
                        {
                            label: "POWER READING",
                            sref: "main.page({page: 'powerreading', pageno: '1'})",
                            isActive: function(){ return 'powerreading' === $stateParams.page}
                        },
                        {
                            label: "OUTGOING MATERIAL",
                            sref: "main.page({page: 'outgoingmaterial', pageno: '1'})",
                            isActive: function(){ return 'outgoingmaterial' === $stateParams.page}
                        },
                        {
                            label: "SALARY",
                            sref: "main.page({page: 'salarystatements', pageno: '1'})",
                            isActive: function(){ return 'salarystatements' === $stateParams.page}
                        },
                        // {
                        //     label: "CASH BOX",
                        //     sref: "main.page({page: 'cashbox'})",
                        //     isActive: function(){ return 'cashbox' === $stateParams.page}
                        // },
                        {
                            label: "EXPENDITURE",
                            sref: "main.page({page: 'expenditure'})",
                            isActive: function(){ return 'expenditure' === $stateParams.page}
                        },
                        {
                            label: "SUMMARY",
                            sref: "main.summary",
                            isActive: function(){ return 'summary' === $state.name}
                        }
                    ];
                }]
            };
        }]);