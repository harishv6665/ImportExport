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
                
                RestangularProvider.setBaseUrl('services');

                RestangularProvider.setDefaultHeaders({
                    "Content-Type": "application/json",
                    "x-access-token": function() {
                        return sessionStorage.getItem('token');
                    }
                });
                $urlRouterProvider.otherwise(function ($injector) {
                    var $state = $injector.get('$state');
                    $state.go('404');
                });

                $stateProvider
                    .state("login",{
                        url: "/",
                        templateUrl: "dist/views/login.html",
                        controller: "LoginController as LoginCtrl"
                    })
                    .state("main", {
                        url: "/main",
                        templateUrl: "dist/views/main.html"
                    })
                    .state("main.page", {
                        url: "/page/:page",
                        params:{
                            page: "aggrade",
                            pageno: "0"
                        },
                        views: {
                          Container: {
                              templateUrl: "dist/views/page.html",
                              controller: "PageController as pageCtrl"

                          }
                        },
                        resolve: {
                            /* TODO: uncomment when integrating */
                            Data: ['PageService', '$stateParams', function (PageService, $stateParams) {

                                var promise = PageService.getData;

                                if(sessionStorage.getItem("isAdmin") === "true"){
                                    promise = PageService.getUsers;
                                }

                                return promise({
                                        category: $stateParams.page,
                                        page: $stateParams.pageno,
                                        userid: sessionStorage.getItem("user")
                                         })
                                    .then(function (data) {
                                    return data;
                                })
                            }]
                        }
                    })
                    .state("main.settings", {
                        url: "/settings",
                        views: {
                          Container: {
                              templateUrl: "dist/views/settings.html",
                              controller: "settingsController as settingsCtrl"
                          }
                        }
                    })
                    .state("404", {
                        templateUrl:"dist/views/404.html"
                    });
            } ]);