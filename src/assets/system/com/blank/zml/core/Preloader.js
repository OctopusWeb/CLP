ZML.Preloader = (function(){
	
	function Preloader(){}
	
	Preloader.loading = null;
	Preloader.progress = 0;
	
	Preloader.init = function()
	{
		Preloader.loading = new ZML.Loading();
	}
	
	Preloader.appendProgress = function(value)
	{
		Preloader.progress+=value;
		Preloader.loading.progress(Preloader.progress);
	}
	
	Preloader.complete = function()
	{
		Preloader.loading.view.remove();
	}
	
	return Preloader;
	
})();
