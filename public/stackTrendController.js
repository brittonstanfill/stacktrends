app.controller('stackTrendController', function($scope, $http, $resource){

  var framework_forks = $resource('http://localhost:3000/api-forks');
  var forks = framework_forks.query(function() {
    $scope.framework_forks = forks;
  });

// languages //
  var allLanguages = $resource('http://localhost:3000/languagesBar');
  var languages = allLanguages.query(function(){
      $scope.allLanguages = languages;
  });

// Zen //
  var Zen = $resource('http://localhost:3000/Zenspire');
  var wordsOfWisdom = Zen.query(function(){
      $scope.Zen = wordsOfWisdom;
  });

});