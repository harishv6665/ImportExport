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

                $urlRouterProvider
                .when("main/page/summary", "/summary")
                .when("", "/");
                
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
                        templateUrl: "dist/views/main.html",
                        controller: [function (){
                            self = this;
                            this.isAdmin = sessionStorage.getItem('isAdmin')
                        }],
                        controllerAs: 'mainController'
                    })
                    .state("main.page", {
                        url: "/page/:page",
                        params:{
                            page: "aggrade",
                            pageno: "1",
                            from: '',
                            to: '',
                        },
                        views: {
                          Container: {
                              templateUrl: "dist/views/page.html",
                              controller: "PageController as pageCtrl"

                          }
                        },
                        resolve: {
                            /* TODO: uncomment when integrating */
                            Data: ['PageService', '$stateParams', '$filter',function (PageService, $stateParams, $filter) {

                                var promise = PageService.getData;

                                if(sessionStorage.getItem("isAdmin") === "true"){
                                    promise = PageService.getUsers;
                                }
                                if ($stateParams.from && $stateParams.to)
                                    promise = PageService.getFilteredData;
                                
                                function todate(time) {
                                    if (!time) return;
                                    var date = new Date(time);
                                    return $filter('date')(time, 'dd/MM/yyyy')
                                }
                                
                                return promise({
                                        from: todate($stateParams.from),
                                        to: todate($stateParams.to),
                                        category: $stateParams.page,
                                        page: $stateParams.pageno,
                                        userid: sessionStorage.getItem("user")
                                         })
                                    .then(function (data) {
                                        console.log('data', data)
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
                    .state("main.summary", {
                        url: "/summary",
                        views: {
                          Container: {
                              templateUrl: "dist/views/summary.html",
                              controller: "summaryController as summaryCtrl"
                          }
                        }
                    })
                    .state("404", {
                        templateUrl:"dist/views/404.html"
                    });
            } ]);