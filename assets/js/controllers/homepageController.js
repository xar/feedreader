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
