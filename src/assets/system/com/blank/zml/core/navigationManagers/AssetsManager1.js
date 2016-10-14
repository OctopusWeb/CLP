ZML.AssetsManager1 = (function(){
	var AssetsManager1 = {};
	AssetsManager1.imgs = {};
	
	AssetsManager1.appendImage = function(src,name)
	{
		AssetsManager1.imgs[name] = {name:name,src:src};
	}
	
	AssetsManager1.clear = function()
	{
		AssetsManager1.imgs = {};
	}
	
	AssetsManager1.getImageByName = function(name)
	{
		return AssetsManager1.imgs[name].image;
	}
	
	AssetsManager1.start = function(onComplete)
	{
		var imgNames = [];
		for(var src in AssetsManager1.imgs)
		{
			imgNames.push(src);
		}
		var idx = 0;
		loadImage(idx);
		
		function loadImage(idx)
		{
			var img = new Image();
			img.src = AssetsManager1.imgs[imgNames[idx]].src;
			img.onload = function(e)
			{
				AssetsManager1.imgs[imgNames[idx]].image = img;
				idx++;
				if(idx<imgNames.length)
				{
					loadImage(idx);
				}
				else
				{
					allDone();
				}
			}
		}
		
		function allDone()
		{
			onComplete();
		}
	}
	
	return AssetsManager1;
})();
