
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
	
	//表格渲染
	table.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    url: reqBasePath + 'knowledgecontent001',
	    where: {title: "", state: ""},
	    page: false,
	    cols: [[
	        { field: 'title', title: '', align: 'left', width: "calc(100% - 90px)", templet: function(d){
        		return "<a style='' lay-event='details'>" + d.title + "</a>";
	        }},
	        { field: 'createTime', title: '', align: 'center', width: 90 },
	    ]],
	    done: function(){
	    	$("#messageTable").parent().find("div[class='layui-table-header']").remove();
	    	var tbody = $("#messageTable").parent().find("div[class='layui-table-box']");
	    	tbody.find("td[data-field='title']").css({width: tbody.width() - 90});
	    	tbody.find('td').css({
	    		'border-right': 'none'
	    	});
	    	tbody.parent().css({
	    		'border': 'none'
	    	});
	    	parent.$("#moreCommentKnowledge").height($("body").height());
	    }
	});
	
	table.on('tool(messageTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'details') { //详情
        	console.log("详情");
        }
    });
	
	
    exports('phonepagecomment', {});
});
