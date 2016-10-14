ZML.Transition.Fly = function()
{
	this.ct0 = null;
	this.ct1 = null;
	this.view = null;
}
ZML.Transition.Fly.prototype.start = function(manager,fromElem,toElem,onComplete)
{
	var self = this;
	
	var w = manager.controller.view.outerWidth();
	var h = manager.controller.view.outerHeight();
	
	var ct0 = $("<div>");
	ct0.css("position","absolute");
	ct0.css("pointer-events","none");
	$(fromElem).appendTo(ct0);
	
	ct0.outerWidth(w);
	ct0.outerHeight(h);

	var ct1 = $("<div>");
	ct1.css("position","absolute");
	ct1.css("pointer-events","none");
	$(toElem).css("visibility","visible");
	$(toElem).appendTo(ct1);
	
	ct1.outerWidth(w);
	ct1.outerHeight(h);

	ct0.appendTo(manager.controller.view);
	ct1[manager.direction=="in"?"appendTo":"prependTo"](manager.controller.view);

	var fts = manager.direction=="in"?0:3;
	var tts = manager.direction=="in"?3:0;

	TweenLite.fromTo(ct0,0.5,{scale:1,alpha:1},{scale:fts,alpha:0,ease:Expo.easeInOut});
	TweenLite.fromTo(ct1,0.5,{scale:tts,alpha:0},{scale:1,alpha:1,ease:Expo.easeInOut,onComplete:function(){
		self.dispose();
		onComplete();
	}});

	this.ct0 = ct0;
	this.ct1 = ct1;
	this.view = manager.controller.view;
}

ZML.Transition.Fly.prototype.dispose = function()
{
	if(this.ct0)
	{
		TweenLite.killTweensOf(this.ct0);
		var from = this.ct0.children().eq(0);
		from.css("left","0px");
		from.css("top","0px");
		from.appendTo(this.view);
		from.css("visibility","hidden");
		this.ct0.remove();
		this.ct0 = null;
	}
	if(this.ct1)
	{
		TweenLite.killTweensOf(this.ct1);
		var to = this.ct1.children().eq(0);
		to.appendTo(this.view);
		to.css("left","0px");
		to.css("top","0px");
		this.ct1.remove();
		this.ct1 = null;
	}
	this.view = null;
}

ZML.Transition.FlyIn = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "in";
	ZML.Transition.Fly.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.FlyIn.prototype = new ZML.Transition.Fly();

ZML.Transition.FlyOut = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "out";
	ZML.Transition.Fly.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.FlyOut.prototype = new ZML.Transition.Fly();

ZML.TransitionMap["flyIn"] = ZML.Transition.FlyIn;
ZML.TransitionMap["flyOut"] = ZML.Transition.FlyOut;