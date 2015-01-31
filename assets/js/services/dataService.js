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
