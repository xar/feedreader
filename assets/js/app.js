var app = angular.module('app', ['ngRoute', 'ngMaterial']);

app.config(function($mdThemingProvider) {

        $mdThemingProvider.theme('default')
          .primaryColor('green')
          .accentColor('blue-grey');

      });

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/frontpage.html',
        controller: 'homepageController'
      }).when('/items', {
        templateUrl: 'templates/items.html',
        controller: 'itemsController'
      }).when('/items/:id', {
        templateUrl: 'templates/items.html',
        controller: 'itemsController'
      });
  }]);


