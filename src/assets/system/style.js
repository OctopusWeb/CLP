var pieLabelColor="#9fa0a0";
var pieColor="#21426a";
var pieColor1="#21426a"
var pieColor2="#e7e8ea"
var pieColor3="#5c5f63"
var pieColor4="#89abd5"
var pieColor5="#356eb6"
var legendColor="#9fa0a0";

if(localStorage["indexStyle"] && localStorage["indexStyle"] == "styleBlack"){
	var titleColor="#303963";
	var splitLineStyle="rgba(0,0,0,0.1)";
	var axisLabelColor="#596182";
	var areaColor="#8388a1";
	loadCSS("styleBlack")
}else{
	var titleColor="#1888d0";
	var splitLineStyle="rgba(255,255,255,0.1)";
	var axisLabelColor="#08d0f1";
	var areaColor="#005494";
	loadCSS("styleWhite")
	
}
	
function loadCSS(selected){
	var css=document.createElement("link");
    css.href = "assets/system/css/"+selected+".css";
    css.rel = "stylesheet";
    css.type = "text/css";
    document.getElementsByTagName('head').item(0).appendChild(css);
}

