{{#bean}}
    <div class="layui-form-item">
        <label class="layui-form-label">类型名称<i class="red">*</i></label>
        <div class="layui-input-block">
            <input type="text" id="name" name="name" win-verify="required" placeholder="请输入知识库类型名称" class="layui-input" value="{{name}}"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">类型级别<i class="red">*</i></label>
        <div class="layui-input-block ver-center">
            {{pId}}
        </div>
    </div>
    <div class="layui-form-item layui-hide" id="parentIdBox">
        <label class="layui-form-label">上级类型<i class="red">*</i></label>
        <div class="layui-input-block ver-center">
        	{{pName}}
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="winui-btn" id="cancle">取消</button>
            <button class="winui-btn" lay-submit lay-filter="formEditBean">保存</button>
        </div>
    </div>
{{/bean}}