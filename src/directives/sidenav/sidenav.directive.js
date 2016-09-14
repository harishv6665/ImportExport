angular.module('BookKeeper')
    .directive('bkSidenav', function () {
        return {
            templateUrl: "/dist/views/sidenav.html",
            restrict: "E",
            controller: ['$scope', '$route', function ($scope, $route) {
                $scope.$route = $route;

                $scope.sideNavLinks = [
                    {
                        label: "AGGRADE",
                        sref: "/aggrade"
                    },
                    {
                        label: "BITUMEN",
                        sref: "/bitumen"
                    },
                    {
                        label: "LDO",
                        sref: "/ldo"
                    },
                    {
                        label: "DISEAL",
                        sref: "/diseal"
                    },
                    {
                        label: "OTHER INCOMING OIL",
                        sref: "/otherIncomingOil"
                    },
                    {
                        label: "POWER READING",
                        sref: "/powerReading"
                    },
                    {
                        label: "OUTGOING MATERIAL",
                        sref: "/outgoingMaterial"
                    },
                    {
                        label: "SALARY",
                        sref: "/salary"
                    },
                    {
                        label: "CASH BOX",
                        sref: "/cashBox"
                    },
                    {
                        label: "EXPENDITURE",
                        sref: "/expenditure"
                    },
                    {
                        label: "SUMMARY",
                        sref: "/Summary"
                    }
                ];
            }]
        };
    });