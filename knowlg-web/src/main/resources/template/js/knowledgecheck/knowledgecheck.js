
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
	    
	    var beanTemplate = $('#beanTemplate').html();
	    
	    AjaxPostUtil.request({url:reqBasePath + "knowledgecontent011", params: {rowId:parent.rowId}, type:'json', callback:function(json){
			if(json.returnCode == 0){
				var str = getDataUseHandlebars(beanTemplate, json);
				$("#checkDetails").html(str);
				content = json.bean.content;
		 		$("#knowledgecontentshowBox").attr("src", "knowledgecontentshow.html");
			}else{
				winui.window.msg(j.returnMessage, {icon: 2,time: 2000});
			}
		}});
		 		
 		//单选框变化事件
 		form.on('radio(examineState)', function (data) {
 			var val = data.value;
 			if(val == '2'){//审核通过
 				$("#reasonHide").addClass("layui-hide");
 				$("#examineNopassReason").val("");
 			}else if(val == '3'){//审核不通过
 				$("#reasonHide").removeClass("layui-hide");
 			}else{
 				winui.window.msg('状态值错误', {icon: 2,time: 2000});
 			}
 		});
 		
 		form.render();
 		form.on('submit(formAddBean)', function (data) {
 			//表单验证
 			if (winui.verifyForm(data.elem)) {
 				var params = {
 						rowId: parent.rowId,
 						examineState: data.field.examineState,
 						examineNopassReason: $("#examineNopassReason").val()
 				};
 				console.log(params.examineState);
 				console.log(params.examineNopassReason);
 				console.log($("#examineNopassReason").val());
 				if(params.examineState == '3'){
 					if(isNull(params.examineNopassReason)){
 						winui.window.msg("请填写审核不通过原因", {icon: 2,time: 2000});
 						return false;
 					}
 				}
 				AjaxPostUtil.request({url:reqBasePath + "knowledgecontent012", params:params, type:'json', callback:function(json){
 					if(json.returnCode == 0){
 						parent.layer.close(index);
 						parent.refreshCode = '0';
 					}else{
 						winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
 					}
 				}});
 			}
 			return false;
 		});
		 	
 	    
	    $("body").on("click", "#cancle", function(){
	    	parent.layer.close(index);
	    });
	});
});