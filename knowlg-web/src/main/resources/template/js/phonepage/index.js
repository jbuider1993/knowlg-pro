﻿
//搜索内容
var searchName = "";
var typeId = "";

//知识库详情id,通过子页面赋值
var rowId = "";

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'jquery', 'winui', 'form'], function (exports) {
	
	winui.renderColor();
	
	var $ = layui.$,
		form = layui.form;
	
	var beanTemplate = $('#beanTemplate').html();
	//初始化数据
    showGrid({
        id: "showBean",
        url: reqBasePath + "knowledgephone002",
        params: {},
        pagination: false,
        template: beanTemplate,
        ajaxSendAfter:function(json){
        }
    });

	$("body").on("click", "#menuCheck", function(e){
		var _this = $(this).find("i");
		if(_this.hasClass("fa-outdent")){//展开
			_this.removeClass("fa-outdent").addClass("fa-indent");
			$(".know-type-ul").animate({left: '40%'});
			$(".know-type-box").animate({left: '0px'});
		}else{//缩进
			_this.removeClass("fa-indent").addClass("fa-outdent");
			$(".know-type-ul").animate({left: '100%'});
			$(".know-type-box").animate({left: '100%'});
		}
	});
	
	$("body").on("click", ".know-type-box", function(e){
		$("#menuCheck").find("i").removeClass("fa-indent").addClass("fa-outdent");
		$(".know-type-box").animate({left: '100%'});
		$(".know-type-ul").animate({left: '100%'});
	});
	
	//搜索
	$("body").on("click", "#searchBtn", function(e){
		//隐藏首页内容
		$(".main-show").hide();
		$(".search-show").show();
		searchName = $("#searchName").val();
		$("#searchNameShow").html(searchName);
		$("#searchKnowledge").attr("src", "search.html");
	});
	
	//首页
	$("body").on("click", "#mainShow", function(e){
		$(".main-show").show();
		//隐藏搜索内容
		$(".search-show").hide();
		//隐藏根据分类搜索类型
		$(".type-search-show").hide();
		//重置搜索内容为空
		$("#searchName").val("");
		//显示搜索按钮
		$(".search-box").show();
	});
	
	//分类
	$("body").on("click", ".know-type-ul .checkTypeItem", function(e){
		typeId = $(this).attr("id");
		//隐藏菜单
		$("#menuCheck").find("i").removeClass("fa-indent").addClass("fa-outdent");
		$(".know-type-box").animate({left: '100%'});
		$(".know-type-ul").animate({left: '100%'});
		//隐藏首页内容
		$(".main-show").hide();
		//隐藏搜索按钮
		$(".search-box").hide();
		//隐藏搜索内容
		$(".search-show").hide();
		//显示类型搜索
		$(".type-search-show").show();
		$("#searchTypeNameShow").html($(this).html());
		$("#searchTypeKnowledge").attr("src", "typesearch.html");
	});
	
	//菜单点击
    $("body").on("click", ".menu-box-none", function(e){
    	if($(this).parent().hasClass("layui-nav-itemed")){
    		$(this).parent().removeClass("layui-nav-itemed");
    	}else{
    		$(this).parent().addClass("layui-nav-itemed");
    	}
    });
	
	//返回
	$("body").on("click", "#reback", function(e){
		$(".content-detail-show").animate({left: '100%'});
	});
	
    exports('phonepageindex', {});
});
