package com.ueditor.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ueditor.service.EditUploadService;


@Controller
public class EditUploadController {
	
	@Autowired
	private EditUploadService editUploadService;
	
	/**
	 * 上传富文本图片
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	@RequestMapping("/upload/editUploadController/uploadContentPic")
	@ResponseBody
	public Map<String,Object> uploadContentPic(HttpServletRequest req) throws Exception{
		return editUploadService.uploadContentPic(req);
	}
	
	/**
	 * 回显富文本图片
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	@RequestMapping("/upload/editUploadController/downloadContentPic")
	@ResponseBody
	public Map<String,Object> downloadContentPic(HttpServletRequest req) throws Exception{
		return editUploadService.downloadContentPic(req);
	}
	
	@RequestMapping("/upload/editUploadController/ueeditorConif")
	@ResponseBody
	public String ueeditorConif(HttpServletRequest request) throws Exception{
		return PublicMsg.UEDITOR_CONFIG;
	}
	
}
