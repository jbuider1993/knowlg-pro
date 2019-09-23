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
	
	/**
	 * 
	     * @Title: insertUploadFileByUserId
	     * @Description: 上传文件
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/insertUploadFileByUserId")
	@ResponseBody
	public void insertUploadFileByUserId(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.insertUploadFileByUserId(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: insertUploadFileChunksByUserId
	     * @Description: 上传文件合并块
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/insertUploadFileChunksByUserId")
	@ResponseBody
	public void insertUploadFileChunksByUserId(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.insertUploadFileChunksByUserId(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryUploadFileChunksByChunkMd5
	     * @Description: 文件分块上传检测是否上传
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryUploadFileChunksByChunkMd5")
	@ResponseBody
	public void queryUploadFileChunksByChunkMd5(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryUploadFileChunksByChunkMd5(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryUnCheckedKnowledgeContentList
	     * @Description: 获取待审核的知识库列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryUnCheckedKnowledgeContentList")
	@ResponseBody
	public void queryUnCheckedKnowledgeContentList(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryUnCheckedKnowledgeContentList(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryKnowledgeContentByIdToCheck
	     * @Description: 获取知识库信息用于回显审核
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryKnowledgeContentByIdToCheck")
	@ResponseBody
	public void queryKnowledgeContentByIdToCheck(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryKnowledgeContentByIdToCheck(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: editKnowledgeContentToCheck
	     * @Description: 审核知识库
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/editKnowledgeContentToCheck")
	@ResponseBody
	public void editKnowledgeContentToCheck(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.editKnowledgeContentToCheck(inputObject, outputObject);
	}
	/**
	 * 
	     * @Title: queryCheckedKnowledgeContentList
	     * @Description: 获取已经审核的知识库列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryCheckedKnowledgeContentList")
	@ResponseBody
	public void queryCheckedKnowledgeContentList(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryCheckedKnowledgeContentList(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryUncheckedKnowledgeContent
	     * @Description: 未审核知识库详情
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryUncheckedKnowledgeContent")
	@ResponseBody
	public void queryUncheckedKnowledgeContent(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryUncheckedKnowledgeContent(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryCheckedKnowledgeContent
	     * @Description: 已审核的知识库详情
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryCheckedKnowledgeContent")
	@ResponseBody
	public void queryCheckedKnowledgeContent(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryCheckedKnowledgeContent(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryKnowledgeContentPhoneList
	     * @Description: 手机端知识库列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryKnowledgeContentPhoneList")
	@ResponseBody
	public void queryKnowledgeContentPhoneList(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryKnowledgeContentPhoneList(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryKnowledgeContentPhoneBySecondtypeId
	     * @Description: 手机端知识库二级类型下的所有知识库
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryKnowledgeContentPhoneBySecondtypeId")
	@ResponseBody
	public void queryKnowledgeContentPhoneBySecondtypeId(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryKnowledgeContentPhoneBySecondtypeId(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryKnowledgeContentPhoneByTitle
	     * @Description: 手机端知识库根据标题或者简介进行搜索
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeContentController/queryKnowledgeContentPhoneByTitle")
	@ResponseBody
	public void queryKnowledgeContentPhoneByTitle(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeContentService.queryKnowledgeContentPhoneByTitle(inputObject, outputObject);
	}
}
