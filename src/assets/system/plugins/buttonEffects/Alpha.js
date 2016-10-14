ZML.ButtonEffectMap["alpha"] = function(_bt)
{
	if(_bt.data.attr("touchMode") == "true")
	{
		_bt.view.bind("mousedown",fadeOut);
		_bt.view.bind("mouseout",fadeIn);
		$(document).bind("mouseup",fadeIn);
	}
	else
	{
		_bt.view.bind("mouseover",fadeOut);
		_bt.view.bind("mouseout",fadeIn);
	}

	function fadeOut()
	{
		TweenLite.to(_bt.view,0.5,{alpha:0.5});
	}

	function fadeIn()
	{
		TweenLite.to(_bt.view,0.5,{alpha:1});
	}

	this.dispose = function()
	{
		if(_bt.data.attr("touchMode") == "true")
		{
			_bt.view.unbind("mousedown",fadeOut);
			_bt.view.unbind("mouseout",fadeIn);
			$(document).unbind("mouseup",fadeIn);
		}
		else
		{
			_bt.view.unbind("mouseover",fadeOut);
			_bt.view.unbind("mouseout",fadeIn);
		}
	}
}