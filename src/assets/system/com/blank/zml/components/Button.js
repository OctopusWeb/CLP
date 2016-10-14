ZML.Button = (function(){
	
	Button.prototype = new ZML.BasicCanvas();

	function Button()
	{
		this.view = this.view.clone();
		this.effectInstance = null;
	}
	
	Button.prototype.constructComplete = function()
	{
		this.init();
		ZML.BasicCanvas.prototype.constructComplete.call(this);
	}
	
	Button.prototype.init = function()
	{
		this.buttonMode(true);
		var effectStr = this.data.attr("effect");
		if(effectStr!=undefined)
		{
			this.effect(effectStr);
		}
		this.bindEvents();
		if(this.data.attr("enabled")!=undefined)
		{
			this.enabled(this.data.attr("enabled") == "true"?true:false);
		}
	}
	
	Button.prototype.initEvents = function()
	{
		ZML.BasicCanvas.prototype.initEvents.call(this);
		this.initSelfEvents();
	}
	
	Button.prototype.initSelfEvents = function()
	{
		var self = this;
		ZML.BroadcastCenter.addEventListener(ZML.CanvasEvent.prototype.type,function(event,data){
			if($(data).attr("id") == undefined || $(data).attr("id")!=self.data.attr("id"))return;
			var action = $(data).attr("action");
			if(action!=undefined && action == "set")
			{
				if($(data).attr("enabled")!=undefined)
				{
					self.enabled($(data).attr("enabled") == "true"?true:false);
				}
			}
		});
	}
	
	Button.prototype.bindEvents = function()
	{
		var self = this;
		this.view.bind("click",function(){
			self.clickHandler();
		});
	}
	
	Button.prototype.unbindEvents = function()
	{
		this.view.unbind("click");
	}
	
	Button.prototype.effect = function(effectStr)
	{
		if(effectStr!=null)
		{
			var EffectClass = ZML.ButtonEffectMap[effectStr];
			if(EffectClass!=undefined && this.effectInstance == null)
			{
				this.effectInstance = new EffectClass(this);
			}
		}
		else
		{
			if(this.effectInstance!=null)
			{
				this.effectInstance.dispose();
				this.effectInstance = null;
			}
		}
	}
	
	Button.prototype.clickHandler = function()
	{
		var eventStr = this.data.children("Click").prop("outerHTML");
		ZML.BroadcastCenter.sendEvent(eventStr);
	}
	
	Button.prototype.enabled = function(bol)
	{
		this.buttonMode(bol);
		this.alpha(bol?1:0.5);
		if(bol)
		{
			this.bindEvents();
			if(this.data.attr("effect")!=undefined)
			{
				this.effect(this.data.attr("effect"));
			}
		}
		else
		{
			this.unbindEvents();
			this.effect(null);
		}
	}
	
	return Button;
	
})();