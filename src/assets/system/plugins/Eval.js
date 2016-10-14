ZML.Eval = (function(){
	
	function Eval(){}

	Eval.prototype = new ZML.Event("EvalEvent");
	
	Eval.prototype.construct = function(_data)
	{
		this.data = _data;
	}
	
	Eval.init = function()
	{
		ZML.BroadcastCenter.addEventListener(Eval.prototype.type,function(event,data){
			var str = $(data).text();
			eval(str);
		});
	}
	
	ZML.FactoryMap["EVAL"] = Eval;
	Eval.init();
	
	return Eval;
	
})();

