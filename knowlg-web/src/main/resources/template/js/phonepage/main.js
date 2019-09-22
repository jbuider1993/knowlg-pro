
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
	    url: reqBasePath + 'knowledgephone001',
	    where: {title: "", state: ""},
	    page: false,
	    cols: [[
	        { field: 'title', title: '', align: 'left', width: "calc(100% - 90px)", templet: function(d){
        		return "<a style='' rowid='" + d.id + "' class='details'>" + d.title + "</a>";
	        }},
	        { field: 'createTime', title: '', align: 'center', width: 90 },
	    ]],
	    done: function(){
	    	$("#messageTable").parent().find("div[class='layui-table-header']").remove();
	    	var tbody = $("#messageTable").parent().find("div[class='layui-table-box']");
	    	tbody.find("td[data-field='title']").css({width: $("body").width() - 90 - 16});
	    	tbody.find("td[data-field='title']>div").css({width: $("body").width() - 90 - 16});
	    	$(".layui-table-cell").css({padding: 0});
	    	tbody.find('td').css({
	    		'border-right': 'none'
	    	});
	    	tbody.parent().css({
	    		'border': 'none'
	    	});
	    	console.log($("body").width())
	    	parent.$("#newKnowledge").height(tbody.height());
	    }
	});
	
	$("body").on("click", ".details", function(e){
		parent.rowId = $(this).attr("rowid");
    	parent.$(".content-detail-show").animate({left: '0px'});
    	parent.$("#contentShow").attr("src", "details.html");
	});
	
    exports('phonepagemain', {});
});
