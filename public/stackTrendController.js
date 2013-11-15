app.controller('stackTrendController', function($scope, $http, $resource){

    $scope.hello = "Hello, World!";

	// var framework_forks = $resource('http\\://localhost\\:3000/api-forks');
	// framework_forks.get({}, function() {

	// }

// 	$resource('http\\://localhost\\:3000/api-forks');
// framework_forks.get({}, function() {

// }

 var framework_forks = $resource('http://localhost:3000/api-forks');

    var forks = framework_forks.query(function() {
        $scope.framework_forks = forks;
        
        $scope.apply();
    });



	// $http.defaults.useXDomain = true;
	// var framework_forks = $resource('http://localhost:3000/api-forks');
 //    $scope.github_framework_forks = framework_forks.query(); 
 //    console.log($scope.github_framework_forks);
	// framework_forks.query(function() {console.log(tests);});
	// $scope.framework_forks = framework_forks;
	// $scope.$apply();
});