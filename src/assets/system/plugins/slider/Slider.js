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
	
	this.bar.click(function(e){
		var eventX = e.clientX - $(this).offset().left;
		var value = self.getValueByDraggerLeft(eventX);
		self.setValue(value);
		
		self.view.trigger(ZML.Slider.CHANGE);
	})
	
	this.dragger.mousedown(function(e){
		var mouseFirst = e.pageX;
		var draggerLeft = parseInt(self.dragger.css("left"));
		
		var moved = false;
		
		$(document).on("mousemove",moveHandler);
		$(document).on("mouseup",upHandler);
		
		function moveHandler(ev)
		{
			ev.preventDefault();
			moved = true;
			var mouseSecont = ev.pageX;
			var eventX = draggerLeft+mouseSecont-mouseFirst;
			
			var minX = 0;
			var maxX = self.bar.outerWidth();
			
			eventX = eventX < minX ? minX : eventX;
			eventX = eventX > maxX ? maxX : eventX;
			
			var value = self.getValueByDraggerLeft(eventX);
			self.setValue(value);
			
			self.view.trigger(ZML.Slider.UPDATE);
		}
		
		function upHandler()
		{
			$(document).off("mousemove",moveHandler);
			$(document).off("mouseup",upHandler);
			
			if(moved)self.view.trigger(ZML.Slider.CHANGE);
		}
	});
	
	this.getValueByDraggerLeft = function(tx)
	{
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