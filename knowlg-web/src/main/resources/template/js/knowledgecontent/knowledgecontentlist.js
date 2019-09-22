var firstType = "";
var rowId = "";
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'table', 'jquery', 'winui', 'form'], function (exports) {
	
	winui.renderColor();
	
	var $ = layui.$,
		form = layui.form,
		table = layui.table;
	
	authBtn('1568476869775');
	
	var typeId = "";//一级类型
	var secondTypeId = "";//二级类型
	
	//表格渲染
	table.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    url: reqBasePath + 'knowledgecontent001',
	    cellMinWidth: 100,
	    where: {title:$("#title").val(),state:$("#state").val(),firstType:firstType, secondTypeId:secondTypeId},
	    even: true,  //隔行变色
	    page: true,
	    limits: [8, 16, 24, 32, 40, 48, 56],
	    limit: 8,
	    cols: [[
	        { title: '序号', type: 'numbers'},
	        { field: 'title', title: '标题', align: 'center', width: 320 },
	        { field: 'state', title: '当前状态', width: 150, align: 'center', templet: function(d){
	        	if(d.state == '3'){
	        		return "<span class='state-down'>审核不通过</span>";
	        	}else if(d.state == '2'){
	        		return "<span class='state-up'>审核通过</span>";
	        	}else if(d.state == '1'){
	        		return "<span class='state-new'>审核中</span>";
	        	}
	        }},
	        { field: 'typeName', title: '一级分类', align: 'center', width: 170 },
	        { field: 'secondTypeName', title: '二级分类', align: 'center', width: 170 },
	        { field: 'createTime', title: '创建时间', align: 'center', width: 160 },
	        { title: '操作', fixed: 'right', align: 'center', width: 270, toolbar: '#tableBar'}
	    ]],
	    done: function(){
	    	if(!loadFirstType){
	    		initFirstType();
	    	}
	    }
	});
	
	table.on('tool(messageTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'edit') { //编辑
        	edit(data);
        }else if (layEvent === 'delet') { //删除
        	delet(data);
        }else if (layEvent === 'details') { //详情
        	details(data);
        }
    });
	
	var loadFirstType = false;
	//初始化一级类型
	function initFirstType(){
		loadFirstType = true;
		showGrid({
		 	id: "firstType",
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
	
	//初始化二级类型
	function initsecondType(){
		showGrid({
		 	id: "secondTypeId",
		 	url: reqBasePath + "knowledgetype013",
		 	params: {parentId: firstType},
		 	pagination: false,
		 	template: getFileContent('tpl/template/select-option.tpl'),
		 	ajaxSendLoadBefore: function(hdb){},
		 	ajaxSendAfter:function(json){
		 		form.render('select');
		 	}
	    });
	}
	
	//一级类型监听事件
	form.on('select(firstType)', function(data){
		firstType = data.value;
		secondTypeId = "";
		initsecondType();
	});
	
	//二级类型监听事件
	form.on('select(secondTypeId)', function(data){
		secondTypeId = data.value;
	});
	
	form.render();
	
	//搜索表单
	$("body").on("click", "#formSearch", function(){
		refreshTable();
	});
	
	//添加
	$("body").on("click", "#addBean", function(){
    	_openNewWindows({
			url: "../../tpl/knowledgecontent/knowledgecontentadd.html", 
			title: "新增知识库",
			pageId: "knowledgecontentadd",
			area: ['90vw', '90vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg("操作成功", {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
			}});
    });
	
	//批量上传
	$("body").on("click", "#addAllBean", function(){
    	_openNewWindows({
			url: "../../tpl/knowledgecontent/filefolderupload.html", 
			title: "批量上传知识库",
			pageId: "filefolderupload",
			area: ['400px', '350px'],
			callBack: function(refreshCode){
				loadTable();
			}});
    });
	
	//删除
	function delet(data){
		var msg = '确认删除选中数据吗？';
		layer.confirm(msg, { icon: 3, title: '删除知识库类型' }, function (index) {
			layer.close(index);
            //向服务端发送删除指令
            AjaxPostUtil.request({url:reqBasePath + "knowledgecontent005", params:{rowId: data.id}, type:'json', callback:function(json){
    			if(json.returnCode == 0){
    				winui.window.msg("删除成功", {icon: 1,time: 2000});
    				loadTable();
    			}else{
    				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
    			}
    		}});
		});
	}
	
	//编辑
	function edit(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/knowledgecontent/knowledgecontentedit.html", 
			title: "编辑知识库",
			pageId: "knowledgecontentedit",
			area: ['90vw', '90vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg("操作成功", {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
			}
		});
	}
	
	//详情
	function details(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/knowledgecontent/knowledgecontentdetails.html", 
			title: "知识库详情",
			pageId: "knowledgecontentdetails",
			area: ['90vw', '90vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg("操作成功", {icon: 1,time: 2000});
                } else if (refreshCode == '-9999') {
                	winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
			}});
	}

	//刷新数据
    $("body").on("click", "#reloadTable", function(){
    	loadTable();
    });
    
    function loadTable(){
    	table.reload("messageTable", {where:{title:$("#title").val(),state:$("#state").val(),firstType:firstType, secondTypeId:secondTypeId}});
    }
    
    function refreshTable(){
    	table.reload("messageTable", {page: {curr: 1}, where:{title:$("#title").val(),state:$("#state").val(),firstType:firstType, secondTypeId:secondTypeId}});
    }
    exports('knowledgetypelist', {});
});
