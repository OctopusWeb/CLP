ZML.TweenEvent = (function(){
	
	function TweenEvent(){}
	TweenEvent.prototype = new ZML.Event("TweenEvent");
	
	TweenEvent.prototype.construct = function(_data)
	{
		this.data = _data;
	}
	
	ZML.FactoryMap["TWEEN"] = TweenEvent;
	
	return TweenEvent;
	
})();

ZML.Tween = (function(){
	
	Tween.list = {};

	function Tween(_data)
	{
		this.data = _data;
		this.tweenlite = null;
		var self = this;
	
		var duration = $(this.data).attr("duration");
		var target = $("#"+$(this.data).attr("target"));
		var action = $(this.data).attr("action");
		var id = $(this.data).attr("id");
		var tween;
		if(action==undefined)
		{
			action = "to";
		}
		else if(action == "kill")
		{
			tween = this.getTweenById(id);
			if(tween!=undefined)
			{
				tween.tweenlite.kill();
				delete Tween.list[id];
			}
			return;
		}
		else if(action == "pause")
		{
			tween = this.getTweenById(id);
			if(tween!=undefined)
			{
				tween.tweenlite.pause();
			}
			return;
		}
		else if(action == "play")
		{
			tween = this.getTweenById(id);
			if(tween!=undefined)
			{
				tween.tweenlite.play();
			}
			return;
		}
		else if(action == "restart")
		{
			tween = this.getTweenById(id);
			if(tween!=undefined)
			{
				tween.tweenlite.restart();
			}
			return;
		}
		else if(action == "resume")
		{
			tween = this.getTweenById(id);
			if(tween!=undefined)
			{
				tween.tweenlite.resume();
			}
			return;
		}
		else if(action == "reverse")
		{
			tween = this.getTweenById(id);
			if(tween!=undefined)
			{
				tween.tweenlite.reverse();
			}
			return;
		}
		else if(action == "killTweensOf")
		{
			TweenLite.killTweensOf(target);
		}
		var option = {};
	
		var atts = this.data.attributes;
		var len = atts.length;
		for(var i = 0;i<len;i++)
		{
			var nodeName = atts[i].nodeName;
			var nodeValue = atts[i].nodeValue;
			option[nodeName] = nodeValue;
		}
		if(option.x!=undefined)
		{
			option.left = option.x;
			delete option.x;
		}
		if(option.y!=undefined)
		{
			option.top = option.y;
			delete option.y;
		}
		if(option.id!=undefined)
		{
			delete option.id;
		}
		if(option.target!=undefined)
		{
			delete option.target;
		}
		if(option.action!=undefined)
		{
			delete option.action;
		}
		if(option.duration!=undefined)
		{
			delete option.duration;
		}
		if(option.scalex!=undefined)
		{
			option.scaleX = option.scalex;
			delete option.scalex;
		}
		if(option.scaley!=undefined)
		{
			option.scaleY = option.scaley;
			delete option.scaley;
		}
		if(option.rotationx!=undefined)
		{
			option.rotationX= option.rotationx;
			delete option.rotationx;
		}
		if(option.rotationy!=undefined)
		{
			option.rotationY = option.rotationy;
			delete option.rotationy;
		}
		if(option.autoalpha!=undefined)
		{
			option.autoAlpha = option.autoalpha;
			delete option.autoalpha;
		}
		if(option.backgroundcolor!=undefined)
		{
			option.backgroundColor = option.backgroundcolor;
			delete option.backgroundcolor;
		}
		if(action!="fromTo")
		{
			option.onStart = onStart;
			option.onUpdate = onUpdate;
			option.onComplete = onComplete;
			this.tweenlite = TweenLite[action](target,duration,option);
		}
		else
		{
			var option0 = {};
			var option1 = {};
			option1.onStart = onStart;
			option1.onUpdate = onUpdate;
			option1.onComplete = onComplete;
			for(var i in option)
			{
				var arr = option[i].split(",");
				option0[i] = arr[0];
				option1[i] = arr[1];
			}
			this.tweenlite = TweenLite[action](target,duration,option0,option1);
		}
		if(id!=undefined)
		{
			Tween.list[id] = this;
		}
		//trace(option);
	
		function onStart()
		{
			ZML.BroadcastCenter.sendEvent($(self.data).children("onStart").prop("outerHTML"));
		}
	
		function onUpdate()
		{
			ZML.BroadcastCenter.sendEvent($(self.data).children("onUpdate").prop("outerHTML"));
		}
	
		function onComplete()
		{
			ZML.BroadcastCenter.sendEvent($(self.data).children("onComplete").prop("outerHTML"));
		}
	}
	
	Tween.prototype.getTweenById = function(_id)
	{
		return Tween.list[_id];
	}
	
	Tween.Delay = function(_data)
	{
		var delay = $(_data).attr("time");
		var id = $(_data).attr("id");
		var action = $(_data).attr("action");
		if(delay!=undefined)
		{
			TweenLite.delayedCall(delay,myFunc);
		}
		else if(action!=undefined && action == "kill")
		{
			TweenLite.killDelayedCallsTo(Tween.Delay.list[id]);
			delete Tween.Delay.list[id];
		}
		if(id!=undefined)
		{
			Tween.Delay.list[id] = myFunc;
		}
	
		function myFunc()
		{
			ZML.BroadcastCenter.sendEvent(_data.outerHTML);
		}
	}
	Tween.Delay.list = {};
	Tween.DelayEvent = function(){}
	Tween.DelayEvent.prototype = new ZML.Event("DelayEvent");
	Tween.DelayEvent.prototype.construct = function(_data)
	{
		this.data = _data;
	}
	
	Tween.init = function()
	{
		CSSPlugin.defaultTransformPerspective = 500;
		ZML.BroadcastCenter.addEventListener(ZML.TweenEvent.prototype.type,function(event,data){
			var tween = new Tween(data);
		});
		ZML.BroadcastCenter.addEventListener(Tween.DelayEvent.prototype.type,function(event,data){
			var delay = new Tween.Delay(data);
		});
	}
	
	ZML.FactoryMap["DELAY"] = Tween.DelayEvent;
	Tween.init();
	
	return Tween;
	
})();