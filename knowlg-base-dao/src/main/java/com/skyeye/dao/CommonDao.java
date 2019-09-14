package com.skyeye.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface CommonDao {

	public int insertCodeModelHistory(List<Map<String, Object>> inBeans) throws Exception;

}
