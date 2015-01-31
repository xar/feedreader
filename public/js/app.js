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



app.controller('homepageController',['$rootScope', '$scope','userFeed', '$location', function($rootScope, $scope, userFeed, $location){

  $scope.showSpinner = false;
  $scope.feedlyStart = "";

  function redirect(){
    window.location = "#/items";
  }
  $scope.feedlyStart = function(){
    $scope.showSpinner = true;
    userFeed().then(function(promise, $location){
      redirect();
    });

  };



}]);

app.controller('itemsController',['$rootScope', '$scope','userCategories', 'userContent', '$location', '$mdSidenav', '$routeParams', function($rootScope, $scope, userCategories,userContent, $location, $mdSidenav, $routeParams){

  $scope.categorySpinner = true;
  init();

  function init(){
    userCategories().then(function(promise){
      $scope.categorySpinner = false;
      $scope.items = promise;
      console.log(promise);
      $scope.$digest()
    });
  }


  $scope.selectCat = function(id, cat){
    $scope.contentSpinner = true;

    var start = id.indexOf('/') + 1;
    var end = id.indexOf('/',start);
    var userid = id.substring(start,end);
    userContent(userid, cat).then(function(promise){
      $scope.contentSpinner = false;
      $scope.news = promise;
      $scope.$digest()
    });
  }

}]);

app.service('userFeed', function(){

  userFeed = function(){
    var promise = f.reads().then(function(results) {
        return results;
      },
      function (error) {
        return error;
      });

      return promise;
    };

    return userFeed;

});


app.service('userCategories', function(){

  userCategories = function(){
    var promise = f.categories().then(function(results) {
        return results;
      },
      function (error) {
        return error;
      });

      return promise;
    };

    return userCategories;

});

app.service('userContent', function(){

  userContent = function(id, cat){
    var promise = f.contents('user/'+id+'/category/'+cat).then(function(results) {
        return results;
      },
      function (error) {
        return error;
      });

      return promise;
    };

    return userContent;

});
