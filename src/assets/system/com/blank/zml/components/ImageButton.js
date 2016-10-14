ZML.ImageButton = (function(){
	
	ImageButton.prototype = new ZML.ImageCanvas();
	
	function ImageButton()
	{
		this.view = this.view.clone();
	}
	
	ImageButton.prototype.constructComplete = function()
	{
		ImageButton.prototype.clickHandler = ZML.Button.prototype.clickHandler;
		ImageButton.prototype.bindEvents = ZML.Button.prototype.bindEvents;
		ImageButton.prototype.effect = ZML.Button.prototype.effect;
		ImageButton.prototype.enabled = ZML.Button.prototype.enabled;
		ImageButton.prototype.unbindEvents = ZML.Button.prototype.unbindEvents;
		ZML.Button.prototype.init.call(this);
		ZML.Button.prototype.initSelfEvents.call(this);
		ZML.ImageCanvas.prototype.constructComplete.call(this);
	}
	
	return ImageButton;
})();
