ZML.Alert = (function(){
	
	Alert.prototype = new ZML.Event("Alert");

	function Alert(){}
	
	Alert.prototype.construct = function(_data)
	{
		this.data = _data;
	}
	
	Alert.init = function()
	{
		ZML.BroadcastCenter.addEventListener(Alert.prototype.type,function(event,data){
			if($(data).attr("msg")!=undefined)
			{
				if($(data).attr("msg") == "home"){
					$("#subPage1").css({opacity:0})
					remove = true;
					subBack()
					$(".nextBtn1").off("click");
					$(".preBtn1").off("click");
					BackManager.clear();
				}else{
					alert($(data).attr("msg"));
				}
				
			}
			else if($(data).attr("prop")!=undefined)
			{
				alert($("#"+$(data).attr("id")).prop($(data).attr("prop")));
			}
			else if($(data).attr("attr")!=undefined)
			{
				var str = $("#"+$(data).attr("id")).attr($(data).attr("attr"));
				str = (str==undefined)?$("#"+$(data).attr("id")).css($(data).attr("attr")):str;
				alert(str);
			}
			else if($(data).attr("json")!=undefined)
			{
				var closeBtn = $(".closeBtn");
				var data = $(data).attr("json");
				var datatype = data.substring(0,1);
				var parentPage = data.substring(2,data.length);
				parentPage = parentPage.substring(0,parentPage.indexOf("-"));
				closeBtn.attr('id',parentPage);
				closeBtn.off("click");
				closeBtn.on("click",function(){
					var str = "<events><Events src=\"playClickSound\" /></events>";				
					ZML.BroadcastCenter.sendEvent(str);
					
					var page = $(this).attr("id");
					parseInt(page)>=9?page=0:page=page
					backEvent(page);
				});
				var url = "assets/data/"+data.substring(2,data.length)+".json";
				$.getJSON(url,function(json){
					if(datatype == "A"){
						subPage1(json);
					}else if(datatype == "B"){
						subPage2(json)
					}else if(datatype == "C"){
						subPage3(json)
					}else{
						subPage4(json)
					}
				})
				
			}
		});
	}
	
	
	function subPage1(json){
		$("#subPage1 #title2").html(json[0].title);
		var img = json[0].img;
		var content =  json[0].content;
		var contentImg =  json[0].contentImg
		var indexImg="";
		var indexContent="";
		var indexcontentImg = "";
		for(var i=0;i<img.length;i++){
			indexImg+="<li class='"+img[i].pageData+"'><h1>"+img[i].imgH+"</h1><img src="+img[i].imgURL+"></img></li>"
		}
		
		$("#subPage1 #subBanner ul").width(img.length*430);
		if(img.length <=4){
			$("#subPage1 #subBanner ul").css("marginLeft",(1700- img.length*430)/2);
		}else{
			$("#subPage1 #subBanner ul").css("marginLeft",0);
		}
		
		$("#subPage1 .bannerBox_1 ul").html(indexImg)
		for(var i=0;i<content.length;i++){
			indexContent+="<h1>"+content[i].contentH+"</h1>";
			indexContent+="<p>"+content[i].contentP+"</p>";
		}
		$("#subPage1 #subContentLeft").html(indexContent);
		
		if(contentImg.length == 0){
			$("#subContentLeft").css('width','100%');
		}else{
			$("#subContentLeft").css('width','50%');
			for(var i=0;i<contentImg.length;i++){
			indexcontentImg+="<h1>"+contentImg[i].imgH+"</h1>";
			indexcontentImg+="<img src="+contentImg[i].imgURL+"></img>"
			
		}
		$("#subPage1 #subContentRight").html(indexcontentImg);
		}
		
		$(".bannerBox_1 ul li").click(function(){
			var data = $(this).attr("class");
			var page = $(this).attr("class").substring(0,1);
			page == "B"?page = 10:page=11;
			bindEvent(page,data);
		})
		TweenLite.to($("#subPage1"), 1, {opacity:1});
		
	}
	function subBack(){
		$("#subPage1 #title2").html("");
		$("#subPage1 .bannerBox_1 ul").html("");
		$("#subPage1 .bannerBox_1 ul").width(0);
		$("#subPage1 #subContentLeft").html("");
		$("#subPage1 #subContentRight").html("");
	}

	function subPage2(json){
		var page =json[0].page;
		$("title1,#explain,#cont,#fea, #form").html("");
		$("#title1").html(json[0].title);
		$("#explain").html(json[0].explain);
		$("#cont").html(json[0].cont);
	
		var features = json[0].features;
		if(features != ""){
			$("#fea").html(json[0].features);
			$("#fea").show();
		}else{
		
			$("#fea").hide();
		}
		
		var form = json[0].form;		
		if(form != ""){
			$("#form").html(json[0].form);
			$("#form").show();
		}else{		
			$("#form").hide();
		}
	
		$("#bind,#click").click(function(){
			var data = $(this).attr("class");
			var page = $(this).attr("class").substring(0,1);
			page == "B"?page = 10:page=11;
			bindEvent(page,data);
		})
	
	
		$(".closeBtn").on("click",function(){
			$("title1,#explain,#cont,#fea, #form").html("");
		})
				
	}
	
	function subPage3(json){
		$("#title3").html(json[0].title);
		remove = false;
		var sum = json[0].sum;
		var url = json[0].url;
		var count = json[0].count;
		if(count == 0){
			$(".preBtnCar").hide();
			$(".nextBtnCar").hide();
		}else{
			$(".preBtnCar").show();
			$(".nextBtnCar").show();
		}
		addImg(sum,url,count);
	}
	
	function subPage4(json){
		$(".cont").animate({"margin-left":0})
		
		var index =0;
		var page =json[0].page;
		$(".cont").html("");
	
		var main = json[0].main;
		var mainHtml = '<div class="main_1"><div id="explain4" class="public"></div><div id="fea4"  class="public"></div><div id="form4" class="public" ></div></div>'
		for(var i = 0;i < main.length;i++){
			var $html = $(mainHtml);
			$html.find("#explain4").html(main[i].explain);
			$html.find("#fea4").html(main[i].features);
			$html.find("#form4").html(main[i].form);
			$html.attr("index",i);
			$html.addClass("index_"+i);
			$(".cont").append($html);
			if(i == 0){
				$html.addClass("active");
			}
		}
		

		$(".preBtn1").on("click",function(){
			index--;
			index==-1 ? index = 2:index = index;
			$(".cont").animate({"margin-left":-2000*index})
		})
		$(".nextBtn1").on("click",function(){
			index++;
			index==3 ? index = 0:index = index;
			$(".cont").animate({"margin-left":-2000*index})
		})
	}
	
	function bindEvent(page,data){
		var event = "<events><NavigationEvent controllerId='mainNav' showIdx='"+page+"' effect='flyOut' needback='true' json='"+data+"'><onComplete><Alert json='"+data+"'/></onComplete></NavigationEvent></events>"
		ZML.BroadcastCenter.sendEvent(event);
	}
	function backEvent(page){
		$("#subPage1").css({opacity:0})
		remove = true;
		subBack()
		$(".nextBtn1").off("click");
		$(".preBtn1").off("click");
		BackManager.back();
		//var eventBack = "<events><NavigationEvent controllerId='mainNav' showIdx='"+page+"' effect='flyIn'><onComplete><VideoEvent id='myvideo_0"+page+"' action='play' /></onComplete></events>"
		//ZML.BroadcastCenter.sendEvent(eventBack);
	}

	ZML.FactoryMap["ALERT"] = Alert;
	Alert.init();
	/**
	 * 返回管理
	 */
	var BackManager = (function(){
		
		var backManager = {};
		var items = [];
		
		ZML.BroadcastCenter.addEventListener(ZML.NavigationEvent.prototype.type,function(e,data){
			var needback = $(data).attr("needback") || false;
			if(needback)backManager.add({
				showIdx : $(data).attr("showIdx"),
				json :$(data).attr("json") 
			});
		});
		
		backManager.add = function(item)
		{
			items.push(item);
		}
		
		backManager.back = function()
		{
			var item = items[items.length-1];
			var eventBack = (function(){
				var backIdx = items.length == 1 ? 0 : items[items.length-2].showIdx;
				if(items.length > 1 && items[items.length-2].json != undefined)
				{
					return "<events><NavigationEvent controllerId='mainNav' showIdx='"+backIdx+"' effect='flyIn'><onComplete><Alert json='"+items[items.length-2].json+"'/><onComplete></events>"
				}
				else
				{
					return "<events><NavigationEvent controllerId='mainNav' showIdx='"+backIdx+"' effect='flyIn'><onComplete><VideoEvent id='myvideo_0"+backIdx+"' action='play' /></onComplete></events>"
				}
			})();
			ZML.BroadcastCenter.sendEvent(eventBack);
			items.pop();
		}
		backManager.clear = function()
		{
			items = [];
		}
		
		return backManager;
		
	})();
	
	return Alert;
	
})();