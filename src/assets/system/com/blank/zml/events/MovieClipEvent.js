ZML.MovieClipEvent = (function(){
	
	MovieClipEvent.prototype = new ZML.Event("MovieClipEvent");

	function MovieClipEvent(){}
	
	MovieClipEvent.prototype.construct = function(_data)
	{
		this.data = _data;
	}
	
	return MovieClipEvent;
	
})();

