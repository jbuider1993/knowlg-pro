# knowlg-pro

> win10风格的一套系统，前端采用layui作为前端框架，后端采用SpringBoot作为服务框架，采用自封装的xml对所有请求进行参数校验，以保证接口安全性。`项目长期更新`，觉得不错的点下star吧

> 注：开源社区版只限学习，切勿使用此版本商用，内设授权码，默认十天删除所有非基础数据

#### 介绍

- A．管理员可以通过后台对知识库的数据库数据进行批量维护工作，包括导入导出，备份等操作
- B．管理员可以对授权用户实现账号添加功能，通过添加账号可以实现知识库数据的检索展现功能
- C．授权账号通过客户端登录界面登录后可以通过关键字查询，系统展现所有关键字关联的信息供授权账号查询阅读
- D．查询结果显示简要信息列表式呈现，授权用户可以点击进入查看详细内容
- E．授权用户通过微信公众号进行信息内容数据录入，管理员进行审批，经过管理员审批可以收录的直接进入数据库。
- F．数据录入包含标题，内容，编辑人，内容支持图文编辑
- G．检索时支持选择检索对象是标题还是内容
- H. 数据库存放至本地服务器，客户端可以通过手机进行授权访问，管理员可以通过客户端或者浏览器等工具进行集中维护
- I. 可接入微信公众号

> 系统新增传统风格界面，layui左菜单右内容风格。

#### 启动方式
直接运行com.KnowLeDgeApplication即可，启动完成后，访问`http://localhost:8090`即可。 初始化账号密码：root/123456

#### 软件架构

- Spring Boot 2.X
- Layui
- MySql
- JDK 1.8

#### 声明
需要商业化的请向作者申请授权。如有定制需求，可入群或将需求发送至邮箱`598748873@qq.com`。

#### 功能介绍

功能|功能|功能|功能
-------|-------|-------|-------
菜单管理|员工管理|用户管理|角色管理
权限管理|资源图标|日志管理|多桌面管理
系统基础设置|系统的基础信息设置|知识库类型管理|手机端端展示
知识库管理|批量上传|审核管理|可接入微信公众号

#### 技术选型

##### 后端技术:

技术|名称|官网
---|---|---
SpringBoot|核心框架|http://spring.io/projects/spring-boot
MyBatis|ORM框架|http://www.mybatis.org/mybatis-3/zh/index.html
Druid|数据库连接池|https://github.com/alibaba/druid
Maven|项目构建管理|http://maven.apache.org/
redis|key-value存储系统|https://redis.io/
webSocket|浏览器与服务器全双工(full-duplex)通信|http://www.runoob.com/html/html5-websocket.html
Activiti|工作流引擎|https://www.activiti.org/
spring mvc|视图框架|http://spring.io/
quartz 2.2.2|定时任务|http://www.quartz-scheduler.org/
ActiveMQ|消息队列|http://activemq.apache.org/replicated-leveldb-store.html
solr|企业级搜索应用服务器|https://lucene.apache.org/solr/
Spring Cloud|微服务框架(目前用户APP端接口)|https://springcloud.cc/

##### 前端技术：

技术|名称|官网
---|---|---
jQuery|函式库|http://jquery.com/
zTree|树插件|http://www.treejs.cn/v3/
layui|模块化前端UI|https://www.layui.com/
winui|win10风格UI|https://gitee.com/doc_wei01_admin/skyeye
codemirror|codemirror代码编辑器|https://codemirror.net/
handlebars|js模板引擎|http://www.ghostchina.com/introducing-the-handlebars-js-templating-engine/
webSocket|浏览器与服务器全双工(full-duplex)通信|http://www.runoob.com/html/html5-websocket.html
G6|流程图开发|https://antv.alipay.com/zh-cn/index.html
FullCalendar|日历插件|https://blog.csdn.net/qw_xingzhe/article/details/44920943

#### 代码描述
##### 前后台接口映射

```
<url id="前端请求id" path="后台接口" val="备注" allUse="是否需要登录">
	<property id="前端请求key" name="后台接收key" ref="限制条件（参考项目内文档）" var="key含义"/>
</url>
```

