ZML.ImageCanvas = (function(){
	
	ImageCanvas.prototype = new ZML.BasicCanvas();

	function ImageCanvas()
	{
		this.view = this.view.clone();
		this.__image = new ZML.BasicCanvas();
	}
	
	ImageCanvas.prototype.constructComplete = function()
	{
		var self = this;
		if(this.data.attr("source")!=undefined)
		{
			ZML.BroadcastCenter.addEventListener(ZML.CoreEvent.ASSETS_READY,function(){
				var imageAsset = ZML.ImageAsset.getImageById(self.data.attr("source"));
				var image = $(imageAsset.image).clone();
				self.addImage(image);
			});
		}
		else
		{
			var url = ZML.CoreURL.app + this.data.attr("url");
			var preload = this.data.attr("preload");
			preload = (preload!=undefined && preload == "true")?true:false;
			if(preload)
			{
				ZML.AssetsManager.appendToLoad(url,function(img){
					self.addImage($(img));
				});
			}
			else
			{
				var elm = $("<img>",{
					src:url
				});
				this.addImage(elm);
			}
		}
		ZML.BasicCanvas.prototype.constructComplete.call(this);
	}
	
	ImageCanvas.prototype.addImage = function(image)
	{
		image.attr("ondragstart","return false;");
		this.__image.view = image;
	
		image.css("position","absolute");
		var imgCss = this.data.attr("img");
		if(imgCss!=undefined)
		{
			var atts = imgCss.split(",");
			var len = atts.length;
			for(var i=0;i<len;i++)
			{
				var att = atts[i].split(":");
				var isSpecial = ZML.BasicCanvas.prototype.handleSpecialNode.call(this.__image,att[0],att[1]);
				if(!isSpecial)
				{
					image.css(att[0],att[1]);
				}
			}
		}
		image.prependTo(this.view);
	}
	
	return ImageCanvas;
	
})();