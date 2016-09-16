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
                        label: "DISEAL",
                        sref: "main.page({page: 'diseal'})"
                    },
                    {
                        label: "OTHER INCOMING OIL",
                        sref: "main.page({page: 'other incoming oil'})"
                    },
                    {
                        label: "POWER READING",
                        sref: "main.page({page: 'power reading'})"
                    },
                    {
                        label: "OUTGOING MATERIAL",
                        sref: "main.page({page: 'outgoing material'})"
                    },
                    {
                        label: "SALARY",
                        sref: "main.page({page: 'salary'})"
                    },
                    {
                        label: "CASH BOX",
                        sref: "main.page({page: 'cash box'})"
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