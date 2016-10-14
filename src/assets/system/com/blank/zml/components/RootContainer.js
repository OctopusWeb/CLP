ZML.RootContainer = function(info)
{
	var self = this;
	info = info == undefined ? {} : info;
	this.view = $("<div>",{style:"position:absolute;overflow:hidden;"});
	this.view.appendTo("body");
	
	this.view.css("background",info.background != undefined ? info.background : "#000");
	
	this.contentLayer = $("<div>",{style:"position:absolute;"});
	this.contentLayer.appendTo(this.view);
	
	if(info.loading!=undefined)ZML.Preloader.loading.setColor(info.loading);
	ZML.Preloader.loading.view.appendTo(this.view);
	
	this.scaleStyle = info.scaleStyle == undefined ? "transform" : info.scaleStyle;
	
	$(window).resize(resizeHandler);
	resizeHandler(null);
	
	function resizeHandler(e)
	{
		if(info.width != undefined && info.height != undefined)
		{
			var w = info.width;
			var h = info.height;
			var maxW = $(window).width();
			var maxH = $(window).height();
			var ts = w/maxW > h/maxH ? maxW/w : maxH/h;
			var tx = (maxW - w*ts)*0.5;
			var ty = (maxH - h*ts)*0.5;
			self.view.css("left",tx);
			self.view.css("top",ty);
			self.view.width(w*ts);
			self.view.height(h*ts);
			/**
			 * 注意:
			 * zoom缩放不会缩放文字
			 * transform缩放整个画布
			 */
			self.contentLayer.data("scale",ts);
			
			switch(self.scaleStyle)
			{
				case "zoom":
					self.contentLayer.css("zoom",ts);
				break;
				case "transform":
					self.contentLayer.css("transform","matrix("+ts+",0,0,"+ts+",0,0)");
				break;
			}
		}
		else
		{
			self.contentLayer.width('100%');
			self.contentLayer.height('100%');
			self.view.width('100%');
			self.view.height('100%');
		}
		
		ZML.Preloader.loading.view.css("left",(self.view.width()-ZML.Preloader.loading.width)*0.5+"px");
		ZML.Preloader.loading.view.css("top",(self.view.height()-ZML.Preloader.loading.height)*0.5+"px");
	}
}