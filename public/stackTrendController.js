app.controller('stackTrendController', function($scope, $http, $resource){

  var framework_forks = $resource('http://localhost:3000/api-forks');
  var forks = framework_forks.query(function() {
    $scope.framework_forks = forks;
  });

// Languages

  var allLanguages = $resource('http://localhost:3000/languagesBar');
  var languages = allLanguages.query(function(){
      $scope.allLanguages = languages;
  });

});