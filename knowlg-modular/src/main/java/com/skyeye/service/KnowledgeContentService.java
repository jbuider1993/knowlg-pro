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

}
