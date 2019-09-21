package com.skyeye.service;

import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;

public interface KnowledgeContentService {

	public void queryKnowledgeContentList(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void insertKnowledgeContentMation(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void selectKnowledgeContentById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void editKnowledgeContentById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void deleteKnowledgeContentById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryKnowledgeContentMationById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void insertUploadFileByUserId(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void insertUploadFileChunksByUserId(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryUploadFileChunksByChunkMd5(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryUnCheckedKnowledgeContentList(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void editKnowledgeContentToCheck(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryKnowledgeContentByIdToCheck(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryCheckedKnowledgeContentList(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryUncheckedKnowledgeContent(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryCheckedKnowledgeContent(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryKnowledgeContentPhoneList(InputObject inputObject, OutputObject outputObject) throws Exception;

}
