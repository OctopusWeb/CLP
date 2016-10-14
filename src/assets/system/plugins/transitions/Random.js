ZML.Transition.Random = function(manager,fromElem,toElem,onComplete)
{
	var arr = [];
	for(var i in ZML.TransitionMap)
	{
		if(i!="none" && i!="random")
		{
			arr.push(ZML.TransitionMap[i]);
		}
	}
	var idx = Math.round(Math.random()*(arr.length-1));
	var Class = arr[idx];
	this.effect = new Class(manager,fromElem,toElem,onComplete);
}

ZML.Transition.Random.prototype.dispose = function()
{
	if(this.effect)
	{
		this.effect.dispose();
		this.effect = null;
	}
}

ZML.TransitionMap["random"] = ZML.Transition.Random;