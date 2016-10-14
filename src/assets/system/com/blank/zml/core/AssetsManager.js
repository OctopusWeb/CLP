ZML.AssetsManager = (function(){
	
	var AssetsManager = {};
	AssetsManager.appData = null;
	AssetsManager.configData = null;
	AssetsManager.loadList = [];
	AssetsManager.init = function()
	{
		//加载配置文件
		function loadConfig(onComplete)
		{
			var configUrl = ZML.CoreURL.system+ZML.CoreURL.systemConfig;
			$.get(configUrl,function(data){
				AssetsManager.configData = data;
				ZML.Preloader.appendProgress(5);
				onComplete();
			},"text");
		}
	
		//加载JS和CSS
		function loadJS_and_CSS(onComplete)
		{
			var list = $(AssetsManager.configData).last().children("import").eq(0).children();
			var len = list.length;
			if(len>0)
			{
				loadIdx(0);
			}
			else
			{
				ZML.Preloader.appendProgress(40);
				onComplete();
			}
	
			function loadIdx(_idx)
			{
				if(_idx == len)
				{
					onComplete();
					return;
				}
				var nodeName = $(list[_idx]).prop("nodeName").toUpperCase();
				if(nodeName == "SCRIPT")
				{
					loadJS(_idx,completeHandler);
				}
				else if(nodeName == "LINK")
				{
					loadCSS(_idx,completeHandler);
				}
			}
	
			function loadJS(_idx,_onComplete)
			{
				//尝试了多种加载JS的方式，目前这是最完美的方式.
				var jsUrl = $(list[_idx]).attr("src");
				var scriptElm = document.createElement("script");
				scriptElm.src = jsUrl;
				document.getElementsByTagName('head')[0].appendChild(scriptElm);
				scriptElm.onload = function()
				{
					_onComplete(_idx);
				}
			}
	
			function loadCSS(_idx,_onComplete)
			{
				var linkNode = $(list[_idx]);
				linkNode.get(0).onload = function(){
					_onComplete(_idx);
				}
				linkNode.appendTo('head');
			}
	
			function completeHandler(_idx)
			{
				ZML.Preloader.appendProgress(40/len);
				_idx++;
				loadIdx(_idx);
			}
		}
	
		//加载Application.xml
		function loadAppData(onComplete)
		{
			var appUrl = ZML.CoreURL.app+ZML.CoreURL.appRoot;
			$.get(appUrl,function(data){
				AssetsManager.appData = data;
				ZML.Preloader.appendProgress(5);
				onComplete();
			},"text");
		}
	
		loadConfig(function(){
			loadJS_and_CSS(function(){
				loadAppData(function(){
					ZML.BroadcastCenter.dispatchEvent(new ZML.Event(ZML.CoreEvent.APP_DATA_READY));
				});
			});
		});
	}
	
	AssetsManager.appendToLoad = function(url,onComplete)
	{
		AssetsManager.loadList.push({url:url,onComplete:onComplete});
	}
	
	//预加载应用程序资源
	AssetsManager.assetsLoadStart = function()
	{
		ZML.Preloader.appendProgress(5);
		var len = AssetsManager.loadList.length;
		if(len>0)
		{
			loadAsset(0);
		}
		else
		{
			ZML.Preloader.appendProgress(45);
			allComplete();
		}
		function loadAsset(_idx)
		{
			if(_idx == len)
			{
				allComplete();
				return;
			}
			var url = AssetsManager.loadList[_idx].url;
			var func = AssetsManager.loadList[_idx].onComplete;
			if(isImageUrl(url))
			{
				loadImage(url,function(img){
					func(img);
					loadComplete(_idx);
				});
			}
			else
			{
				$.get(url,function(data){
					func(data);
					loadComplete(_idx);
				});
			}
		}
	
		function loadImage(_url,_onComplete)
		{
			var img = new Image();
			img.onload = function()
			{
				_onComplete(img)
			}
			img.src = _url;
		}
	
		function isImageUrl(_url)
		{
			var result = false;
			var exts = ["jpg","jpeg","png","gif"];
			var i = exts.length;
			while(i--)
			{
				var tmp = _url.indexOf(exts[i]);
				if(tmp>-1)
				{
					result = true;
					break;
				}
			}
			return result;
		}
	
		function loadComplete(_idx)
		{
			ZML.Preloader.appendProgress(45/len);
			_idx++;
			loadAsset(_idx);
		}
	
		function allComplete()
		{
			ZML.Preloader.complete();
			ZML.BroadcastCenter.dispatchEvent(new ZML.Event(ZML.CoreEvent.ASSETS_READY));
		}
	}
	
	return AssetsManager;
})();