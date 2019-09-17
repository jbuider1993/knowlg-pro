package com.skyeye.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.alibaba.fastjson.JSON;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.skyeye.common.constans.Constants;
import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import com.skyeye.common.util.ToolUtil;
import com.skyeye.common.util.Word2Html;
import com.skyeye.dao.KnowledgeContentDao;
import com.skyeye.jedis.JedisClientService;
import com.skyeye.service.KnowledgeContentService;

import net.sf.json.JSONArray;

@Service
public class KnowledgeContentServiceImpl implements KnowledgeContentService {
	
	@Autowired
	private KnowledgeContentDao knowledgeContentDao;
	
	@Autowired
	public JedisClientService jedisClient;
	
	@Value("${IMAGES_PATH}")
	private String tPath;

	/**
	 * 
	     * @Title: queryKnowledgeContentList
	     * @Description: 获取知识库列表
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void queryKnowledgeContentList(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		List<Map<String, Object>> beans = knowledgeContentDao.queryKnowledgeContentList(map, 
				new PageBounds(Integer.parseInt(map.get("page").toString()), Integer.parseInt(map.get("limit").toString())));
		PageList<Map<String, Object>> beansPageList = (PageList<Map<String, Object>>)beans;
		int total = beansPageList.getPaginator().getTotalCount();
		outputObject.setBeans(beans);
		outputObject.settotal(total);
	}

	/**
	 * 
	     * @Title: insertKnowledgeContentMation
	     * @Description: 添加知识库
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void insertKnowledgeContentMation(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		map.put("id", ToolUtil.getSurFaceId());
		map.put("state", "1");
		map.put("readNum", '0');
		map.put("createId", inputObject.getLogParams().get("id"));
		map.put("createTime", ToolUtil.getTimeAndToString());
		knowledgeContentDao.insertKnowledgeContentMation(map);
	}
	
	/**
	 * 
	     * @Title: selectKnowledgeContentById
	     * @Description: 通过id查找对应的知识库信息用以编辑
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void selectKnowledgeContentById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object>	bean = knowledgeContentDao.selectKnowledgeContentById(map);
		outputObject.setBean(bean);
		outputObject.settotal(1);
	}
	
	/**
	 * 
	     * @Title: editKnowledgeContentById
	     * @Description: 编辑知识库信息
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void editKnowledgeContentById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		knowledgeContentDao.editKnowledgeContentById(map);
	}

	/**
	 * 
	     * @Title: deleteKnowledgeContentById
	     * @Description: 删除知识库
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void deleteKnowledgeContentById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		knowledgeContentDao.deleteKnowledgeContentById(map);
	}

	/**
	 * 
	     * @Title: queryKnowledgeContentMationById
	     * @Description: 知识库详情
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@Override
	public void queryKnowledgeContentMationById(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object>	bean = knowledgeContentDao.queryKnowledgeContentMationById(map);
		outputObject.setBean(bean);
		outputObject.settotal(1);
	}

	/**
	 * 
	     * @Title: insertUploadFileByUserId
	     * @Description: 上传文件
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@SuppressWarnings({ "static-access", "rawtypes", "unchecked" })
	@Override
	public void insertUploadFileByUserId(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		// 将当前上下文初始化给 CommonsMutipartResolver （多部分解析器）
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(inputObject.getRequest().getSession().getServletContext());
		// 检查form中是否有enctype="multipart/form-data"
		if (multipartResolver.isMultipart(inputObject.getRequest())) {
			Map<String, Object> user = inputObject.getLogParams();
			String userId = user.get("id").toString();
			// 将request变成多部分request
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) inputObject.getRequest();
			// 获取multiRequest 中所有的文件名
			Iterator iter = multiRequest.getFileNames();
			String basePath = tPath + "\\upload\\wordfolder\\" + userId;
			String trueFileName = "";
			String fileName = "";
			while (iter.hasNext()) {
				// 一次遍历所有文件
				MultipartFile file = multiRequest.getFile(iter.next().toString());
				fileName = file.getOriginalFilename();// 文件名称
				//得到文件扩展名
				String fileExtName = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
				if (file != null) {
					File pack = new File(basePath);
					if(!pack.isDirectory())//目录不存在 
						pack.mkdirs();//创建目录
					// 自定义的文件名称
    				String newFileName = String.valueOf(System.currentTimeMillis()) + "." + fileExtName;
					String path = basePath + "\\" + newFileName;
					// 上传
					file.transferTo(new File(path));
					//初始化文件对象内容
					trueFileName = "/images/upload/wordfolder/" + userId + "/" + newFileName ;
					map.put("fileType", fileExtName);//文件类型
					map.put("fileSizeType", "bytes");//文件大小单位
					map.put("id", ToolUtil.getSurFaceId());
					map.put("createId", userId);
					map.put("createTime", ToolUtil.getTimeAndToString());
					map.put("fileAddress", trueFileName);//文件地址
					map.put("fileThumbnail", "-1");
					List<Map<String, Object>> beans;
					if(ToolUtil.isBlank(jedisClient.get(Constants.getSysWordFileModuleByMd5(map.get("md5").toString())))){
						beans = new ArrayList<>();
					}else{
						beans = JSONArray.fromObject(jedisClient.get(Constants.getSysWordFileModuleByMd5(map.get("md5").toString())).toString());
					}
					beans.add(map);
					jedisClient.set(Constants.getSysWordFileModuleByMd5(map.get("md5").toString()), JSON.toJSONString(beans));
				}
			}
		}
	}

	/**
	 * 
	     * @Title: insertUploadFileChunksByUserId
	     * @Description: 上传文件合并块
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@SuppressWarnings({ "unchecked", "resource" })
	@Override
	public void insertUploadFileChunksByUserId(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		Map<String, Object> user = inputObject.getLogParams();
		String userId = user.get("id").toString();
		List<Map<String, Object>> beans = JSONArray.fromObject(jedisClient.get(Constants.getSysWordFileModuleByMd5(map.get("md5").toString())).toString());
		List<File> fileList = new ArrayList<File>();
		File f;
		for(Map<String, Object> bean : beans){
			f = new File(tPath.replace("images", "") + bean.get("fileAddress").toString());
			fileList.add(f);
		}
		String fileName = map.get("name").toString();
		String fileExtName = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();//文件后缀
		String newFileName = String.valueOf(System.currentTimeMillis()) + "." + fileExtName;//新文件名
		String path = tPath + "\\upload\\wordfolder" + "\\" + userId + "\\" + newFileName;//文件路径
		File outputFile = new File(path);
		//创建文件
		outputFile.createNewFile();
		//输出流
		FileChannel outChnnel = new FileOutputStream(outputFile).getChannel();
		//合并
		try{
			FileChannel inChannel;
			for(File file : fileList){
				inChannel = new FileInputStream(file).getChannel();
				inChannel.transferTo(0, inChannel.size(), outChnnel);
				inChannel.close();
				//删除分片
				file.delete();
			}
		}finally{
			if(outChnnel != null)
				outChnnel.close();
		}
		jedisClient.del(Constants.getSysWordFileModuleByMd5(map.get("md5").toString()));
		try{
			Map<String, Object> entity = Word2Html.word2007ToHtml(outputFile, tPath + "\\upload\\ueditor\\");
			if("1".equals(entity.get("code").toString())){//成功
				String content = entity.get("content").toString();
				Map<String, Object> bean = new HashMap<>();
				bean.put("id", ToolUtil.getSurFaceId());
				bean.put("state", "1");
				bean.put("readNum", '0');
				bean.put("title", fileName);
				bean.put("desc", fileName);
				bean.put("content", content.length() > 200 ? content.substring(0, 200) : content.substring(0, content.length()));
				bean.put("createId", inputObject.getLogParams().get("id"));
				bean.put("createTime", ToolUtil.getTimeAndToString());
				knowledgeContentDao.insertKnowledgeContentMation(bean);
			}else{
				entity = Word2Html.wordToHtml(outputFile, tPath + "\\upload\\ueditor\\");
				if("1".equals(entity.get("code").toString())){//成功
					String content = entity.get("content").toString();
					Map<String, Object> bean = new HashMap<>();
					bean.put("id", ToolUtil.getSurFaceId());
					bean.put("state", "1");
					bean.put("readNum", '0');
					bean.put("title", fileName);
					bean.put("desc", content.length() > 200 ? content.substring(0, 200) : content.substring(0, content.length()));
					bean.put("content", entity.get("content"));
					bean.put("createId", inputObject.getLogParams().get("id"));
					bean.put("createTime", ToolUtil.getTimeAndToString());
					knowledgeContentDao.insertKnowledgeContentMation(bean);
				}
			}
		}finally{
			ToolUtil.deleteFile(path);
		}
		outputObject.setBean(map);
	}

	/**
	 * 
	     * @Title: queryUploadFileChunksByChunkMd5
	     * @Description: 文件分块上传检测是否上传
	     * @param @param inputObject
	     * @param @param outputObject
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@SuppressWarnings({ "unchecked", "unused" })
	@Override
	public void queryUploadFileChunksByChunkMd5(InputObject inputObject, OutputObject outputObject) throws Exception {
		Map<String, Object> map = inputObject.getParams();
		String md5 = map.get("md5").toString();
		String chunk = map.get("chunk").toString();
		List<Map<String, Object>> beans;
		if(ToolUtil.isBlank(jedisClient.get(Constants.getSysWordFileModuleByMd5(md5)))){
			beans = new ArrayList<>();
		}else{
			beans = JSONArray.fromObject(jedisClient.get(Constants.getSysWordFileModuleByMd5(md5)).toString());
		}
		Map<String, Object> bean = null;
		int index = -1;
		for(int i = 0; i < beans.size(); i++){
			Map<String, Object> item = beans.get(i);
			if(chunk.equals(item.get("chunk").toString())){
				bean = item;
				index = i;
				return;
			}
		}
		if(bean != null && !bean.isEmpty()){
			String fileAddress = tPath.replace("images", "") + bean.get("fileAddress").toString();
			File checkFile = new File(fileAddress);
			String chunkSize = map.get("chunkSize").toString();
			if(checkFile.exists() && checkFile.length() == Integer.parseInt(chunkSize)){
			}else{
				beans.remove(index);
				jedisClient.set(Constants.getSysWordFileModuleByMd5(map.get("md5").toString()), JSON.toJSONString(beans));
				outputObject.setreturnMessage("文件上传失败");
			}
		}else{
			outputObject.setreturnMessage("文件上传失败");
		}
	}

}
