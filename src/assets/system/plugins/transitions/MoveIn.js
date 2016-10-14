ZML.Transition.MoveIn = function(){}

ZML.Transition.MoveIn.prototype.start = function(manager,fromElem,toElem,onComplete)
{
	var self = this;
	this.from = fromElem;
	this.to = toElem;
	$(this.from).css("pointer-events","none");
	$(this.to).css("pointer-events","none");
	$(toElem).css("visibility","visible");
	var w = manager.controller.view.outerWidth();
	var h = manager.controller.view.outerHeight();
	var dc = [];
	dc["left"] = {from_x:0,from__x:w,from_y:0,from__y:0,to_x:-w,to__x:0,to_y:0,to__y:0};
	dc["right"] = {from_x:0,from__x:-w,from_y:0,from__y:0,to_x:w,to__x:0,to_y:0,to__y:0};
	dc["up"] = {from_x:0,from__x:0,from_y:0,from__y:h,to_x:0,to__x:0,to_y:-h,to__y:0};
	dc["down"] = {from_x:0,from__x:0,from_y:0,from__y:-h,to_x:0,to__x:0,to_y:h,to__y:0};
	var fx0 = dc[manager.direction].from_x;
	var fx1 = dc[manager.direction].from__x;
	var fy0 = dc[manager.direction].from_y;
	var fy1 = dc[manager.direction].from__y;
	var tx0 = dc[manager.direction].to_x;
	var tx1 = dc[manager.direction].to__x;
	var ty0 = dc[manager.direction].to_y;
	var ty1 = dc[manager.direction].to__y;
	TweenLite.fromTo(fromElem,0.5,{x:fx0,y:fy0},{x:fx1,y:fy1,ease:Expo.easeInOut});
	TweenLite.fromTo(toElem,0.5,{x:tx0,y:ty0},{x:tx1,y:ty1,ease:Expo.easeInOut,onComplete:function(){
		self.dispose();
		onComplete();
	}});
}
ZML.Transition.MoveIn.prototype.dispose = function()
{
	if(this.from)
	{
		$(this.from).css("pointer-events","");
		$(this.from).css("visibility","hidden");
		TweenLite.to(this.from,0,{x:0,y:0});
		TweenLite.killTweensOf(this.from);
		this.from = null;
	}
	if(this.to)
	{
		$(this.to).css("pointer-events","");
		TweenLite.to(this.to,0,{x:0,y:0});
		TweenLite.killTweensOf(this.to);
		this.to = null;
	}
}

ZML.Transition.LeftMoveIn = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "left";
	ZML.Transition.MoveIn.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.LeftMoveIn.prototype = new ZML.Transition.MoveIn();

ZML.Transition.RightMoveIn = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "right";
	ZML.Transition.MoveIn.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.RightMoveIn.prototype = new ZML.Transition.MoveIn();

ZML.Transition.UpMoveIn = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "up";
	ZML.Transition.MoveIn.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.UpMoveIn.prototype = new ZML.Transition.MoveIn();

ZML.Transition.DownMoveIn = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "down";
	ZML.Transition.MoveIn.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.DownMoveIn.prototype = new ZML.Transition.MoveIn();

ZML.TransitionMap["leftMoveIn"] = ZML.Transition.LeftMoveIn;
ZML.TransitionMap["rightMoveIn"] = ZML.Transition.RightMoveIn;
ZML.TransitionMap["upMoveIn"] = ZML.Transition.UpMoveIn;
ZML.TransitionMap["downMoveIn"] = ZML.Transition.DownMoveIn;