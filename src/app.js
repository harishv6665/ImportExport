angular.module('BookKeeper',['ui.router'])
    .config(['$urlRouterProvider',
            '$stateProvider',
            '$locationProvider',
            function($urlRouterProvider,$stateProvider,$locationProvider){
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });

                $urlRouterProvider.when("", "/");

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
                              templateUrl: "dist/views/pageTemplate.html",
                              controller: "pageController as pageCtrl"
                          }
                        }
                        // resovle: {
                        //     /* TODO: uncomment when integrating */
                        //     data: function ($stateParams) {
                        //         Restangular.one("url/"+$stateParams.page).then(function (data) {
                        //             return data
                        //         })
                        //     }
                        // }
                    })
                    .state("404", {
                        templateUrl:"dist/views/404.html"
                    });
            } ]);