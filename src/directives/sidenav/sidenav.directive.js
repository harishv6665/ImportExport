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
                        sref: "main.page"
                    },
                    {
                        label: "LDO",
                        sref: "main.page"
                    },
                    {
                        label: "DISEAL",
                        sref: "main.page"
                    },
                    {
                        label: "OTHER INCOMING OIL",
                        sref: "main.page"
                    },
                    {
                        label: "POWER READING",
                        sref: "main.page"
                    },
                    {
                        label: "OUTGOING MATERIAL",
                        sref: "main.page"
                    },
                    {
                        label: "SALARY",
                        sref: "main.page"
                    },
                    {
                        label: "CASH BOX",
                        sref: "main.page"
                    },
                    {
                        label: "EXPENDITURE",
                        sref: "main.page"
                    },
                    {
                        label: "SUMMARY",
                        sref: "main.page"
                    }
                ];
            }]
        };
    });