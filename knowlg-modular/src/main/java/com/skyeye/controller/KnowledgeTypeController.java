package com.skyeye.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import com.skyeye.service.KnowledgeTypeService;


@Controller
public class KnowledgeTypeController {
	
	@Autowired
	private KnowledgeTypeService knowledgeTypeService;
	
	/**
	 * 
	     * @Title: queryKnowledgeTypeList
	     * @Description: 获取知识库类型列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/queryKnowledgeTypeList")
	@ResponseBody
	public void queryKnowledgeTypeList(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.queryKnowledgeTypeList(inputObject, outputObject);
	}
	
	
	/**
	 * 
	     * @Title: insertKnowledgeTypeMation
	     * @Description: 添加知识库类型
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/insertKnowledgeTypeMation")
	@ResponseBody
	public void insertKnowledgeTypeMation(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.insertKnowledgeTypeMation(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: deleteKnowledgeTypeById
	     * @Description: 删除知识库类型
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/deleteKnowledgeTypeById")
	@ResponseBody
	public void deleteKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.deleteKnowledgeTypeById(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: updateUpKnowledgeTypeById
	     * @Description: 上线知识库类型
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/updateUpKnowledgeTypeById")
	@ResponseBody
	public void updateUpKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.updateUpKnowledgeTypeById(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: updateDownKnowledgeTypeById
	     * @Description: 下线知识库类型
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/updateDownKnowledgeTypeById")
	@ResponseBody
	public void updateDownKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.updateDownKnowledgeTypeById(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: selectKnowledgeTypeById
	     * @Description: 通过id查找对应的知识库类型信息
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/selectKnowledgeTypeById")
	@ResponseBody
	public void selectKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.selectKnowledgeTypeById(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: editKnowledgeTypeMationById
	     * @Description: 编辑知识库类型
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/editKnowledgeTypeMationById")
	@ResponseBody
	public void editKnowledgeTypeMationById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.editKnowledgeTypeMationById(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: editKnowledgeTypeMationOrderNumUpById
	     * @Description: 知识库类型上移
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/editKnowledgeTypeMationOrderNumUpById")
	@ResponseBody
	public void editSysWinTypeMationOrderNumUpById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.editKnowledgeTypeMationOrderNumUpById(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: editKnowledgeTypeMationOrderNumDownById
	     * @Description: 知识库类型下移
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/editKnowledgeTypeMationOrderNumDownById")
	@ResponseBody
	public void editSysWinTypeMationOrderNumDownById(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.editKnowledgeTypeMationOrderNumDownById(inputObject, outputObject);
	}

	/**
	 * 
	     * @Title: queryFirstKnowledgeTypeUpStateList
	     * @Description: 获取已经上线的一级类型列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/queryFirstKnowledgeTypeUpStateList")
	@ResponseBody
	public void queryFirstKnowledgeTypeUpStateList(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.queryFirstKnowledgeTypeUpStateList(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryAllFirstKnowledgeTypeStateList
	     * @Description: 获取所有的一级类型列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/queryAllFirstKnowledgeTypeStateList")
	@ResponseBody
	public void queryAllFirstKnowledgeTypeStateList(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.queryAllFirstKnowledgeTypeStateList(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: querySecondKnowledgeTypeUpStateList
	     * @Description: 获取上线的一级类型对应的上线的二级类型列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/querySecondKnowledgeTypeUpStateList")
	@ResponseBody
	public void querySecondKnowledgeTypeUpStateList(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.querySecondKnowledgeTypeUpStateList(inputObject, outputObject);
	}
	
	/**
	 * 
	     * @Title: queryAllSecondKnowledgeTypeStateList
	     * @Description: 获取所有的二级类型列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/KnowledgeTypeController/queryAllSecondKnowledgeTypeStateList")
	@ResponseBody
	public void queryAllSecondKnowledgeTypeStateList(InputObject inputObject, OutputObject outputObject) throws Exception{
		knowledgeTypeService.queryAllSecondKnowledgeTypeStateList(inputObject, outputObject);
	}
}
