ZML.DefaultNavigationManager = (function(){
	
	DefaultNavigationManager.prototype = new ZML.NavigationManagerBase();

	function DefaultNavigationManager(_navigationController)
	{
		this.init(_navigationController);
	}
	
	DefaultNavigationManager.prototype.init = function(_navigationController)
	{
		ZML.NavigationManagerBase.prototype.init.call(this,_navigationController);
		var len = this.children.length;
		for(var i=0;i<len;i++)
		{
			var child = this.children[i];
			$(child).css("visibility","hidden");
		}
		$(this.children[this.controller.defaultIdx]).css("visibility","visible");
	}
	
	DefaultNavigationManager.prototype.showIdx = function(_idx)
	{
		if(this.controller.defaultIdx == _idx)return;
		var self = this;
		var lastIdx = this.controller.defaultIdx;
		var effectName = $(this.eventData).attr("effect");
		if(effectName==undefined)
		{
			effectName = "none";
		}
		var TransitionClass = ZML.TransitionMap[effectName];
		if(TransitionClass == undefined)
		{
			effectName = "none";
			TransitionClass = ZML.TransitionMap[effectName];
		}
		if(this.transtionInstance!=null)
		{
			this.transtionInstance.dispose();
			this.transtionInstance = null;
		}
		this.transtionInstance = new TransitionClass(this,this.children[lastIdx],this.children[_idx],function(){
			ZML.BroadcastCenter.sendEvent($(self.eventData).children("onComplete").prop("outerHTML"));
		});
		this.controller.defaultIdx = _idx;
	}
	
	return DefaultNavigationManager;
	
})();