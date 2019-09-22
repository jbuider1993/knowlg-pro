var firstType = "";
var rowId = "";
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'treeGrid', 'jquery', 'winui', 'form'], function (exports) {
	
	winui.renderColor();
	
	var $ = layui.$,
		form = layui.form,
		treeGrid = layui.treeGrid;
	
//	authBtn('1568476869775');
	
	//表格渲染
	treeGrid.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    idField: 'id',
	    url: reqBasePath + 'knowledgetype001',
	    cellMinWidth: 100,
	    where: {name:$("#name").val(),parentId:$("#firstType").val()},
	    treeId: 'id',//树形id字段名称
        treeUpId: 'pId',//树形父id字段名称
        treeShowName: 'name',//以树形式显示的字段
	    cols: [[
	        { title: '序号', type: 'numbers'},
	        { field: 'name', title: '类型名称', align: 'center', width: 120 },
	        { field: 'state', title: '当前状态', width: 120, align: 'center', templet: function(d){
	        	if(d.state == '3'){
	        		return "<span class='state-down'>下线</span>";
	        	}else if(d.state == '2'){
	        		return "<span class='state-up'>上线</span>";
	        	}else if(d.state == '1'){
	        		return "<span class='state-new'>新建</span>";
	        	}
	        }},
	        { field: 'pId', title: '类型级别', align: 'center', width: 120 , templet: function(d){
	        	if(d.pId == '0'){
	        		return "一级类型";
	        	}else{
	        		return "二级类型";
	        	}
	        }},
	        { field: 'createTime', title: '创建时间', align: 'center', width: 180 },
	        { title: '操作', fixed: 'right', align: 'center', width: 257, toolbar: '#tableBar'}
	    ]],
	    isPage:false,
	    done: function(){
	    	if(!loadFirstType){
	    		initFirstType();
	    	}
	    }
	});
	
	treeGrid.on('tool(messageTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'edit') { //编辑
        	edit(data);
        }else if (layEvent === 'delet') { //删除
        	delet(data);
        }else if (layEvent === 'up') { //上线
        	up(data);
        }else if (layEvent === 'down') { //下线
        	down(data);
        }else if (layEvent === 'upMove') { //上移
        	upMove(data);
        }else if (layEvent === 'downMove') { //下移
        	downMove(data);
        }
    });
	
	var loadFirstType = false;
	//初始化一级类型
	function initFirstType(){
		loadFirstType = true;
		showGrid({
		 	id: "firstType",
		 	url: reqBasePath + "knowledgetype012",
		 	params: {},
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
	});
	
	form.render();
	
	//搜索表单
	$("body").on("click", "#formSearch", function(){
		loadTable();
	});
	
	//添加
	$("body").on("click", "#addBean", function(){
    	_openNewWindows({
			url: "../../tpl/knowledgetype/knowledgetypeadd.html", 
			title: "新增类型",
			pageId: "knowledgetypeadd",
			area: ['60vw', '60vh'],
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg("操作成功", {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
			}});
    });
	
	//删除
	function delet(data){
		var msg = '确认删除选中数据吗？';
		layer.confirm(msg, { icon: 3, title: '删除知识库类型' }, function (index) {
			layer.close(index);
            //向服务端发送删除指令
            AjaxPostUtil.request({url:reqBasePath + "knowledgetype003", params:{rowId: data.id}, type:'json', callback:function(json){
    			if(json.returnCode == 0){
    				winui.window.msg("删除成功", {icon: 1,time: 2000});
    				loadTable();
    			}else{
    				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
    			}
    		}});
		});
	}
	
	//上线
	function up(data){
		var msg = '确认上线选中数据吗？';
		layer.confirm(msg, { icon: 3, title: '上线知识库类型' }, function (index) {
			layer.close(index);
            //向服务端发送上线指令
            AjaxPostUtil.request({url:reqBasePath + "knowledgetype004", params:{rowId: data.id}, type:'json', callback:function(json){
    			if(json.returnCode == 0){
    				winui.window.msg("上线成功", {icon: 1,time: 2000});
    				loadTable();
    			}else{
    				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
    			}
    		}});
		});
	}
	
	//下线
	function down(data){
		var msg = '确认下线选中数据吗？';
		layer.confirm(msg, { icon: 3, title: '下线知识库类型' }, function (index) {
			layer.close(index);
            //向服务端发送下线指令
            AjaxPostUtil.request({url:reqBasePath + "knowledgetype005", params:{rowId: data.id}, type:'json', callback:function(json){
    			if(json.returnCode == 0){
    				winui.window.msg("下线成功", {icon: 1,time: 2000});
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
			url: "../../tpl/knowledgetype/knowledgetypeedit.html", 
			title: "编辑类型",
			pageId: "knowledgetypeedit",
			area: ['500px', '40vh'],
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
	
	//上移
	function upMove(data){
        //向服务端发送上移指令
        AjaxPostUtil.request({url:reqBasePath + "knowledgetype008", params:{rowId: data.id}, type:'json', callback:function(json){
			if(json.returnCode == 0){
				winui.window.msg("上移成功", {icon: 1,time: 2000});
				loadTable();
			}else{
				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
			}
		}});
	}
	
	//下移
	function downMove(data){
        //向服务端发送下移指令
        AjaxPostUtil.request({url:reqBasePath + "knowledgetype009", params:{rowId: data.id}, type:'json', callback:function(json){
			if(json.returnCode == 0){
				winui.window.msg("下移成功", {icon: 1,time: 2000});
				loadTable();
			}else{
				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
			}
		}});
	}
    
	//刷新数据
    $("body").on("click", "#reloadTable", function(){
    	loadTable();
    });
    
    function loadTable(){
    	treeGrid.query("messageTable", {where:{name:$("#name").val(),parentId:$("#firstType").val()}});
    }
    
    exports('knowledgetypelist', {});
});
