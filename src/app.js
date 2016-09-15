angular.module('BookKeeper',['ui.router', 'restangular'])
    .config(['$urlRouterProvider',
            '$stateProvider',
            '$locationProvider',
            'RestangularProvider',
            function($urlRouterProvider, $stateProvider, $locationProvider, RestangularProvider){
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });

                $urlRouterProvider.when("", "/");
                
                RestangularProvider.setBaseUrl('/rest');

                RestangularProvider.setDefaultHeaders({
                    "Content-Type": "application/json"
                });

                $urlRouterProvider.otherwise(function ($injector) {
                    var $state = $injector.get('$state');
                    $state.go('404');
                });

                $stateProvider
                    .state("login",{
                        url: "/",
                        templateUrl: "dist/views/login.html",
                    })
                    .state("main", {
                        url: "/main",
                        templateUrl: "dist/views/main.html"
                    })
                    .state("main.page", {
                        url: "/page/:page",
                        params:{
                            page: "aggrade"
                        },
                        views: {
                          Container: {
                              templateUrl: "dist/views/page.html",
                              controller: "PageController as pageCtrl"

                          }
                        },
                        resolve: {
                            /* TODO: uncomment when integrating */
                            Data: ['$http', '$stateParams', function ($http, $stateParams) {
                                return $http.get("/dist/json/"+ $stateParams.page + "Data.json").then(function (data) {
                                    return data;
                                })
                            }]
                        }
                    })
                    .state("404", {
                        templateUrl:"dist/views/404.html"
                    });
            } ]);