app.controller('stackTrendController', function($scope, $http, $resource){

    $scope.hello = "Hello, World!";

	var framework_forks = $resource('api-forks');
	framework_forks.get({}, function() {

	}
	$scope.framework_forks = framework_forks;
	// $scope.$apply(); // don't need it in this case http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
});