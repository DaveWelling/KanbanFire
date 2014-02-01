describe('WorkItem Controller', function() {
	it('should have 2 workitems to start with', function() {
		var scope = {},
			ctrl = new WorkItemController(scope);
		expect(scope.workItems.length).toBe(2);
	});
});