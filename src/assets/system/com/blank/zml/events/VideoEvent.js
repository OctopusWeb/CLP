ZML.VideoEvent = (function(){
	
	function VideoEvent(){}
	VideoEvent.prototype = new ZML.Event("VideoEvent");
	VideoEvent.prototype.construct = function(_data)
	{
		this.data = _data;
	}
	
	return VideoEvent;
	
})();

