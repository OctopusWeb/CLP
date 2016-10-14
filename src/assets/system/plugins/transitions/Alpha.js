ZML.Transition.Alpha = function(manager,fromElem,toElem,onComplete)
{
	var self = this;
	this.from = fromElem;
	this.to = toElem;
	$(toElem).css("visibility","visible");
	$(this.from).css("pointer-events","none");
	$(this.to).css("pointer-events","none");
	TweenLite.to(fromElem,0.5,{alpha:0});
	TweenLite.fromTo(toElem,0.5,{alpha:0},{alpha:1,onComplete:function(){
		self.dispose();
		onComplete();
	}});
}

ZML.Transition.Alpha.prototype.dispose = function()
{
	if(this.from)
	{
		$(this.from).css("pointer-events","");
		$(this.from).css("visibility","hidden");
		TweenLite.to(this.from,0,{alpha:1});
		TweenLite.killTweensOf(this.from);
		this.from = null;
	}
	if(this.to)
	{
		$(this.to).css("pointer-events","");
		TweenLite.to(this.to,0,{alpha:1});
		TweenLite.killTweensOf(this.to);
		this.to = null;
	}
}

ZML.TransitionMap["alpha"] = ZML.Transition.Alpha;