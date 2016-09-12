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
                        // abstract: true,
                        templateUrl: "dist/views/main.html",

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
                        resovle: {
                            /* TODO: uncomment when integrating */
                            Data: function ($stateParams) {
                                return {
                                    headers: [],
                                    columns: []
                                }
                                return Restangular.one("url/"+$stateParams.page).then(function (data) {
                                    return data
                                })
                            }
                        }
                    })
                    .state("404", {
                        templateUrl:"dist/views/404.html"
                    });
            } ]);