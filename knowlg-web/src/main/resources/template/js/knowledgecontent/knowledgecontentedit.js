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
	    tableSelect = layui.tableSelect;
	    
	    //初始化一级公告类型
		function initNoticeType(id){
			showGrid({
			 	id: "typeId",
			 	url: reqBasePath + "knowledgetype011",
			 	params: {},
			 	pagination: false,
			 	template: getFileContent('tpl/template/select-option.tpl'),
			 	ajaxSendLoadBefore: function(hdb){},
			 	ajaxSendAfter:function(json){
			 		$("#typeId").val(id);
			 		form.render('select');
			 	}
		    });
		}
		
		//初始化二级公告类型
		function initSecondNoticeType(id){
			showGrid({
			 	id: "secondTypeId",
			 	url: reqBasePath + "knowledgetype013",
			 	params: {parentId: typeId},
			 	pagination: false,
			 	template: getFileContent('tpl/template/select-option.tpl'),
			 	ajaxSendLoadBefore: function(hdb){},
			 	ajaxSendAfter:function(json){
			 		$("#secondTypeId").val(id);
			 		form.render('select');
			 	}
		    });
		}
		
	    showGrid({
		 	id: "showForm",
		 	url: reqBasePath + "knowledgecontent003",
		 	params: {rowId:parent.rowId},
		 	pagination: false,
		 	template: getFileContent('tpl/knowledgecontent/knowledgecontenteditTemplate.tpl'),
		 	ajaxSendAfter:function(json){
		 		typeId = json.bean.typeId;	//一级类型id
		 		secondTypeId = json.bean.secondTypeId;	//二级类型id
		 		initNoticeType(typeId);
		 		if(!isNull(secondTypeId))
		 			initSecondNoticeType(secondTypeId);
		 		
		 		//一级公告类型监听事件
				form.on('select(typeId)', function(data){
					typeId = data.value;
					secondTypeId = "";
					if(!isNull(typeId)){
						initSecondNoticeType(secondTypeId);
					}else{
						$("#secondTypeId").html('<option value="">全部</option>');
						form.render('select');
					}
				});
				
				//二级公告类型监听事件
				form.on('select(secondTypeId)', function(data){
					secondTypeId = data.value;
				});
				
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
			    ue.addListener("ready", function () {
			    	ue.setContent(json.bean.content);
			    });
		 		
		 		form.render();
		 	    form.on('submit(formEditBean)', function (data) {
		 	    	//表单验证
		 	        if (winui.verifyForm(data.elem)) {
		 	        	var params = {
		 	        		rowId: parent.rowId,
		 	        		title: encodeURIComponent($("#title").val()),
		 	        		typeId: typeId,
		 	        		secondTypeId: secondTypeId,
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
		    			if(isNull(ue.getContent())){
		    				winui.window.msg('请填写知识库内容', {icon: 2,time: 2000});
		    				return false;
		    			}else {
		    				if(ue.getContentTxt().length > 200)
		    					params.desc = encodeURI(ue.getContentTxt().substring(0,199));
		    				else
		    					params.desc = encodeURI(ue.getContentTxt());
		    			}
		    			AjaxPostUtil.request({url:reqBasePath + "knowledgecontent004", params:params, type:'json', callback:function(json){
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
		 	}
		});
	    
	    $("body").on("click", "#cancle", function(){
	    	parent.layer.close(index);
	    });
	});
});