package com.skyeye.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface KnowledgeTypeDao {
	
	public List<Map<String, Object>> queryKnowledgeTypeList(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryKnowledgeTypeMationByName(Map<String, Object> map) throws Exception;
	
	public Map<String, Object> queryKnowledgeTypeMationByNameAndId(Map<String, Object> map) throws Exception;

	public int insertKnowledgeTypeMation(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryKnowledgeTypeBySimpleLevel(Map<String, Object> map) throws Exception;

	public int deleteKnowledgeTypeById(Map<String, Object> map) throws Exception;

	public int updateUpKnowledgeTypeById(Map<String, Object> map) throws Exception;

	public int updateDownKnowledgeTypeById(Map<String, Object> map) throws Exception;

	public Map<String, Object> selectKnowledgeTypeById(Map<String, Object> map) throws Exception;

	public int editKnowledgeTypeMationById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryKnowledgeTypeUpMationById(Map<String, Object> map) throws Exception;

	public int editKnowledgeTypeMationOrderNumUpById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryKnowledgeTypeDownMationById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryKnowledgeTypeStateById(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryFirstKnowledgeTypeUpStateList(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryAllFirstKnowledgeTypeStateList(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> querySecondKnowledgeTypeUpStateList(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryKnowledgeTypeById(Map<String, Object> map) throws Exception;

}
