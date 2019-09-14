package com.skyeye.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

@Repository
@Mapper
public interface SysEveWinLockBgPicDao {

	public List<Map<String, Object>> querySysEveWinLockBgPicList(Map<String, Object> map, PageBounds pageBounds) throws Exception;

	public int insertSysEveWinLockBgPicMation(Map<String, Object> map) throws Exception;

	public Map<String, Object> querySysEveWinLockBgPicMationByName(Map<String, Object> map) throws Exception;

	public int deleteSysEveWinLockBgPicMationById(Map<String, Object> map) throws Exception;

	public Map<String, Object> querySysEveMationById(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> querySysEveWinBgPicListToShow(Map<String, Object> map) throws Exception;

	public int insertSysEveWinBgPicMationByCustom(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> querySysEveWinBgPicCustomList(Map<String, Object> map) throws Exception;

	public int deleteSysEveWinBgPicMationCustomById(Map<String, Object> map) throws Exception;

}
