{{#bean}}
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">标题<i class="red">*</i></label>
        <div class="layui-input-block">
        	<input type="text" id="title" name="title" win-verify="required" placeholder="请输入知识库标题" class="layui-input" value="{{title}}"/>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">公告内容<i class="red">*</i></label>
        <div class="layui-input-block">
			<script id="container" name="content" type="text/plain"></script>
		</div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <label class="layui-form-label">简介<i class="red">*</i></label>
        <div class="layui-input-block">
			<textarea id="desc" name="desc" placeholder="请输入知识库简介" class="layui-textarea">{{desc}}</textarea>
		</div>
    </div>
    <div class="layui-form-item layui-col-xs6">
	    <label class="layui-form-label">一级分类<i class="red">*</i></label>
        <div class="layui-input-block">
            <select lay-filter="typeId" lay-search="" id="typeId">
            
            </select>
        </div>
	</div>
    <div class="layui-form-item layui-col-xs6">
        <label class="layui-form-label">二级分类<i class="red">*</i></label>
        <div class="layui-input-block">
        	<select lay-filter="secondTypeId" lay-search="" id="secondTypeId">
            
            </select>
        </div>
    </div>
    <div class="layui-form-item layui-col-xs12">
        <div class="layui-input-block">
            <button class="winui-btn" id="cancle">取消</button>
            <button class="winui-btn" lay-submit lay-filter="formEditBean">保存</button>
        </div>
    </div>
{{/bean}}