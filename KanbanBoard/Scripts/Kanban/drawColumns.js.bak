

var x = (function () {

	// set up coordinates to be based on width = 10000 units.			
	var strokeWidth = 17.5;
	var margin = 70;
	var baseSize = 10000;				
	var numberOfColumns = 6;
	var workItemStyle = 'workItem';
	var zoomAccelerator = 4;
	var originX = 0;
	var originY = 0;

	var xToYRatio = $(window).height() / $(window).width();
	var kanbanWidth = baseSize;
	var kanbanHeight = baseSize * xToYRatio;
				   
	var paper = $('#viewport')[0];
	
	setViewBox(0, 0, kanbanWidth, kanbanHeight);
				   
	var outerRect = createRect(originX, originY, kanbanWidth, kanbanHeight, 'kanban');
				 
	var columns = generateColumns(numberOfColumns, outerRect);

	var firstWorkItem = createWorkItem(columns[0], 1, "hello, I love you.  Won't you tell me your name?");
																
	var workItemEnclosure = addWorkItemToColumn(columns[0], firstWorkItem);

	svgPan.listenForDrop(columns, function(column, evt) {
		var workItem = evt.target;
		moveWorkItemToColumn(workItem, column);
	});
	
	function moveWorkItemToColumn(workItem, column) {
		var workItemParent = workItem.parentElement;
		addWorkItemToColumn(column, workItem);
		workItemParent.remove();
	}
	
	function createWorkItem(column, id, text) {	  
		var workItem = document.createElement('div');
		workItem.textContent = text;
		workItem.className = workItemStyle;
		return workItem;
	};

	function addWorkItemToColumn(column, workItemElement) {
		var text0 = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
		
		var rectStructure = {
			x: column.x + strokeWidth,
			y: column.y + strokeWidth,
			width: column.width - (strokeWidth * 2),
			height: column.height - (strokeWidth * 2),
			element: text0
		};
		
		text0.setAttribute('x', rectStructure.x );
		text0.setAttribute('y', rectStructure.y);
		text0.setAttribute('width', rectStructure.width);
		text0.setAttribute('height', rectStructure.height);
	
		// add to document
		text0.appendChild(workItemElement);
		paper.appendChild(text0);
		
		// adjust height to match rendered text
		var textHeight = workItemElement.scrollHeight;
		text0.setAttribute('height', textHeight +30);	 // add border width to height
		rectStructure.height = textHeight;

		column.workItems.push(workItemElement);

		return rectStructure;
	}			 

	function generateColumns(ofColumns, containerRect) {
		var newColumns = new Array();
		var columnWidth = containerRect.width / ofColumns;
		for (var i = 0; i < ofColumns; i++) {
			var startX = containerRect.x + (columnWidth * i);
			var newColumn = createRect(startX, containerRect.y, columnWidth, containerRect.height);
			newColumn.workItems = new Array();
			newColumns[i] = newColumn;
			if (i % 2 === 0) {
				newColumns[i].element.style.fill = "#EEEBF2";
			}
			
		}
		return newColumns;
	};
									   
	function setViewBox(x, y, width, height) {
		var viewBox = x + " " + y + " " + width + " " + height;
		paper.setAttribute('viewBox', viewBox);
	}

	function createRect(x, y, width, height, id) {
		var newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		newRect.setAttribute('height', height);
		newRect.setAttribute('width', width);
		newRect.setAttribute('x', x);
		newRect.setAttribute('y', y);
		newRect.setAttribute('id', id);
		newRect.style.stroke = '#000000';
		newRect.style.fill = 'none';
		newRect.style['strokeWidth'] = strokeWidth;

		paper.appendChild(newRect);

		return {
			x: x,
			y: y,
			width: width,
			height: height,
			element: newRect
		};
	}
}());