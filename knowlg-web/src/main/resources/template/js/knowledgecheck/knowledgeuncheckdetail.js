
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'jquery', 'winui'], function (exports) {
	var $ = layui.$;
	
	var beanTemplate = $('#beanTemplate').html();
    
    AjaxPostUtil.request({url:reqBasePath + "knowledgecontent014", params: {rowId:parent.rowId}, type:'json', callback:function(json){
		if(json.returnCode == 0){
			var str = getDataUseHandlebars(beanTemplate, json);
			$("#showForm").html(str);
			content = json.bean.content;
	 		$("#knowledgecontentshowBox").attr("src", "knowledgecontentshow.html");
		}else{
			winui.window.msg(j.returnMessage, {icon: 2,time: 2000});
		}
	}});
	
    exports('knowledgeuncheckdetail', {});
});
