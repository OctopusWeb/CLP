ZML.VideoCanvas = (function(){
	
	VideoCanvas.prototype = new ZML.BasicCanvas();
	function VideoCanvas()
	{
		this.view = this.view.clone();
		this.video = null;
	}
	
	VideoCanvas.prototype.construct = function(_data)
	{
		var self = this;
		this.video = $("<video>");
		this.video.bind("timeupdate",function(){
			self.update();
		});
		this.video.appendTo(this.view);
		ZML.BasicCanvas.prototype.construct.call(this,_data);
	}
	
	VideoCanvas.prototype.update = function()
	{
		ZML.BroadcastCenter.sendEvent(this.data.children("onUpdate").prop("outerHTML"));
		if(this.video.get(0).ended)
		{
			ZML.BroadcastCenter.sendEvent(this.data.children("onComplete").prop("outerHTML"));
		}
	}
	
	VideoCanvas.prototype.handleSpecialNode = function(nodeName,nodeValue)
	{
		var isSpecial = ZML.BasicCanvas.prototype.handleSpecialNode.call(this,nodeName,nodeValue);
		switch(nodeName.toLowerCase())
		{
			case "width":
				this.video.attr(nodeName,nodeValue);
				isSpecial = true;
				break;
			case "height":
				this.video.attr(nodeName,nodeValue);
				isSpecial = true;
				break;
			case "src":
				nodeValue = ZML.CoreURL.app+nodeValue;
				this.video.attr(nodeName,nodeValue);
				isSpecial = true;
				break;
			case "autoplay":
				if(nodeValue == "true")
				{
					nodeValue  = "autoplay";
					this.video.attr(nodeName,nodeValue);
				}
				else
				{
					this.video.removeAttr(nodeName);
				}
				isSpecial = true;
				break;
			case "controls":
				if(nodeValue == "true")
				{
					nodeValue  = "controls";
					this.video.attr(nodeName,nodeValue);
				}
				else
				{
					this.video.removeAttr(nodeName);
				}
				isSpecial = true;
				break;
			case "loop":
				if(nodeValue == "true")
				{
					nodeValue  = "loop";
					this.video.attr(nodeName,nodeValue);
				}
				else
				{
					this.video.removeAttr(nodeName);
				}
				isSpecial = true;
				break;
			case "preload":
				if(nodeValue == "true")
				{
					this.video.attr(nodeName,nodeValue);
				}
				else
				{
					this.video.removeAttr(nodeName);
				}
				isSpecial = true;
				break;
		}
		return isSpecial;
	}
	
	VideoCanvas.prototype.initEvents = function()
	{
		var self = this;
		ZML.BasicCanvas.prototype.initEvents.call(this);
		ZML.BroadcastCenter.addEventListener(ZML.VideoEvent.prototype.type,function(event,data){
			if($(data).attr("id") == undefined || $(data).attr("id")!=self.data.attr("id"))return;
			var action = $(data).attr("action");
			switch(action)
			{
				case "play":
					self.video.get(0).play();
					break;
				case "pause":
					self.video.get(0).pause();
					break;
				case "stop":
					self.video.get(0).pause();
					self.video.get(0).currentTime = 0;
					break;
				case "fullScreen":
					self.video.get(0).webkitRequestFullScreen();
					break;
				case "exitFullScreen":
					document.webkitCancelFullScreen();
					break;
				case "set":
					var arr = ["currentTime","volume","muted"];
					var len = arr.length;
					for(var i=0;i<len;i++)
					{
						var att = $(data).attr(arr[i]);
						if(att!=undefined)
						{
							self.video.get(0)[arr[i]] = att;
						}
					}
					break;
			}
	
		});
	}
	
	return VideoCanvas;
})();

