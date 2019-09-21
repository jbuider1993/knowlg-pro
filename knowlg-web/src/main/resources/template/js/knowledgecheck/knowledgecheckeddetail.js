
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'jquery', 'winui'], function (exports) {
    var $ = layui.$;
    
    var beanTemplate = $('#beanTemplate').html();
    
    AjaxPostUtil.request({url:reqBasePath + "knowledgecontent015", params: {rowId:parent.rowId}, type:'json', callback:function(json){
		if(json.returnCode == 0){
			var str = getDataUseHandlebars(beanTemplate, json);
			$("#showForm").html(str);
			if(json.bean.state == '审核通过'){
				$(".twoState").removeClass("layui-hide");
			}else {
				$(".threeState").removeClass("layui-hide");
			}
			content = json.bean.content;
	 		$("#knowledgecontentshowBox").attr("src", "knowledgecontentshow.html");
		}else{
			winui.window.msg(j.returnMessage, {icon: 2,time: 2000});
		}
	}});
    
    exports('knowledgecheckeddetail', {});
});