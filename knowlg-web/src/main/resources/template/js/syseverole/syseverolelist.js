
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
	
	authBtn('1552954959607');
	
	//表格渲染
	table.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    url: reqBasePath + 'sys013',
	    where:{roleName:$("#roleName").val()},
	    even:true,  //隔行变色
	    page: true,
	    limits: [8, 16, 24, 32, 40, 48, 56],
	    limit: 8,
	    cols: [[
	        { title: '序号', type: 'numbers'},
	        { field: 'roleName', title: '角色名称', width: 120 },
	        { field: 'roleDesc', title: '角色描述', width: 520 },
	        { field: 'userNum', title: '使用用户数量', width: 150 },
	        { field: 'parentName', title: '父角色', width: 150 },
	        { field: 'createTime', title: '创建时间', width: 180 },
	        { title: '操作', fixed: 'right', align: 'center', width: 120, toolbar: '#tableBar'}
	    ]]
	});
	
	table.on('tool(messageTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') { //删除
        	del(data, obj);
        }else if (layEvent === 'edit') { //编辑
        	edit(data);
        }
    });
	
	//搜索表单
	form.render();
	form.on('submit(formSearch)', function (data) {
    	//表单验证
        if (winui.verifyForm(data.elem)) {
        	loadTable();
        }
        return false;
	});
	
	//删除
	function del(data, obj){
		var msg = obj ? '确认删除角色【' + obj.data.roleName + '】吗？' : '确认删除选中数据吗？';
		layer.confirm(msg, { icon: 3, title: '删除角色' }, function (index) {
			layer.close(index);
            //向服务端发送删除指令
            AjaxPostUtil.request({url:reqBasePath + "sys018", params:{rowId: data.id}, type:'json', callback:function(json){
    			if(json.returnCode == 0){
    				winui.window.msg("删除成功", {icon: 1,time: 2000});
    				loadTable();
    			}else{
    				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
    			}
    		}});
		});
	}
	
	//编辑角色
	function edit(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/syseverole/syseveroleedit.html", 
			title: "编辑角色",
			pageId: "syseveroleedit",
			maxmin: true,
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg("操作成功", {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
			}});
	}
	
	//刷新数据
    $("body").on("click", "#reloadTable", function(){
    	loadTable();
    });
    
    //新增角色
    $("body").on("click", "#addBean", function(){
    	_openNewWindows({
			url: "../../tpl/syseverole/syseveroleadd.html", 
			title: "新增角色",
			pageId: "syseveroleadd",
			maxmin: true,
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	winui.window.msg("操作成功", {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
			}});
    });
    
    function loadTable(){
    	table.reload("messageTable", {where:{roleName:$("#roleName").val()}});
    }
    
    exports('syseverolelist', {});
});
