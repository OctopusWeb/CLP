ZML.Application = (function(){
	
	Application.prototype = new ZML.BasicCanvas();

	Application._instance = null;
	
	function Application ()
	{
		this.view = this.view.clone();
	}
	
	Application.instance = function()
	{
		if(Application._instance == null)Application._instance = new Application();
		return Application._instance;
	}
	
	Application.init = function(info)
	{
		var app = Application.instance();
		app.container = new ZML.RootContainer(info);
		
		ZML.BroadcastCenter.addEventListener(ZML.CoreEvent.APP_DATA_READY,function(){
			app.view.one(ZML.BasicCanvas.CONSTRUCT_COMPLETE,function(){
				ZML.AssetsManager.assetsLoadStart();
			});
			app.construct($(ZML.AssetsManager.appData).last());
		});
		ZML.BroadcastCenter.addEventListener(ZML.CoreEvent.ASSETS_READY,function(){
			app.view.appendTo(app.container.contentLayer);
			ZML.BroadcastCenter.sendEvent(app.data.children("Add").prop("outerHTML"));
		});
	}
	
	return Application;
})();