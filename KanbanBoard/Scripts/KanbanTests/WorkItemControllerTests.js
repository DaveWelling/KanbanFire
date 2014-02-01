describe('WorkItem Controller', function () {

	beforeEach(module('kanbanApp'));
	it('should have 2 workitems to start with', inject(function($controller) {
		var scope = {};
		var ctrl = $controller('WorkItemController', { $scope: scope });
		expect(scope.workItems.length).toBe(2);
	}));
});