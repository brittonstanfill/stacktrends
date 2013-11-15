app.controller('stackTrendController', function($scope, $http, $resource){

    $scope.hello = "Hello, World!";

	var framework_forks = $resource('api-forks');
	// framework_forks.get({}, function() {

	// }
	$scope.framework_forks = framework_forks;
	// $scope.$apply();
});