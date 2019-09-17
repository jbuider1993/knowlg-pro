package com.skyeye.dao;

import java.util.List;
import java.util.Map;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

public interface EditUploadDao {

	public void insertFileImgMation(Map<String, Object> bean) throws Exception;

	public List<Map<String, Object>> queryFileImgMation(Map<String, Object> bean, PageBounds pageBounds) throws Exception;
	
}