##### 后台代码编写规范

###### 控制层

```
@RequestMapping("后台接口")
public void 方法名(InputObject inputObject, OutputObject outputObject) throws Exception{
	服务层接口对象.方法名(inputObject, outputObject);
}
```

###### 服务层

```
@Override
public void 方法名(InputObject inputObject, OutputObject outputObject) throws Exception {
	Map<String, Object> map = inputObject.getParams();//接收参数
	Map<String, Object> user = inputObject.getLogParams();//获取当前登录用户信息
	/**
	 * 业务逻辑
	 */
	outputObject.setBean(bean);//返回单个实体Bean
	outputObject.setBeans(beans);//返回集合
	outputObject.settotal(total);//返回数量
	outputObject.setreturnMessage("信息");//返回前端的错误信息
	outputObject.setreturnMessage("信息", 错误码);//返回前端的错误信息，同时抛出异常（不常用）
}
```

#### 效果图

|效果图|效果图|
| ------------- | ------------- |
|![](https://images.gitee.com/uploads/images/2019/1011/123357_6cbb13ab_1541735.jpeg "")|![](https://s2.ax1x.com/2019/10/11/uHb0jx.jpg "")|
|![](https://images.gitee.com/uploads/images/2019/1011/123435_dbe0068f_1541735.jpeg "")|![](https://s2.ax1x.com/2019/10/11/uHbRCd.jpg "")|
|![](https://images.gitee.com/uploads/images/2019/1011/123526_49900070_1541735.jpeg "")|![](https://s2.ax1x.com/2019/10/11/uHbhvt.jpg "")|
|![](https://images.gitee.com/uploads/images/2019/1011/123700_2a8b9135_1541735.png "")|![](https://s2.ax1x.com/2019/10/11/uHbzrV.png "")|
|![](https://images.gitee.com/uploads/images/2019/1011/123735_a65d3eeb_1541735.png "")|![](https://s2.ax1x.com/2019/10/11/uHqFPJ.jpg "")|
|![](https://s2.ax1x.com/2019/10/11/uHqkG9.png "")||

#### 环境搭建
##### 开发工具:

- MySql: 数据库</br>
- Tomcat: 应用服务器</br>
- SVN|Git: 版本管理</br>
- Nginx: 反向代理服务器</br>
- Varnish: HTTP加速器</br>
- IntelliJ IDEA|Eclipse: 开发IDE</br>
- Navicat for MySQL: 数据库客户端</br>
- Redis Manager：redis视图工具</br>

#### 资源下载

- JDK8 https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html</br>
- Maven http://maven.apache.org/download.cgi</br>
- Redis https://redis.io/download</br>
- Nginx http://nginx.org/en/download.html</br>

#### 在线文档

- [JDK8中文文档](https://blog.fondme.cn/apidoc/jdk-1.8-youdao/)</br>
- [Spring4.x文档](http://spring.oschina.mopaas.com/)</br>
- [Mybatis3官网](http://www.mybatis.org/mybatis-3/zh/index.html)</br>
- [Nginx中文文档](http://tool.oschina.net/apidocs/apidoc?api=nginx-zh)</br>
- [Git官网中文文档](https://git-scm.com/book/zh/v2)</br>

#### 项目交流：

QQ群号：[696070023](http://shang.qq.com/wpa/qunwpa?idkey=e9aace2bf3e05f37ed5f0377c3827c6683d970ac0bcc61b601f70dc861053229)

> 如果没有QQ或者QQ等级低于三个太阳的，需要了解商业版的请加微信：wzq_598748873，备注：码云-公司（姓名），作者不打造死尸群，小号勿进QQ群，望理解。


|QQ群|公众号|
|-------|-------|
|![](https://images.gitee.com/uploads/images/2018/1205/145236_4fce6966_1541735.jpeg "微信图片_20181205145217.jpg")|![](https://images.gitee.com/uploads/images/2018/1207/083137_48330589_1541735.jpeg "qrcode_for_gh_e7f97ff1beda_258.jpg")|