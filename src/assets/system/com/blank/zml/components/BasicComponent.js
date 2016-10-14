ZML.BasicComponent = (function(){
	
	BasicComponent.prototype = new ZML.BasicCanvas();

	function BasicComponent()
	{
		this.view = this.view.clone();
		this.url = null;
	}
	
	BasicComponent.prototype.constructComplete = function()
	{
		var self = this;
		this.url = ZML.CoreURL.app+this.data.attr("url");
		$.get(this.url,function(data){
			self.constructChildren(data);
		},"text");
	}
	
	BasicComponent.prototype.constructChildren = function(_xml)
	{
		var self = this;
		var nodeData = $(_xml).last();
		var nodeName = nodeData.prop("nodeName").toUpperCase();
		var Class = ZML.FactoryMap[nodeName];
		var node = new Class();
		node.view.bind(ZML.BasicCanvas.CONSTRUCT_COMPLETE,function(){
			node.view.prependTo(self.view);
			self.childrenConstructComplete();
		});
		node.construct(nodeData);
	}
	
	BasicComponent.prototype.childrenConstructComplete = function()
	{
		ZML.BasicCanvas.prototype.constructComplete.call(this);
	}
	
	return BasicComponent;
})();