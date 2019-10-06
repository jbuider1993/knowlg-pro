package com.skyeye.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

@Repository
@Mapper
public interface KnowledgeContentDao {

	public int insertKnowledgeContentMation(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryKnowledgeContentList(Map<String, Object> map, PageBounds pageBounds) throws Exception;

	public Map<String, Object> selectKnowledgeContentById(Map<String, Object> map) throws Exception;

	public int editKnowledgeContentById(Map<String, Object> map) throws Exception;

	public int deleteKnowledgeContentById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryKnowledgeContentMationById(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryUnCheckedKnowledgeContentList(Map<String, Object> map, PageBounds pageBounds) throws Exception;

	public int editKnowledgeContentToCheck(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryKnowledgeContentByIdToCheck(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryCheckedKnowledgeContentList(Map<String, Object> map, PageBounds pageBounds) throws Exception;

	public Map<String, Object> queryUncheckedKnowledgeContent(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryCheckedKnowledgeContent(Map<String, Object> map) throws Exception;

}
