
var typeId = "";
var secondTypeId = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'jquery', 'winui', 'tableSelect'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	    var $ = layui.$,
		    form = layui.form,
		    tableSelect = layui.tableSelect;

	    initNoticeTypeId();
	    
	    var ue = UE.getEditor('container',{
	    	//初始化高度
	    	initialFrameHeight: 700,
	    	maximumWords: 100000
	    });
	    UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
	    UE.Editor.prototype.getActionUrl = function(action){
	        if (action == 'uploadimage' || action == 'uploadfile' || action == 'uploadvideo' || action == 'uploadimage'){//上传单个图片,上传附件,上传视频,多图上传
	            return reqBasePath + '/upload/editUploadController/uploadContentPic?userToken=' + getCookie('userToken');
	        } else if(action == 'listimage'){
	        	return reqBasePath + '/upload/editUploadController/downloadContentPic?userToken=' + getCookie('userToken');
	        }else{
	            return this._bkGetActionUrl.call(this, action);
	        }
	    };
	    
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
 		
 		form.render();
 	    form.on('submit(formAddBean)', function (data) {
 	    	//表单验证
 	        if (winui.verifyForm(data.elem)) {
 	        	var params = {
 	        		title: $("#title").val(),
 	        		typeId: typeId,
 	        		secondTypeId: secondTypeId,
 	        		desc: $("#desc").val(),
 	        		content: encodeURIComponent(ue.getContent())
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
    				winui.window.msg('请填写简介', {icon: 2,time: 2000});
    				return false;
    			}
    			if(isNull(ue.getContent())){
    				winui.window.msg('请填写内容', {icon: 2,time: 2000});
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