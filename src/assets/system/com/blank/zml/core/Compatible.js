ZML.Compatible = (function(){
	
	//解决浏览器兼容问题
	var Compatible = function(){}
	
	//判断浏览器
	Compatible.list = ["Firefox","Chrome"];
	Compatible.browser = function()
	{
		var result = "unknown";
		var agent = navigator.userAgent;
		var len = Compatible.list.length;
		for(var i=0;i<len;i++)
		{
			if(agent.indexOf(Compatible.list[i])>-1)
			{
				result = Compatible.list[i];
				break;
			}
	
		}
		return result;
	}
	
	return Compatible;
	
})();

