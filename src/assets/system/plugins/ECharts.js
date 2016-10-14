ZML.FactoryMap["ECHARTS"] = (function(){
	
	ECharts.prototype = new ZML.BasicCanvas();
	
	function ECharts()
	{
		this.view = this.view.clone();
	}
	
	ECharts.prototype.constructComplete = function()
	{
		this.init();
		ZML.BasicCanvas.prototype.constructComplete.call(this);
	}
	
	ECharts.prototype.init = function()
	{
		var self = this;
		var rootLayer = $("<div>",{style:"position:absolute;"});
		rootLayer.prependTo(this.view);
		var container = $("<div>",{style:"position:absolute;"});
		container.prependTo(rootLayer);
		
		
//		if(this.data.fixed == undefined || this.data.fixed == "true")//修正鼠标定位的问题
		if($(window).width()>=960 && $(window).height()>=540)
		{
			$(window).resize(resizeHandler);
			resizeHandler();
		}
		else
		{
			container.width(this.view.innerWidth());
			container.height(this.view.innerHeight());
		}
		
		
		var chart = echarts.init(container.get(0));
		var jsStr = this.data.children("Option").text();
		var option = eval(jsStr);
		if(option.isOptionObjReady != undefined)
		{
			option.onReady(function(_option){
				chart.setOption(_option);
			});
		}
		else
		{
			chart.setOption(option);
		}
		
		function resizeHandler(e)
		{
			var ts = ZML.Application.instance().container.contentLayer.data("scale");
			ts = Number(ts);
			
			switch(ZML.Application.instance().container.scaleStyle)
			{
				case "zoom":
					rootLayer.css("zoom",1/ts);
				break;
				case "transform":
					rootLayer.css("transform","matrix("+1/ts+",0,0,"+1/ts+",0,0)");
				break;
			}
			
			container.width(self.view.innerWidth()*ts);
			container.height(self.view.innerHeight()*ts);
			if(chart != undefined)chart.resize();
		}
	}
	
	return ECharts;
})();