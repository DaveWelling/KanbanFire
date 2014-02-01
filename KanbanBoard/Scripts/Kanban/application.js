/// <reference path="../require.js" />
/// <reference path="../jquery-2.0.3.js" />
/// <reference path="../jquery.mousewheel.js" />
/// <reference path="../raphael.js" />
/// <reference path="viewPortHelper.js" />

require(["viewPortHelper", "../jquery.mousewheel"], function (ViewPortHelper) {
	var numberOfColumns = 6;
	var cornerRadius = 5;
	var paperHeight = $(window).height() - (cornerRadius * 8);
	var paperWidth = $(window).width() - (cornerRadius * 8);
	var paper = window.Raphael($("#holdKanban")[0], paperWidth, paperHeight);

	paper.setStart(); // Begin set of all elements;
	var outerBorder = paper.rect(0, 0, paperWidth, paperHeight, cornerRadius);
		  
	var columnContainer = paper.rect(cornerRadius, cornerRadius, paperWidth - (cornerRadius * 2), paperHeight - (cornerRadius * 2));
	columnContainer.attrs["stroke-width"] = 0;
	
	var generateColumns = function(ofColumns, container) {
		var newColumns = new Array();
		var pctBox = container.getBBox();
		var columnWidth = pctBox.width / ofColumns;
		for (var i = 0; i < ofColumns; i++) {
			var startX = pctBox.x + (columnWidth * i);
			newColumns[i] = paper.rect(startX, pctBox.y, columnWidth, pctBox.height);
			if (i % 2 === 0) {
				newColumns[i].attr("fill", "#EEEBF2");
			}
		}
		return newColumns;
	};

	var columns = generateColumns(numberOfColumns, columnContainer);

	var columnSet = paper.setFinish();

	//var panAndZoom = new SetPanAndZoomHelper(paper, document.getElementById('holdKanban'), columnSet);

	var viewPortHelper = new ViewPortHelper(document.getElementById('holdKanban'), paper);
});
