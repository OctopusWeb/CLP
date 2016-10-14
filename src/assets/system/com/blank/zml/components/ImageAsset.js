ZML.ImageAsset = (function(){
	ImageAsset.list = [];
	function ImageAsset()
	{
		this.data = null;
		this.url = null;
		this.image = null;
		ImageAsset.list.push(this);
	}
	
	ImageAsset.prototype.construct = function(_data)
	{
		var self = this;
		this.data = _data;
		this.url = ZML.CoreURL.app + this.data.attr("url");
		ZML.AssetsManager.appendToLoad(this.url,function(img){
			self.image = img;
		});
	}
	
	ImageAsset.getImageById = function(_id)
	{
		var target = null;
		var len = ImageAsset.list.length;
		for(var i=0;i<len;i++)
		{
			var imageAsset = ImageAsset.list[i];
			if(imageAsset.data.attr("id") == _id)
			{
				target = imageAsset;
				break;
			}
		}
		return target;
	}
	return ImageAsset;
})();