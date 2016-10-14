ZML.NavigationEvent = (function(){
	
	NavigationEvent.prototype = new ZML.Event("NavigationEvent");

	function NavigationEvent(){}
	
	NavigationEvent.prototype.construct = function(_data)
	{
		this.data = _data;
	}
	
	return NavigationEvent;
	
})();

