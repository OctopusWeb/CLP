ZML.Transition.Reverse = function()
{
	this.ct0 = null;
	this.ct1 = null;
	this.container = null;
	this.view = null;
}

ZML.Transition.Reverse.prototype.start = function(manager,fromElem,toElem,onComplete)
{
	var self = this;
	var w = manager.controller.view.outerWidth();
	var h = manager.controller.view.outerHeight();

	var ct0 = $("<div>");
	ct0.css("position","absolute");
	$(fromElem).appendTo(ct0);
	ct0.outerWidth(w);
	ct0.outerHeight(h);

	var ct1 = $("<div>");
	ct1.css("position","absolute");
	$(toElem).css("visibility","visible");
	$(toElem).appendTo(ct1);
	ct1.outerWidth(w);
	ct1.outerHeight(h);

	var container = $("<div>");
	container.css("position","absolute");
	container.css("pointer-events","none");
	container.appendTo(manager.controller.view);
	ct0.appendTo(container);

	var tz = -200;
	var time = 0.5;
	var dic = [];
	dic["left"] = {fx0:0,fx1:0,fy0:0,fy1:-90,tx0:0,tx1:0,ty0:90,ty1:0};
	dic["right"] = {fx0:0,fx1:0,fy0:0,fy1:90,tx0:0,tx1:0,ty0:-90,ty1:0};
	dic["up"] = {fx0:0,fx1:90,fy0:0,fy1:0,tx0:-90,tx1:0,ty0:0,ty1:0};
	dic["down"] = {fx0:0,fx1:-90,fy0:0,fy1:0,tx0:90,tx1:0,ty0:0,ty1:0};
	var fx0 = dic[manager.direction].fx0;
	var fx1 = dic[manager.direction].fx1;
	var fy0 = dic[manager.direction].fy0;
	var fy1 = dic[manager.direction].fy1;
	var tx0 = dic[manager.direction].tx0;
	var tx1 = dic[manager.direction].tx1;
	var ty0 = dic[manager.direction].ty0;
	var ty1 = dic[manager.direction].ty1;

	ct1.appendTo(container);
	ct1.css("opacity",0);
	
	TweenLite.set(container,{perspective:w});
	TweenLite.to(ct1,0,{rotationX:tx0,rotationY:ty0,z:tz});
	TweenLite.fromTo(ct0,time,{rotationX:fx0,rotationY:fy0,z:0},{rotationX:fx1,rotationY:fy1,z:tz,ease:Expo.easeIn,onComplete:function(){
		ct0.css("opacity",0);
		ct1.css("opacity",1);
		TweenLite.to(ct1,time,{rotationX:tx1,rotationY:ty1,z:0,ease:Expo.easeOut,onComplete:function(){
			self.dispose();
			onComplete();
		}});
	}});

	this.ct0 = ct0;
	this.ct1 = ct1;
	this.container = container;
	this.view = manager.controller.view;
}

ZML.Transition.Reverse.prototype.dispose = function()
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
	if(this.container)
	{
		this.container.remove();
		this.container = null;
	}
	this.view = null;
}

ZML.Transition.LeftReverse = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "left";
	ZML.Transition.Reverse.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.LeftReverse.prototype = new ZML.Transition.Reverse();

ZML.Transition.RightReverse = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "right";
	ZML.Transition.Reverse.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.RightReverse.prototype = new ZML.Transition.Reverse();

ZML.Transition.UpReverse = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "up";
	ZML.Transition.Reverse.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.UpReverse.prototype = new ZML.Transition.Reverse();

ZML.Transition.DownReverse = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "down";
	ZML.Transition.Reverse.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.DownReverse.prototype = new ZML.Transition.Reverse();

ZML.TransitionMap["leftReverse"] = ZML.Transition.LeftReverse;
ZML.TransitionMap["rightReverse"] = ZML.Transition.RightReverse;
ZML.TransitionMap["upReverse"] = ZML.Transition.UpReverse;
ZML.TransitionMap["downReverse"] = ZML.Transition.DownReverse;