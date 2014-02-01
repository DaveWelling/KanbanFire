
define('viewPortHelper', function () {
	return function(paperContainer, paper) {	 
		var currentViewPortWidth = paper.width;
		var currentViewPortHeight = paper.height;
		var originX = 0;
		var originY = 0;
		var zoomAccelerator = 10;
		var millisecondFrequencyOfMousePositionUpdate = 50;

		function getMousePosition(timeoutMilliSeconds) {
			// "one" attaches the handler to the event and removes it after it has executed once 
			$(document).one("mousemove", function(event) {
				window.mouseXPos = event.pageX;
				window.mouseYPos = event.pageY;
				// set a timeout so the handler will be attached again after a little while
				setTimeout(function() { getMousePosition(timeoutMilliSeconds); }, timeoutMilliSeconds);
			});
		}

		function zoomAtPoint(mouseX, mouseY, delta) {
			var origin1Circle = paper.rect(originX, originY, 8,8);
			origin1Circle.attr("fill", "#000");
			var mouseRatioToOriginForX = (mouseX - originX) / currentViewPortWidth;
			var mouseRatioToOriginForY = (mouseY - originY) / currentViewPortHeight;

			var changeRatio = ((100 - (delta * zoomAccelerator)) / 100);
			var newWidth = currentViewPortWidth * changeRatio;
			var newHeight = currentViewPortHeight * changeRatio;

			var newMouseDistanceToOriginX = newWidth * mouseRatioToOriginForX;
			var newMouseDistanceToOriginY = newHeight * mouseRatioToOriginForY;
			
			originX = mouseX - newMouseDistanceToOriginX;
			originY = mouseY - newMouseDistanceToOriginY;
			var origin2Circle = paper.circle(originX, originY, 5);
			origin2Circle.attr("fill", "red");
			//originX = mouseX - ((mouseX - originX) * changeRatio);
			//originY = mouseY - ((mouseY - originY) * changeRatio);

			paper.setViewBox(originX, originY, newWidth, newHeight, false);
			currentViewPortWidth = newWidth;
			currentViewPortHeight = newHeight;
		}

		function setupViewDrag() {
			var startX;
			var startY;
			var start = function() {
				startX = window.mouseXPos;
				startY = window.mouseYPos;
				console.log("start origin: [" + originX + "," + originY + "]");
				console.log("start: [" + startX + "," + startY + "]");
			};
			var end = function() {
				var endX = window.mouseXPos;
				var endY = window.mouseYPos;
				console.log("end: [" + endX + "," + endY + "]");
				var deltaX = endX - startX;
				var deltaY = endY - startY;
				console.log("delta: [" + deltaX + "," + deltaY + "]");
				originX -= deltaX;
				originY -= deltaY;
				console.log("new origin: [" + originX + "," + originY + "]");
				paper.setViewBox(originX, originY, currentViewPortWidth, currentViewPortHeight);
			};
			//$("#holdKanban").mousemove(move)
			$(paperContainer).mousedown(start);
			$(paperContainer).mouseup(end);
		}

		// start storing the mouse position every X milliseconds
		getMousePosition(millisecondFrequencyOfMousePositionUpdate);
		$(paperContainer).mousewheel(function(event, delta, deltaX, deltaY) {
			zoomAtPoint(window.mouseXPos, window.mouseYPos, delta);
		});
		setupViewDrag();

		return this;
	};
});