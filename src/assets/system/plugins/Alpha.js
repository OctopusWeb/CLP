ZML.BasicCanvas.prototype.alpha = function(value)
{
	this.view.css("opacity",value);
	this.view.css("-webkit-opacity",value);
	this.view.css("-moz-opacity",value);
	this.view.css("-khtml-opacity",value);
	this.view.css("filter","alpha(opacity="+value*100+")");
}