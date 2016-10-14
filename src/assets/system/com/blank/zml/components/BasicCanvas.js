ZML.BasicCanvas = (function(){
	
	BasicCanvas.CONSTRUCT_COMPLETE = "basicCanvasCreationComplete";

	function BasicCanvas(sel)
	{
		if(sel == undefined)
		{
			this.view = $("<div />");
			this.view.css("position","absolute");
			this.data = null;
		}
		else
		{
			return BasicCanvas.select(sel);
		}
	}
	
	ZML.find = BasicCanvas;
	BasicCanvas.list = [];
	
	BasicCanvas.select = function(sel)
	{
		var result;
		if(sel.indexOf("#") == 0)
		{
			var _id = sel.slice(1,sel.length);
			result = BasicCanvas.selectCanvasById(_id);
		}
		else
		{
			result = BasicCanvas.selectCanvasByTag(sel);
		}
		return result;
	}
	
	BasicCanvas.selectCanvasById = function(_id)
	{
		var target;
		var i = BasicCanvas.list.length;
		while(i--)
		{
			var canvas = BasicCanvas.list[i];
			if(canvas.data.attr("id") == _id)
			{
				target = canvas;
				break;
			}
		}
		return target;
	}
	
	BasicCanvas.selectCanvasByTag = function(sel)
	{
		var result = [];
		var arr = sel.split(",");
		var i = BasicCanvas.list.length;
		while(i--)
		{
			var canvas = BasicCanvas.list[i];
			if(canvas.data.prop("nodeName").toUpperCase() == arr[0].toUpperCase())
			{
				result.push(canvas);
			}
		}
		if(arr.length>1)
		{
			result = filter(1,result);
		}
	
		function filter(_idx,_arr)
		{
			var filterResult = [];
			var att = arr[_idx].split(":");
			var i = _arr.length;
			while(i--)
			{
				var canvas = _arr[i];
				var canvasAtt = canvas.data.attr(att[0]);
				if(canvasAtt!=undefined && canvasAtt == att[1])
				{
					filterResult.push(canvas);
				}
			}
			if(filterResult.length>0 && (_idx+1)<arr.length)
			{
				filterResult = filter(_idx+1,filterResult);
			}
			return filterResult;
		}
		return result;
	}
	
	BasicCanvas.prototype.construct = function(_data)
	{
		BasicCanvas.list.push(this);
		this.data = _data;
		this.mappingCss(this.data);
		this.initEvents();
		this.createChildren();
	}
	
	BasicCanvas.prototype.initEvents = function()
	{
		var self = this;
		ZML.BroadcastCenter.addEventListener(ZML.CanvasEvent.prototype.type,function(event,data){
			if($(data).attr("id") == undefined || $(data).attr("id")!=self.data.attr("id"))return;
			var action = $(data).attr("action");
			if(action!=undefined && action == "set")
			{
				self.mappingCss($(data));
			}
		});
	}
	
	//映射CSS
	BasicCanvas.prototype.mappingCss = function(_data)
	{
		var atts = _data.prop("attributes");
		var len = atts.length;
		for(var i = 0;i<len;i++)
		{
			var nodeName = atts[i].nodeName;
			var nodeValue = atts[i].value;
	
			var isSpecial = this.handleSpecialNode(nodeName,nodeValue);
			if(!isSpecial)
			{
				this.view.css(nodeName,nodeValue);
			}
		}
	}
	
	BasicCanvas.prototype.handleSpecialNode = function(nodeName,nodeValue)
	{
		var isSpecial = false;
		switch(nodeName.toLowerCase())
		{
			case "id":
				this.view.attr(nodeName,nodeValue);
				isSpecial = true;
				break;
			case "class":
				this.view.toggleClass(nodeValue);
				isSpecial = true;
				break;
			case "x":
				this.view.css("left",nodeValue+"px");
				isSpecial = true;
				break;
			case "y":
				this.view.css("top",nodeValue+"px");
				isSpecial = true;
				break;
			case "width":
				this.view.width(nodeValue);
				break;
			case "height":
				this.view.height(nodeValue);
				break;
			case "action":
				isSpecial = true;
				break;
			case "scalex":
				this.scaleX(nodeValue);
				isSpecial = true;
				break;
			case "scaley":
				this.scaleY(nodeValue);
				isSpecial = true;
				break;
			case "rotate":
				this.rotate(nodeValue);
				isSpecial = true;
				break;
			case "alpha":
				this.alpha(nodeValue);
				isSpecial = true;
				break;
			case "visible":
				this.visible(nodeValue);
				isSpecial = true;
				break;
		}
		return isSpecial;
	}
	
	BasicCanvas.prototype.createChildren = function()
	{
		var self = this;
		var len = this.data.children().length;
		if(len>0)
		{
			createIdx(0);
		}
		else
		{
			self.constructComplete();
		}
	
		function createIdx(_idx)
		{
			if(_idx == len)
			{
				self.constructComplete();
				return;
			}
			var nodeData = self.data.children()[_idx];
			var nodeName = nodeData.nodeName.toUpperCase();
			var Class = ZML.FactoryMap[nodeName];
			if(Class == undefined)
			{
				nextIdx(_idx);
			}
			else
			{
				var node = new Class();
				if(node.view!=undefined)
				{
					node.view.bind(BasicCanvas.CONSTRUCT_COMPLETE,function(){
						node.view.appendTo(self.view);
						nextIdx(_idx);
					});
				}
				node.construct($(nodeData));
				if(node.view == undefined)
				{
					nextIdx(_idx);
				}
			}
		}
	
		function nextIdx(_idx)
		{
			_idx++;
			createIdx(_idx);
		}
	}
	
	BasicCanvas.prototype.constructComplete = function()
	{
		ZML.BroadcastCenter.sendEvent(this.data.children("Ready").prop("outerHTML"));
		this.view.trigger(BasicCanvas.CONSTRUCT_COMPLETE);
	}
	
	BasicCanvas.prototype.buttonMode = function(bol)
	{
		this.view.css("cursor",(bol)?"pointer":"auto");
	}
	
	BasicCanvas.prototype.visible = function(value)
	{
		this.view[value=="true"?"show":"hide"]();
	}
	
	BasicCanvas.prototype.scaleX = function(value)
	{
		//override
	}
	
	BasicCanvas.prototype.scaleY = function(value)
	{
		//override
	}
	
	BasicCanvas.prototype.rotate = function(value)
	{
		//override
	}
	
	BasicCanvas.prototype.alpha = function(value)
	{
		//override
	}
	
	return BasicCanvas;
	
})();

