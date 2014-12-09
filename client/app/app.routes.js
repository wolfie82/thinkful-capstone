(function(){
  'use strict';
  /**
   * Config for the router
   */
  angular
    .module('voxChef')
    .run(['$rootScope', '$state', '$stateParams', RouteInit])
    .config(['$stateProvider', '$urlRouterProvider', RouteConfig]);


  function RouteInit ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }

  function RouteConfig ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/console/dashboard');

    $stateProvider
      .state('console', {
        abstract: true,
        url: '/console',
        templateUrl: 'assets/templates/layouts/console/index.tpl.html'
      })
      .state('console.dashboard', {
        url: '/dashboard',
        templateUrl: 'assets/templates/components/dashboard/index.tpl.html'
      });
  }


})();
