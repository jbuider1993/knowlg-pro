
var content = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'jquery', 'winui', 'form'], function (exports) {
	
	winui.renderColor();
	
	var $ = layui.$,
		form = layui.form;
	var rowId = parent.rowId;
	console.log(rowId);
	
	AjaxPostUtil.request({url:reqBasePath + "knowledgecontent006", params:{rowId: rowId}, type:'json', callback:function(json){
			if(json.returnCode == 0){
				$("#title").html(json.bean.title);
				content = json.bean.content;
		 		$("#knowledgecontentshowBox").attr("src", "contentshow.html");
			}else{
				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
			}
		}});
	
    exports('phonepagedetails', {});
});
