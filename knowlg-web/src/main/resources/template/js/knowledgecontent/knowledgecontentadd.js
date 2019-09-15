
var typeId = "";
var secondTypeId = "";
var layedit;

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'jquery', 'winui', 'tableSelect'], function (exports) {
	winui.renderColor();
	layui.use(['form', 'layedit'], function (form) {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	    var $ = layui.$,
	    form = layui.form,
	    tableSelect = layui.tableSelect;
	    layedit = layui.layedit;

	    initNoticeTypeId();
	    
	    //初始化一级公告类型
		function initNoticeTypeId(){
			showGrid({
			 	id: "typeId",
			 	url: reqBasePath + "knowledgetype011",
			 	params: {},
			 	pagination: false,
			 	template: getFileContent('tpl/template/select-option.tpl'),
			 	ajaxSendLoadBefore: function(hdb){},
			 	ajaxSendAfter:function(json){
			 		form.render('select');
			 	}
		    });
		}
		//初始化二级公告类型
		function initSecondTypeId(){
			showGrid({
			 	id: "secondTypeId",
			 	url: reqBasePath + "knowledgetype013",
			 	params: {parentId: typeId},
			 	pagination: false,
			 	template: getFileContent('tpl/template/select-option.tpl'),
			 	ajaxSendLoadBefore: function(hdb){},
			 	ajaxSendAfter:function(json){
			 		form.render('select');
			 	}
		    });
		}
		
		//一级公告类型监听事件
		form.on('select(typeId)', function(data){
			typeId = data.value;
			secondTypeId = "";
			initSecondTypeId();
		});
		//二级公告类型监听事件
		form.on('select(secondTypeId)', function(data){
			secondTypeId = data.value;
		});
 		
	    //公告内容富文本框
	    var content = layedit.build('content', {
	    	tool: [
    	       'strong' //加粗
    	       ,'italic' //斜体
    	       ,'underline' //下划线
    	       ,'del' //删除线
    	       ,'|' //分割线
    	       ,'left' //左对齐
    	       ,'center' //居中对齐
    	       ,'right' //右对齐
    	       ,'link' //超链接
    	       ,'unlink' //清除链接
    	       ,'face' //表情
    	       ,'code'
    	     ]
	    });
	    
 		form.render();
 	    form.on('submit(formAddBean)', function (data) {
 	    	//表单验证
 	        if (winui.verifyForm(data.elem)) {
 	        	var params = {
 	        		title: $("#title").val(),
 	        		typeId: typeId,
 	        		secondTypeId: secondTypeId,
 	        		desc: $("#desc").val(),
 	        		content: encodeURIComponent(layedit.getContent(content))
 	        	};
 	        	if(isNull(params.typeId)){
 	        		winui.window.msg('请选择一级公告类型', {icon: 2,time: 2000});
 	        		return false;
 	        	}
 	        	if(isNull(params.secondTypeId)){
 	        		winui.window.msg('请选择二级公告类型', {icon: 2,time: 2000});
 	        		return false;
 	        	}
 	        	if(isNull($("#desc").val())){
    				winui.window.msg('请填写知识库简介', {icon: 2,time: 2000});
    				return false;
    			}
    			if(isNull(layedit.getContent(content))){
    				winui.window.msg('请填写知识库内容', {icon: 2,time: 2000});
    				return false;
    			}
    			AjaxPostUtil.request({url:reqBasePath + "knowledgecontent002", params:params, type:'json', callback:function(json){
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