ZML.UserSelectControl = {
	init:function()
	{
		$(document.body).css("-moz-user-select","none");/*火狐*/
		$(document.body).css("-webkit-user-select","none");/*webkit浏览器*/
		$(document.body).css("-ms-user-select","none");/*IE10*/
		$(document.body).css("-khtml-user-select","none");/*早期浏览器*/
		$(document.body).css("user-select","none");
	}
}