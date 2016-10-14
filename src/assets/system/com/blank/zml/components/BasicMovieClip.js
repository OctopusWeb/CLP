ZML.BasicMovieClip = (function(){
	
	BasicMovieClip.prototype = new ZML.BasicCanvas();

	function BasicMovieClip()
	{
		this.view = this.view.clone();
		this.currentFrame = 0;
		this.interval = null;
		this.frameRate = 60;
	}
	
	BasicMovieClip.prototype.constructComplete = function()
	{
		this.init();
		ZML.BasicCanvas.prototype.constructComplete.call(this);
	}
	
	BasicMovieClip.prototype.init = function()
	{
		var self = this;
		if(this.data.attr("frameRate")!=undefined)
		{
			this.frameRate = Number(this.data.attr("frameRate"));
		}
		this.children = this.view.children().toArray();
		var len = this.children.length;
		for(var i=0;i<len;i++)
		{
			var child = this.children[i];
			$(child).detach();
		}
		$(this.children[0]).appendTo(this.view);
	
		if(this.data.attr("gotoAndStop")!=undefined)
		{
			this.gotoAndStop(Number(this.data.attr("gotoAndStop")));
		}
		else if(this.data.attr("gotoAndPlay")!=undefined)
		{
			this.gotoAndPlay(Number(this.data.attr("gotoAndPlay")));
		}
		else
		{
			this.startInterval();
		}
	
		ZML.BroadcastCenter.addEventListener(ZML.MovieClipEvent.prototype.type,function(event,data){
			if($(data).attr("id")!=self.data.attr("id"))return;
			var action = $(data).attr("action");
			switch(action)
			{
				case "play":
					self.play();
					break;
				case "stop":
					self.stop();
					break;
				case "gotoAndStop":
					self.gotoAndStop(Number($(data).attr("frame")));
					break;
				case "gotoAndPlay":
					self.gotoAndPlay(Number($(data).attr("frame")));
					break;
			}
		});
	}
	
	BasicMovieClip.prototype.startInterval = function()
	{
		var self = this;
		this.interval = setInterval(function(){
			self.EnterFrame();
		},1000/this.frameRate);
	}
	
	BasicMovieClip.prototype.clearInterval = function()
	{
		clearInterval(this.interval);
		this.interval = null;
	}
	
	BasicMovieClip.prototype.setFrame = function(_frame)
	{
		$(this.children[this.currentFrame]).detach();
		$(this.children[_frame]).appendTo(this.view);
		this.currentFrame = _frame;
	}
	
	BasicMovieClip.prototype.EnterFrame = function()
	{
		var frame = this.currentFrame+1;
		var len = this.children.length;
		if(frame>len-1)
		{
			frame-=len;
		}
		this.setFrame(frame);
	}
	
	BasicMovieClip.prototype.play = function()
	{
		if(this.interval!=null)return;
		this.startInterval();
	}
	
	BasicMovieClip.prototype.stop = function()
	{
		if(this.interval == null)return;
		this.clearInterval();
	}
	
	BasicMovieClip.prototype.gotoAndStop = function(_frame)
	{
		this.stop();
		this.setFrame(_frame);
	}
	
	BasicMovieClip.prototype.gotoAndPlay = function(_frame)
	{
		this.setFrame(_frame);
		this.play();
	}
	
	return BasicMovieClip;
})();