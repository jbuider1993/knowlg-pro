package com.skyeye.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.skyeye.common.constans.Constants;
import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import com.skyeye.common.util.ToolUtil;
import com.skyeye.dao.KnowledgeTypeDao;
import com.skyeye.jedis.JedisClientService;
import com.skyeye.service.KnowledgeTypeService;

import net.sf.json.JSONArray;

@Service
public class KnowledgeTypeServiceImpl  implements KnowledgeTypeService {

	@Autowired
	private KnowledgeTypeDao knowledgeTypeDao;
	
	@Autowired
	public JedisClientService jedisClient;
	
	/**
	 * 
	     * @Title: queryKnowledgeTypeList
	     * @Description: 查出所有知识库类型列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void queryKnowledgeTypeList(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		List<Map<String, Object>> beans = knowledgeTypeDao.queryKnowledgeTypeList(map);
		if(!beans.isEmpty()){
			outputObject.setBeans(beans);
			outputObject.settotal(beans.size());
		}
	}
	
	/**
	 * 
	     * @Title: insertKnowledgeTypeMation
	     * @Description: 新增知识库类型
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void insertKnowledgeTypeMation(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = knowledgeTypeDao.queryKnowledgeTypeMationByName(map);//查询是否已经存在该知识库类型名称
		if(bean != null && !bean.isEmpty()){
			outputObject.setreturnMessage("该知识库类型名称已存在，请更换");
		}else{
			Map<String, Object> itemCount = knowledgeTypeDao.queryKnowledgeTypeBySimpleLevel(map);
			Map<String, Object> user = inputObject.getLogParams();
			int thisOrderBy = Integer.parseInt(itemCount.get("simpleNum").toString()) + 1;
			map.put("orderBy", thisOrderBy);
			map.put("id", ToolUtil.getSurFaceId());
			map.put("state", "1");//默认新建
			map.put("createId", user.get("id"));
			map.put("createTime", ToolUtil.getTimeAndToString());
			knowledgeTypeDao.insertKnowledgeTypeMation(map);
		}
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
	@Override
	public void deleteKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = knowledgeTypeDao.queryKnowledgeTypeStateById(map);
		if("1".equals(bean.get("state").toString()) || "3".equals(bean.get("state").toString())){//新建或者下线可以删除
			knowledgeTypeDao.deleteKnowledgeTypeById(map);
		}else{
			outputObject.setreturnMessage("该数据状态已改变，请刷新页面！");
		}
		
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
	@Override
	public void updateUpKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = knowledgeTypeDao.queryKnowledgeTypeStateById(map);
		if("1".equals(bean.get("state").toString()) || "3".equals(bean.get("state").toString())){//新建或者下线可以上线
			knowledgeTypeDao.updateUpKnowledgeTypeById(map);
			bean = knowledgeTypeDao.queryKnowledgeTypeById(map);	//查询该知识库类型的父级id
			jedisClient.del(Constants.sysSecondKnowledgeTypeUpStateList(bean.get("parentId").toString()));//删除上线知识库类型的redis
		}else{
			outputObject.setreturnMessage("该数据状态已改变，请刷新页面！");
		}
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
	@Override
	public void updateDownKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = knowledgeTypeDao.queryKnowledgeTypeStateById(map);
		if("2".equals(bean.get("state").toString())){//上线状态可以下线
			knowledgeTypeDao.updateDownKnowledgeTypeById(map);
			bean = knowledgeTypeDao.queryKnowledgeTypeById(map);	//查询该知识库类型的父级id
			jedisClient.del(Constants.sysSecondKnowledgeTypeUpStateList(bean.get("parentId").toString()));//删除上线知识库类型的redis
		}else{
			outputObject.setreturnMessage("该数据状态已改变，请刷新页面！");
		}
	}

	/**
	 * 
	     * @Title: selectKnowledgeTypeById
	     * @Description: 通过id查找对应的知识库类型信息用以编辑
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void selectKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object>	bean = knowledgeTypeDao.selectKnowledgeTypeById(map);
		outputObject.setBean(bean);
		outputObject.settotal(1);
	}

	/**
	 * 
	     * @Title: editKnowledgeTypeMationById
	     * @Description: 编辑知识库类型信息
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void editKnowledgeTypeMationById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = knowledgeTypeDao.queryKnowledgeTypeStateById(map);	//查询这条知识库类型的状态
		if("1".equals(bean.get("state").toString()) || "3".equals(bean.get("state").toString())){//新建或者下线可以编辑
			Map<String, Object> b = knowledgeTypeDao.queryKnowledgeTypeMationByNameAndId(map);	//查询知识库类型名称是否存在
			if(b != null && !b.isEmpty()){
				outputObject.setreturnMessage("该知识库类型名称已存在，请更换");
			}else{
				knowledgeTypeDao.editKnowledgeTypeMationById(map);
			}
		}else{
			outputObject.setreturnMessage("该数据状态已改变，请刷新页面！");
		}
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
	@Override
	public void editKnowledgeTypeMationOrderNumUpById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = knowledgeTypeDao.queryKnowledgeTypeUpMationById(map);//获取当前数据的同级分类下的上一条数据
		if(bean == null){
			outputObject.setreturnMessage("当前类型已经是首位，无须进行上移。");
		}else{
			//进行位置交换
			map.put("upOrderBy", bean.get("prevOrderBy"));
			bean.put("upOrderBy", bean.get("thisOrderBy"));
			knowledgeTypeDao.editKnowledgeTypeMationOrderNumUpById(map);	//该知识库类型与上一条数据互换orderBy
			knowledgeTypeDao.editKnowledgeTypeMationOrderNumUpById(bean);
			bean = knowledgeTypeDao.queryKnowledgeTypeById(map);	//查询该知识库类型的父级id
			jedisClient.del(Constants.sysSecondKnowledgeTypeUpStateList(bean.get("parentId").toString()));//删除上线知识库类型的redis
		}
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
	@Override
	public void editKnowledgeTypeMationOrderNumDownById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> bean = knowledgeTypeDao.queryKnowledgeTypeDownMationById(map);//获取当前数据的同级分类下的下一条数据
		if(bean == null){
			outputObject.setreturnMessage("当前类型已经是末位，无须进行下移。");
		}else{
			//进行位置交换
			map.put("upOrderBy", bean.get("prevOrderBy"));
			bean.put("upOrderBy", bean.get("thisOrderBy"));
			knowledgeTypeDao.editKnowledgeTypeMationOrderNumUpById(map);//该知识库类型与下一条数据互换orderBy
			knowledgeTypeDao.editKnowledgeTypeMationOrderNumUpById(bean);
			bean = knowledgeTypeDao.queryKnowledgeTypeById(map);	//查询该知识库类型的父级id
			jedisClient.del(Constants.sysSecondKnowledgeTypeUpStateList(bean.get("parentId").toString()));//删除上线知识库类型的redis
		}
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
	@SuppressWarnings("unchecked")
	@Override
	public void queryFirstKnowledgeTypeUpStateList(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		List<Map<String, Object>> beans = new ArrayList<>();
		if(ToolUtil.isBlank(jedisClient.get(Constants.sysSecondKnowledgeTypeUpStateList("")))){	//若缓存中无值
			beans = knowledgeTypeDao.queryFirstKnowledgeTypeUpStateList(map);	//从数据库中查询
			jedisClient.set(Constants.sysSecondKnowledgeTypeUpStateList(""), JSON.toJSONString(beans));	//将从数据库中查来的内容存到缓存中
		}else{
			beans = JSONArray.fromObject(jedisClient.get(Constants.sysSecondKnowledgeTypeUpStateList("")).toString());
		}
		if(!beans.isEmpty()){
			outputObject.setBeans(beans);
			outputObject.settotal(beans.size());
		}
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
	@SuppressWarnings("unchecked")
	@Override
	public void querySecondKnowledgeTypeUpStateList(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		List<Map<String, Object>> beans = new ArrayList<>();
		if(ToolUtil.isBlank(jedisClient.get(Constants.sysSecondKnowledgeTypeUpStateList(map.get("parentId").toString())))){//若缓存中无值
			beans = knowledgeTypeDao.querySecondKnowledgeTypeUpStateList(map);	//从数据库中查询
			jedisClient.set(Constants.sysSecondKnowledgeTypeUpStateList(map.get("parentId").toString()), JSON.toJSONString(beans));//将从数据库中查来的内容存到缓存中
		}else{
			beans = JSONArray.fromObject(jedisClient.get(Constants.sysSecondKnowledgeTypeUpStateList(map.get("parentId").toString())).toString());
		}
		if(!beans.isEmpty()){
			outputObject.setBeans(beans);
			outputObject.settotal(beans.size());
		}
	}
	
	/**
	 * 
	     * @Title: queryAllFirstKnowledgeTypeStateList
	     * @Description: 获取所有的一级类型列表用以搜索条件
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void queryAllFirstKnowledgeTypeStateList(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		List<Map<String, Object>> beans = new ArrayList<>();
		beans = knowledgeTypeDao.queryAllFirstKnowledgeTypeStateList(map);
		if(!beans.isEmpty()){
			outputObject.setBeans(beans);
			outputObject.settotal(beans.size());
		}
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
	@Override
	public void queryAllSecondKnowledgeTypeStateList(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		List<Map<String, Object>> beans = knowledgeTypeDao.queryAllSecondKnowledgeTypeStateList(map);	//从数据库中查询
		outputObject.setBeans(beans);
		outputObject.settotal(beans.size());
	}
}
