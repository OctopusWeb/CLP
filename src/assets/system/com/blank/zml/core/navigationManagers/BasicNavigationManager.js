ZML.BasicNavigationManager = (function(){
	
	BasicNavigationManager.prototype = new ZML.NavigationManagerBase();

	function BasicNavigationManager(_navigationController)
	{
		this.ct = null;
		this.init(_navigationController);
	}
	
	BasicNavigationManager.prototype.init = function(_navigationController)
	{
		ZML.NavigationManagerBase.prototype.init.call(this,_navigationController);
		var len = this.children.length;
		this.ct = $("<div>");
		this.ct.appendTo(this.controller.view);
		this.ct.css("position","absolute");
		for(var i=0;i<len;i++)
		{
			var child = $(this.children[i]);
			var tx = this.controller.data.attr("width")*i;
			child.css("left",tx+"px");
			child.appendTo(this.ct);
		}
	}
	
	BasicNavigationManager.prototype.pre = function()
	{
		var idx = this.controller.defaultIdx;
		idx--;
		if(idx>-1)
		{
			this.showIdx(idx);
		}
	}
	
	BasicNavigationManager.prototype.next = function()
	{
		var idx = this.controller.defaultIdx;
		idx++;
		var len = this.children.length;
		if(idx<len)
		{
			this.showIdx(idx);
		}
	}
	
	BasicNavigationManager.prototype.showIdx = function(_idx)
	{
		var tx = -this.controller.data.attr("width")*_idx;
		try
		{
			TweenLite.to(this.ct,0.5,{x:tx,ease:Expo.easeInOut});
		}catch(e)
		{
			//trace(e.message);
			this.ct.animate({left:tx},500);
		}
		this.controller.defaultIdx = _idx;
	}
	
	return BasicNavigationManager;
	
})();