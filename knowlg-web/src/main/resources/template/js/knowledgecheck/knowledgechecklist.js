var rowId = "";
var startTime = "", endTime = "";
var firstTime = "", lastTime = "";
var theFirstTime = "", theLastTime = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'table', 'jquery', 'winui', 'form', 'laydate'], function (exports) {
	
	winui.renderColor();
	
	var $ = layui.$,
		form = layui.form,
		table = layui.table,
		laydate = layui.laydate;
	
	var typeId = "";//未审核的一级类型搜索
	var checkedtypeId = "";//已审核的一级类型搜索
	
	//未审核表的提交时间
	laydate.render({
		elem: '#createTime', //指定元素
		range: '~'
	});
	
	//已审核表的提交时间
	laydate.render({
		elem: '#checkedCreateTime',
		range: '~'
	});
	
	//已审核表的审核时间
	laydate.render({
		elem: '#checkedExamineTime',
		range: '~'
	});
	
	authBtn('1568973352669');//未审核
	authBtn('1568973377977');//已审核
	
	var showNoCheckTable = false;
	var showCheckedTable = false;
	
	showLeft();
	//初始化左侧菜单
	function showLeft(){
		if(auth('1568973352669')){//未审核
			$("#setting").find("a[rowid='nochecklist']").addClass('selected');
			$("#noCheckForm").removeClass("layui-hide");
			showNoCheckList();
		}else if(auth('1568973377977')){//已审核
			$("#setting").find("a[rowid='checkedlist']").addClass('selected');
			$("#checkedForm").removeClass("layui-hide");
			showCheckedList();
		}
	}
	
	//对左侧菜单项的点击事件
	$("body").on("click", "#setting a", function(e){
		$(".setting a").removeClass("selected");
		$(this).addClass("selected");
		clickId = $(this).attr("rowid");
		if(clickId == "nochecklist"){
    		$("#checkedForm").addClass("layui-hide");
    		$("#noCheckForm").removeClass("layui-hide");
    		if(!showNoCheckTable){
    			showNoCheckList();
    		}
		}
		if(clickId == "checkedlist"){
			$("#noCheckForm").addClass("layui-hide");
    		$("#checkedForm").removeClass("layui-hide");
    		if(!showCheckedTable){
    			showCheckedList();
    		}
		}
	});
	
	//未审核的一级类型搜索
	showGrid({
	 	id: "typeId",
	 	url: reqBasePath + "knowledgetype011",
	 	params: {},
	 	pagination: false,
	 	template: getFileContent('tpl/template/select-option.tpl'),
	 	ajaxSendLoadBefore: function(hdb){
	 	},
	 	ajaxSendAfter:function(json){
	 		form.render('select');
	 	}
	});
	
	form.on('select(typeId)', function(data){
		typeId = data.value;
	});
	
	//未审核
	function showNoCheckList(){
		showNoCheckTable = true;
		//表格渲染
		table.render({
		    id: 'messageNoCheckTable',
		    elem: '#messageNoCheckTable',
		    method: 'post',
		    url: reqBasePath + 'knowledgecontent010',
		    where: {title:$("#title").val(),typeId: typeId, startTime:startTime, endTime:endTime},
		    even: true,  //隔行变色
		    page: true,
		    limits: [8, 16, 24, 32, 40, 48, 56],
		    limit: 8,
		    cols: [[
		        { title: '序号', type: 'numbers'},
		        { field: 'title', title: '标题', align: 'center', width: 250 },
		        { field: 'typeName', title: '一级类型', align: 'center', width: 120 },
		        { field: 'secondTypeName', title: '二级类型', align: 'center', width: 120 },
		        { field: 'createTime', title: '提交时间', align: 'center', width: 200},
		        { title: '操作', fixed: 'right', align: 'center', width: 250, toolbar: '#tableBar'}
		    ]],
		    done: function(){
		    }
		});
	};
	
	table.on('tool(messageNoCheckTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		var layEvent = obj.event; //获得 lay-event 对应的值
		if (layEvent === 'check') { //审核
			check(data);
		}else if (layEvent === 'detail') { //举报详情
			detail(data);
		}else if (layEvent === 'forumdetails') { //帖子详情
			forumdetails(data);
		}
	});
	
	form.render();
	
	//搜索未审核的表单
	$("body").on("click", "#formNoCheckSearch", function(){
		refreshTable();
	});
	
	$("body").on("click", "#reloadNoCheckTable", function(){
		loadTable();
	});
	
	function loadTable(){
		if(!isNull($("#createTime").val())){
			startTime = $("#createTime").val().split('~')[0].trim() + ' 00:00:00';
			endTime = $("#createTime").val().split('~')[1].trim() + ' 23:59:59';
		}else {
			startTime = "";
			endTime = "";
		}
		table.reload("messageNoCheckTable", {where:{title:$("#title").val(),typeId: typeId, startTime:startTime, endTime:endTime}});
	};
	
	function refreshTable(){
		if(!isNull($("#createTime").val())){
			startTime = $("#createTime").val().split('~')[0].trim() + ' 00:00:00';
			endTime = $("#createTime").val().split('~')[1].trim() + ' 23:59:59';
		}else {
			startTime = "";
			endTime = "";
		}
		table.reload("messageNoCheckTable", {page: {curr: 1}, where:{title:$("#title").val(),typeId: typeId, startTime:startTime, endTime:endTime}});
	};
	
	//审核
	function check(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/knowledgecheck/knowledgecheck.html", 
			title: "审核",
			pageId: "knowledgecheck",
			area: ['80vw', '95vh'],
			callBack: function(refreshCode){
				if (refreshCode == '0') {
					winui.window.msg("操作成功", {icon: 1,time: 2000});
					loadTable();
					loadCheckedTable();
				} else if (refreshCode == '-9999') {
					winui.window.msg("操作失败", {icon: 2,time: 2000});
				}
			}});
	};
	
	//未审核详情
	function detail(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/knowledgecheck/knowledgeuncheckdetail.html", 
			title: "详情",
			pageId: "knowledgeuncheckdetail",
			area: ['70vw', '80vh'],
			callBack: function(refreshCode){
				if (refreshCode == '0') {
					winui.window.msg("操作成功", {icon: 1,time: 2000});
				} else if (refreshCode == '-9999') {
					winui.window.msg("操作失败", {icon: 2,time: 2000});
				}
			}});
	};
	
	//已审核
	function showCheckedList(){
		showCheckedTable = true;
		//表格渲染
		table.render({
		    id: 'messageCheckedTable',
		    elem: '#messageCheckedTable',
		    method: 'post',
		    url: reqBasePath + 'knowledgecontent013',
		    where: {title:$("#checkedtitle").val(),typeId: checkedtypeId, startTime:firstTime, endTime:lastTime, examineStartTime:theFirstTime, examineEndTime:theLastTime},
		    even: true,  //隔行变色
		    page: true,
		    limits: [8, 16, 24, 32, 40, 48, 56],
		    limit: 8,
		    cols: [[
		        { title: '序号', type: 'numbers'},
		        { field: 'title', title: '标题', align: 'center', width: 250},
		        { field: 'typeName', title: '一级类型', align: 'center', width: 120 },
		        { field: 'secondTypeName', title: '二级类型', align: 'center', width: 120 },
		        { field: 'createTime', title: '提交时间', align: 'center', width: 200},
		        { field: 'state', title: '状态', width: 100, align: 'center', templet: function(d){
		        	if(d.state == '2'){
		        		return "<span class='state-up'>已通过</span>";
		        	}else if(d.state == '3'){
		        		return "<span class='state-down'>未通过</span>";
		        	}else{
		        		return "参数错误";
		        	}
		        }},
		        { field: 'examineUser', title: '审核人', align: 'center', width: 180},
		        { field: 'examineTime', title: '审核时间', align: 'center', width: 200},
		        { title: '操作', fixed: 'right', align: 'center', width: 250, toolbar: '#checkedTableBar'}
		    ]],
		    done: function(){
		    }
		});
	};
		
	table.on('tool(messageCheckedTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'checkeddetail') { //审核详情
        	checkeddetail(data);
        }
    });
	

	//已审核详情
	function checkeddetail(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/knowledgecheck/knowledgecheckeddetail.html", 
			title: "详情",
			pageId: "knowledgecheckeddetail",
			area: ['70vw', '85vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg("操作成功", {icon: 1,time: 2000});
                } else if (refreshCode == '-9999') {
                	winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
			}});
	};
	
	//一级类型搜索
	showGrid({
	 	id: "checkedtypeId",
	 	url: reqBasePath + "knowledgetype011",
	 	params: {},
	 	pagination: false,
	 	template: getFileContent('tpl/template/select-option.tpl'),
	 	ajaxSendLoadBefore: function(hdb){
	 	},
	 	ajaxSendAfter:function(json){
	 		form.render('select');
	 	}
	});

    form.on('select(checkedtypeId)', function(data){
		checkedtypeId = data.value;
	});
    
	//搜索表单
	$("body").on("click", "#formCheckedSearch", function(){
		refreshCheckedTable();
	});
	
	$("body").on("click", "#reloadCheckedTable", function(){
    	loadCheckedTable();
    });
    
    function loadCheckedTable(){
    	getTime();
    	table.reload("messageCheckedTable", {where:{title:$("#checkedtitle").val(),typeId: checkedtypeId, startTime:firstTime, endTime:lastTime, examineStartTime:theFirstTime, examineEndTime:theLastTime}});
    };
    
    function refreshCheckedTable(){
		getTime();
    	table.reload("messageCheckedTable", {page: {curr: 1}, where:{title:$("#checkedtitle").val(),typeId: checkedtypeId, startTime:firstTime, endTime:lastTime, examineStartTime:theFirstTime, examineEndTime:theLastTime}});
    };
    
    function getTime(){
    	if(!isNull($("#checkedCreateTime").val())){
			firstTime = $("#checkedCreateTime").val().split('~')[0].trim() + ' 00:00:00';
			lastTime = $("#checkedCreateTime").val().split('~')[1].trim() + ' 23:59:59';
    	}else {
    		firstTime = "";
    		lastTime = "";
		}
		if(!isNull($("#checkedExamineTime").val())){
			theFirstTime = $("#checkedExamineTime").val().split('~')[0].trim() + ' 00:00:00';
			theLastTime = $("#checkedExamineTime").val().split('~')[1].trim() + ' 23:59:59';
    	}else {
    		theFirstTime = "";
    		theLastTime = "";
		}
    }
	
    exports('knowledgechecklist', {});
});
