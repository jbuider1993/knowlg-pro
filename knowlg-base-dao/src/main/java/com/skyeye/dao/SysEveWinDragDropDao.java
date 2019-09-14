package com.skyeye.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface SysEveWinDragDropDao {

	public List<Map<String, Object>> queryMenuBoxNameInByName(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryWinCustomMenuBoxNumByUserId(Map<String, Object> map) throws Exception;

	public int insertWinCustomMenuBox(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryMenuNameInByName(Map<String, Object> map) throws Exception;

	public int insertWinCustomMenu(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryMenuMationFromSysById(Map<String, Object> map) throws Exception;

	public int deleteCustomMenuById(Map<String, Object> map) throws Exception;

	public int deleteCustomBoxMenuById(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryChildsMenuById(Map<String, Object> map) throws Exception;

	public int deleteCustomMenuByIds(Map<String, Object> map) throws Exception;

	public int deleteUserSysMenuByIds(List<Map<String, Object>> removeChild) throws Exception;

	public int deleteSysBoxMenuById(Map<String, Object> map) throws Exception;

	public int delMenuParentIdById(Map<String, Object> map) throws Exception;

	public int insertMenuParentId(Map<String, Object> map) throws Exception;

	public int deleteCustomMenuParentByIds(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryMenuMationTypeById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryCustomMenuBoxMationEditById(Map<String, Object> map) throws Exception;

	public int editCustomMenuBoxMationById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryCustomMenuMationEditById(Map<String, Object> map) throws Exception;

	public int editCustomMenuMationById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryCustomMenuToDeskTopById(Map<String, Object> map) throws Exception;

	public int editCustomMenuToDeskTopById(Map<String, Object> map) throws Exception;

	public Map<String, Object> queryMenuToDeskTopById(Map<String, Object> map) throws Exception;

}
