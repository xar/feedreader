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
