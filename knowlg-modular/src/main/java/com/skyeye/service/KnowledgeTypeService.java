package com.skyeye.service;

import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;

public interface KnowledgeTypeService {
	
	public void queryKnowledgeTypeList(InputObject inputObject, OutputObject outputObject) throws Exception;
	
	public void insertKnowledgeTypeMation(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void deleteKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void updateUpKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void updateDownKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void selectKnowledgeTypeById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void editKnowledgeTypeMationById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void editKnowledgeTypeMationOrderNumUpById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void editKnowledgeTypeMationOrderNumDownById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryFirstKnowledgeTypeUpStateList(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryAllFirstKnowledgeTypeStateList(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void querySecondKnowledgeTypeUpStateList(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryKnowledgeTypeUpStateListToPhoneShow(InputObject inputObject, OutputObject outputObject) throws Exception;

}
