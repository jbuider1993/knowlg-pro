	
{{#each rows}}
	<div class="layui-col-xs2 item">
		<div class="layui-col-xs12 icon-item">
			<i class="fa {{iconClass}} fa-fw"></i>
		</div>
		<div class="layui-col-xs12 icon-item icon-class">
			<span>{{iconClass}}</span>
		</div>
		<div class="layui-col-xs12 icon-item">
			<div>
				<a class="layui-btn layui-btn-xs edit" auth="1552963143937">编辑</a> 
				<a class="layui-btn layui-btn-danger layui-btn-xs del" auth="1552963131245">删除</a>
			</div>
		</div>
	</div>
{{/each}}