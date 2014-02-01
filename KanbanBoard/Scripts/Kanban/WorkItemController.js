var kanbanApp = angular.module('kanbanApp', []);

kanbanApp.controller('WorkItemController', function($scope) {
	$scope.workItems = [
		{ 'Title': 'First workitem' },
		{ 'Title': 'Second workitem' }
	];

});