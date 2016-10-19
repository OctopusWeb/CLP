ZML.Slider = function(option)
{
	var self = this;
	this.view = option.view;
	this.value = option.value != undefined ? option.value : 0;
	this.min = option.min != undefined ? option.min : 0;
	this.max = option.max != undefined ? option.max : 1;
	
	this.bar = $("<div class='bar'>");
	this.bar.appendTo(this.view);
	
	this.overBar = $("<div class='overBar'>");
	this.overBar.appendTo(this.view);
	
	this.dragger = $("<div class='dragger'><div class='box'></div></div>");
	this.dragger.appendTo(this.overBar);
	
	this.bar.on("click touchend",function(e){
		var eventX = (function(type){
			switch(type)
			{
				case "click":
					return e.clientX - self.bar.offset().left;
				break;
				case "touchend":
					return e.originalEvent.changedTouches[0].clientX - self.bar.offset().left;
				break;
			}
		})(e.type);
		var value = self.getValueByDraggerLeft(eventX);
		self.setValue(value);
		
		self.view.trigger(ZML.Slider.CHANGE);
	})
	
	this.dragger.on("mousedown touchstart",function(e){
		e.preventDefault();
		var mouseFirst = (function(type){
			switch(type)
			{
				case "mousedown":
					return e.pageX;
				break;
				case "touchstart":
					return e.originalEvent.changedTouches[0].screenX;
				break;
			}
		})(e.type);
		var draggerLeft = parseInt(self.dragger.css("left"));
		
		var moved = false;
		
		$(document).on("mousemove touchmove",moveHandler);
		$(document).on("mouseup touchend",upHandler);
		
		function moveHandler(ev)
		{
			ev.preventDefault();
			moved = true;
			var mouseSecont = (function(type){
				switch(type)
				{
					case "mousemove":
						return ev.pageX;
					break;
					case "touchmove":
						return ev.originalEvent.changedTouches[0].screenX;
					break;
				}
			})(ev.type);
			var eventX = draggerLeft+mouseSecont-mouseFirst;
			
			var value = self.getValueByDraggerLeft(eventX);
			self.setValue(value);
			
			self.view.trigger(ZUI.Slider.UPDATE);
		}
		
		function upHandler()
		{
			$(document).off("mousemove touchmove",moveHandler);
			$(document).off("mouseup touchend",upHandler);
			
			if(moved)self.view.trigger(ZUI.Slider.CHANGE);
		}
	});
	
	this.getValueByDraggerLeft = function(tx)
	{
		var minX = 0;
		var maxX = this.bar.outerWidth();
			
		tx = tx < minX ? minX : tx;
		tx = tx > maxX ? maxX : tx;
			
		var per = tx / self.bar.outerWidth();
		var value = self.min + (self.max - self.min)*per;
		value = value.toFixed(2);
		return value;
	}
	
	this.getValue = function()
	{
		return this.value;
	}
	
	this.setValue = function(value)
	{
		var per = (value - this.min)/(this.max - this.min);
		var tx = per*100 + "%";
		this.dragger.css("left",tx);
		this.value = value;
	}
	
	this.setValue(this.value);
}

ZML.Slider.UPDATE = "ZUI_Slider_Update";
ZML.Slider.CHANGE = "ZUI_Slider_Change";