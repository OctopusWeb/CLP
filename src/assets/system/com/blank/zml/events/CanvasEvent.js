ZML.CanvasEvent = (function(){
	
	CanvasEvent.prototype = new ZML.Event("CanvasEvent");

	function CanvasEvent(){}
	
	CanvasEvent.prototype.construct = function(_data)
	{
		this.data = _data;
	}
	
	return CanvasEvent;
})();

