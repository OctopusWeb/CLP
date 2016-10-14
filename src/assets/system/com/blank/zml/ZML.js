var ZML = {};

ZML.init = function(info)
{
	$(document).ready(function(){
		ZML.UserSelectControl.init();
		ZML.Preloader.init();
		ZML.Application.init(info);
		ZML.AssetsManager.init();
	});
}

function trace(str)
{
	console.log(str);
}