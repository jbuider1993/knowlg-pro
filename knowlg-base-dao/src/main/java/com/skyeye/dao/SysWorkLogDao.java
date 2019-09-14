package com.skyeye.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

@Repository
@Mapper
public interface SysWorkLogDao {

	public List<Map<String, Object>> querySysWorkLogList(Map<String, Object> map, PageBounds pageBounds) throws Exception;

}
