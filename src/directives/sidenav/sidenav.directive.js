angular.module('BookKeeper')
    .directive('bkSidenav', function ($http) {
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
                        sref: "main.page({page: 'aggrade'})"
                    },
                    {
                        label: "BITUMEN",
                        sref: "main.page({page: 'bitumen'})"
                    },
                    {
                        label: "LDO",
                        sref: "main.page({page: 'ldo'})"
                    },
                    {
                        label: "DIESEL",
                        sref: "main.page({page: 'diesel'})"
                    },
                    {
                        label: "OTHER INCOMING MATERIAL",
                        sref: "main.page({page: 'otherincomingmaterial'})"
                    },
                    {
                        label: "POWER READING",
                        sref: "main.page({page: 'powerreading'})"
                    },
                    {
                        label: "OUTGOING MATERIAL",
                        sref: "main.page({page: 'outgoingmaterial'})"
                    },
                    {
                        label: "SALARY",
                        sref: "main.page({page: 'salarystatements'})"
                    },
                    {
                        label: "CASH BOX",
                        sref: "main.page({page: 'cashbox'})"
                    },
                    {
                        label: "EXPENDITURE",
                        sref: "main.page({page: 'expenditure'})"
                    },
                    {
                        label: "SUMMARY",
                        sref: "main.page({page: 'summary'})"
                    }
                ];
            }]
        };
    });