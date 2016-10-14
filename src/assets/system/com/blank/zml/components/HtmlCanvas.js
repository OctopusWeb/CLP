ZML.HtmlCanvas = (function(){
	
	HtmlCanvas.prototype = new ZML.BasicCanvas();

	function HtmlCanvas()
	{
		this.view = this.view.clone();
	}
	
	HtmlCanvas.prototype.construct = function(_data)
	{
		ZML.BasicCanvas.list.push(this);
		this.data = _data;
		ZML.BasicCanvas.prototype.mappingCss.call(this,_data);
		this.initEvents();
		this.view.html(this.data.html());
		ZML.BasicCanvas.prototype.constructComplete.call(this);
	}
	
	HtmlCanvas.prototype.initEvents = function()
	{
		ZML.BasicCanvas.prototype.initEvents.call(this);
		var self = this;
		ZML.BroadcastCenter.addEventListener(ZML.CanvasEvent.prototype.type,function(event,data){
			if($(data).attr("id") == undefined || $(data).attr("id")!=self.data.attr("id"))return;
			var action = $(data).attr("action");
			if(action!=undefined && action == "set")
			{
				var html = $(data).attr("html");
				if(html != undefined)
				{
					self.view.html($(data).children(html).html());
				}
			}
		});
	}
	
	return HtmlCanvas;
	
})();