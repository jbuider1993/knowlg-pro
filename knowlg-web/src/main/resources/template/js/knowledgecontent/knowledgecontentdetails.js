
var content = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	    var $ = layui.$;
	    
	    showGrid({
		 	id: "showForm",
		 	url: reqBasePath + "knowledgecontent006",
		 	params: {rowId:parent.rowId},
		 	pagination: false,
		 	template: getFileContent('tpl/knowledgecontent/knowledgecontentdetailsTemplate.tpl'),
		 	ajaxSendAfter:function(json){
		 		content = json.bean.content;
		 		$("#knowledgecontentshowBox").attr("src", "knowledgecontentshow.html");
		 	}
		});
	});
});