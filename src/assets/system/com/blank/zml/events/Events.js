ZML.Events = (function(){
	
	Events.arr = [];

	function Events()
	{
		this.data = null;
		Events.arr.push(this);
	}
	
	Events.prototype.construct = function(_data)
	{
		this.data = _data;
	}
	
	Events.getEventsById = function(_id)
	{
		var result = null;
		var i = Events.arr.length;
		while(i--)
		{
			var evts = Events.arr[i];
			if(evts.data.attr("id") == _id)
			{
				result = evts;
				break;
			}
		}
		return result;
	}
	
	return Events;
	
})();

