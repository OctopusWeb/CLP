(function(){
	ZML.initApp = function()
	{
		var strBg = "<events><Events src=\"playBgSound\" /></events>";
		ZML.BroadcastCenter.sendEvent(strBg);

		$.each(ZML.find("ImageButton"),function(){				
			this.view.click(function(){
				var str = "<events><Events src=\"playClickSound\" /></events>";
				ZML.BroadcastCenter.sendEvent(str);
			});
		});
		
		
		$("#voice").click(function(){
			if($(this).hasClass("active")){
				$(this).removeClass("active");					
				$(".content_voice").show();
			}			
			else{
				$(this).addClass("active");					
				$(".content_voice").hide();
			}
		})
		

		var volume = "0.5";

		var strBg = "<events><VideoEvent id=\"myMp3_bg\" action=\"set\"  volume=\'"+volume+"\' /></events>";
		ZML.BroadcastCenter.sendEvent(strBg);
		var slider = new ZML.Slider({
				view : $(".zui.slider").eq(0)
			});
			
			slider.setValue(volume);
			
			slider.view.on(ZML.Slider.CHANGE,function(e){
			
			
			volume = slider.getValue();
			
			console.log(volume)
						
			var strBg = "<events><VideoEvent id=\"myMp3_bg\" action=\"set\"  volume=\'"+volume+"\' /></events>";
			ZML.BroadcastCenter.sendEvent(strBg);
			
		});
	}
})();
