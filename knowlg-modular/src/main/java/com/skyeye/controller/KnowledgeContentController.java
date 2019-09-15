package com.skyeye.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import com.skyeye.service.KnowledgeContentService;

@Controller
public class KnowledgeContentController {
	
	@Autowired
	private KnowledgeContentService knowledgeContentService;
	
	/**
	 * 
	     * @Title: queryKnowledgeContentList
	     * @Description: 获取知识库列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryKnowledgeContentList")
	@ResponseBody
	public void queryKnowledgeContentList(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryKnowledgeContentList(inputObject, outputObject);
	}
	
	
	/**
	 * 
	     * @Title: insertKnowledgeContentMation
	     * @Description: 添加知识库
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/insertKnowledgeContentMation")
	@ResponseBody
	public void insertKnowledgeContentMation(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.insertKnowledgeContentMation(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: selectKnowledgeContentById
	     * @Description: 通过id查找对应的知识库信息用以编辑
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/selectKnowledgeContentById")
	@ResponseBody
	public void selectKnowledgeContentById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.selectKnowledgeContentById(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: editKnowledgeContentById
	     * @Description: 编辑知识库信息
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/editKnowledgeContentById")
	@ResponseBody
	public void editKnowledgeContentById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.editKnowledgeContentById(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: deleteKnowledgeContentById
	     * @Description: 删除知识库
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/deleteKnowledgeContentById")
	@ResponseBody
	public void deleteKnowledgeContentById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.deleteKnowledgeContentById(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryKnowledgeContentMationById
	     * @Description: 知识库详情
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryKnowledgeContentMationById")
	@ResponseBody
	public void queryKnowledgeContentMationById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryKnowledgeContentMationById(inputObject, outputObject);
	}

}
