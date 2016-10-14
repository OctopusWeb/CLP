ZML.NavigationManagerBase = (function(){
	
	function NavigationManagerBase()
	{
		this.eventData = null;
		this.transtionInstance = null;
	}
	
	NavigationManagerBase.prototype.init = function(_navigationController)
	{
		this.controller = _navigationController;
		this.children = this.controller.view.children().toArray();
		var self = this;
		ZML.BroadcastCenter.addEventListener(ZML.NavigationEvent.prototype.type,function(event,data){
			self.eventData = data;
			if($(data).attr("controllerId") == undefined || self.controller.data.attr("id")!=$(data).attr("controllerId"))return;
			var showIdx = $(data).attr("showIdx");
			if(showIdx == "pre")
			{
				self.pre();
			}
			else if(showIdx == "next")
			{
				self.next();
			}
			else
			{
				self.showIdx(Number(showIdx));
			}
		});
	}
	
	NavigationManagerBase.prototype.pre = function()
	{
		var idx = this.controller.defaultIdx;
		idx--;
		if(idx<0)
		{
			var len = this.children.length;
			idx+=len;
		}
		this.showIdx(idx);
	}
	
	NavigationManagerBase.prototype.next = function()
	{
		var idx = this.controller.defaultIdx;
		idx++;
		var len = this.children.length;
		if(idx>=len)
		{
			idx-=len;
		}
		this.showIdx(idx);
	}
	
	NavigationManagerBase.prototype.showIdx = function(_idx)
	{
		//override
		this.controller.defaultIdx = _idx;
	}
	
	return NavigationManagerBase;
	
})();

