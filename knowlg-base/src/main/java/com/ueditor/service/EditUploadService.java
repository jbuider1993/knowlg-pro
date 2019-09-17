package com.ueditor.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface EditUploadService {

	public Map<String, Object> uploadContentPic(HttpServletRequest req) throws Exception;

	public Map<String, Object> downloadContentPic(HttpServletRequest req) throws Exception;

}
