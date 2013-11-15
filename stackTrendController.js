app.controller('stackTrendController', function($scope, $http, $resource){

    $scope.hello = "Hello, World!";

	var framework_forks = $resource('api-forks');
	// framework_forks.get({}, function() {

	// }
	$scope.framework_forks = framework_forks;



});



	// $.getJSON('https://s3.amazonaws.com/intuiplan_company_files/production/files/public/FriendData.json',function(response){
	// 	$scope.friends = response.results;
	// 	$scope.$apply();
	// 	console.log($scope.friends); 
	// });

	// $scope.searchTerm = '';
	// $scope.sortBy = 'name';
	// $scope.sortOrder = 'false'; 