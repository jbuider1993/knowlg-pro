layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form', 'layedit'], function (form) {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	    var $ = layui.$,
		    form = layui.form,
		    layedit = layui.layedit;
	    
	    var layContent = layedit.build('content', {
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
    	     ]
	    });
	    
	    form.render();

	    showGrid({
    	 	id: "OverAllCompany",
    	 	url: reqBasePath + "companymation006",
    	 	params: {},
    	 	pagination: false,
    	 	template: getFileContent('tpl/template/select-option.tpl'),
    	 	ajaxSendLoadBefore: function(hdb){
    	 	},
    	 	ajaxSendAfter:function(json){
    	 		form.render('select');
    	 	}
        });
	    
	    //默认隐藏子公司
	    $("#parentIdBox").addClass("layui-hide");
	    
	    //加载行政区划-省
	    loadChildProvinceArea();
	    
	    form.on('radio(companyType)', function (data) {
 			var val = data.value;
	    	if(val == '1'){//总公司
	    		$("#parentIdBox").addClass("layui-hide");
	    	}else if(val == '2'){//子公司
	    		$("#parentIdBox").removeClass("layui-hide");
	    	}else{
	    		winui.window.msg('状态值错误', {icon: 2,time: 2000});
	    	}
        });
		
	    form.on('submit(formAddBean)', function (data) {
	    	//表单验证
	        if (winui.verifyForm(data.elem)) {
	        	var pId = '0';
	        	if($("input[name='companyType']:checked").val() == '2'){
	        		if(isNull($("#OverAllCompany").val())){
	        			winui.window.msg('请选择总公司', {icon: 2,time: 2000});
	        			return false;
	        		}else{
	        			pId = $("#OverAllCompany").val();
	        		}
	        	}
	        	var provinceId = "", cityId = "", areaId = "", townshipId = "";
	        	if(!isNull($("#provinceId").val())){
	        		provinceId = $("#provinceId").val();
	        	}
	        	if(!isNull($("#cityId").val())){
	        		cityId = $("#cityId").val();
	        	}
	        	if(!isNull($("#areaId").val())){
	        		areaId = $("#areaId").val();
	        	}
	        	if(!isNull($("#townshipId").val())){
	        		townshipId = $("#townshipId").val();
	        	}
	        	var params = {
        			companyName: $("#companyName").val(),
        			companyDesc: encodeURI(layedit.getContent(layContent)),
        			pId: pId,
        			provinceId: provinceId,
        			cityId: cityId,
        			areaId: areaId,
        			townshipId: townshipId,
        			addressDetailed: $("#addressDetailed").val(),
	        	};
	        	
	        	AjaxPostUtil.request({url:reqBasePath + "companymation002", params:params, type:'json', callback:function(json){
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
	    
	    form.on('select(areaProvince)', function(data){
	    	layui.$(data.elem).parent('dd').nextAll().remove();
	    	if(isNull(data.value) || data.value == '请选择'){
	    	}else{
	    		loadChildCityArea();
	    	}
 		});
	    form.on('select(areaCity)', function(data){
	    	layui.$(data.elem).parent('dd').nextAll().remove();
	    	if(isNull(data.value) || data.value == '请选择'){
	    	}else{
	    		loadChildArea();
	    	}
 		});
	    form.on('select(area)', function(data){
	    	layui.$(data.elem).parent('dd').nextAll().remove();
	    	if(isNull(data.value) || data.value == '请选择'){
	    	}else{
	    		loadChildAreaTownShip();
	    	}
 		});
	    
	    //省级行政区划
	    function loadChildProvinceArea(){
 	    	AjaxPostUtil.request({url:reqBasePath + "commontarea001", params:{}, type:'json', callback:function(json){
 	   			if(json.returnCode == 0){
 	   				var str = '<dd class="layui-col-xs3"><select id="provinceId" win-verify="required" lay-filter="areaProvince" lay-search=""><option value="">请选择</option>';
	 	   			for(var i = 0; i < json.rows.length; i++){
	 	   				str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
	 	   			}
	 	   			str += '</select></dd>';
	 	   			$("#lockParentSel").append(str);
	 	   			form.render('select');
 	   			}else{
 	   				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
 	   			}
 	   		}});
 	    }
	    
	    //市级行政区划
	    function loadChildCityArea(){
 	    	AjaxPostUtil.request({url:reqBasePath + "commontarea002", params:{rowId: $("#provinceId").val()}, type:'json', callback:function(json){
 	   			if(json.returnCode == 0){
 	   				var str = '<dd class="layui-col-xs3"><select id="cityId" lay-filter="areaCity" lay-search=""><option value="">请选择</option>';
	 	   			for(var i = 0; i < json.rows.length; i++){
	 	   				str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
	 	   			}
	 	   			str += '</select></dd>';
	 	   			$("#lockParentSel").append(str);
	 	   			form.render('select');
 	   			}else{
 	   				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
 	   			}
 	   		}});
 	    }
	    
	    //县级行政区划
	    function loadChildArea(){
 	    	AjaxPostUtil.request({url:reqBasePath + "commontarea003", params:{rowId: $("#cityId").val()}, type:'json', callback:function(json){
 	   			if(json.returnCode == 0){
 	   				var str = '<dd class="layui-col-xs3"><select id="areaId" lay-filter="area" lay-search=""><option value="">请选择</option>';
	 	   			for(var i = 0; i < json.rows.length; i++){
	 	   				str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
	 	   			}
	 	   			str += '</select></dd>';
	 	   			$("#lockParentSel").append(str);
	 	   			form.render('select');
 	   			}else{
 	   				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
 	   			}
 	   		}});
 	    }
	    
	    //镇级行政区划
	    function loadChildAreaTownShip(){
 	    	AjaxPostUtil.request({url:reqBasePath + "commontarea004", params:{rowId: $("#areaId").val()}, type:'json', callback:function(json){
 	   			if(json.returnCode == 0){
 	   				var str = '<dd class="layui-col-xs3"><select id="townshipId" lay-filter="areaTownShip" lay-search=""><option value="">请选择</option>';
	 	   			for(var i = 0; i < json.rows.length; i++){
	 	   				str += '<option value="' + json.rows[i].id + '">' + json.rows[i].name + '</option>';
	 	   			}
	 	   			str += '</select></dd>';
	 	   			$("#lockParentSel").append(str);
	 	   			form.render('select');
 	   			}else{
 	   				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
 	   			}
 	   		}});
 	    }
	    
	    //取消
	    $("body").on("click", "#cancle", function(){
	    	parent.layer.close(index);
	    });
	});
	    
});