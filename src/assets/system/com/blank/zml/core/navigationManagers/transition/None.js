ZML.Transition = {};

ZML.Transition.None = function(manager,fromElem,toElem,onComplete)
{
	$(fromElem).css("visibility","hidden");
	$(toElem).css("visibility","visible");
	onComplete();
}

ZML.Transition.None.prototype.dispose = function()
{
	//do nothing...
}