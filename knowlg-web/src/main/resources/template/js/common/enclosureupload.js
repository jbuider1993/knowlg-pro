
var folderId = "";

var enclosureList = new Array();

layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定js别名
    window: 'js/winui.window',
}).define(['window', 'jquery', 'winui', 'webuploader', 'fsCommon', 'fsTree'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name);
		var $ = layui.$,
			fsTree = layui.fsTree,
			fsCommon = layui.fsCommon;
		
		//附件所属目录
		folderId = "0";
		enclosureList = [].concat(parent.enclosureList);
		
		//初始化上传
		loadUploadMethod();
		form.render();
	    form.on('submit(fileUploadStart)', function (data) {
	    	//表单验证
	        if (winui.verifyForm(data.elem)) {
	        	uoloadObj.upload();
	        }
	        return false;
	    });
	    
	    /********* tree 处理   start *************/
	    loadMyEnclosureList();
	    var ztree = null;
	    function loadMyEnclosureList(){
	    	fsTree.render({
	    		id: "treeDemo",
	    		url: "sysenclosure010?userToken=" + getCookie('userToken') + "&loginPCIp=" + returnCitySN["cip"],
	    		checkEnable: true,
	    		loadEnable: false,//异步加载
	    		showLine: false,
	    		showIcon: true,
	    		onDblClick: function(){
	    		},
	    		onAsyncSuccess: function(id){
	    		},
	    		onCheck: zTreeOnCheck,//选中回调函数
	    	}, function(id){
	    		ztree = $.fn.zTree.getZTreeObj(id);
	    		var zTree = ztree.getCheckedNodes(false);  
			    for (var i = 0; i < zTree.length; i++) {
			    	for(var j = 0; j < enclosureList.length; j++){
			    		if(zTree[i].id == enclosureList[j].id){
			    			ztree.checkNode(zTree[i], true, true);
			    		}
			    	}
			    }  
	    		loadThisFolderChild();
	    	});
	    	
	    }
	    
	    function loadThisFolderChild(){
	    	ztree.expandNode(ztree.getNodeByParam("id", "1", null));//展开指定节点-我的文档
			ztree.selectNode(ztree.getNodeByParam("id", "1", null));//选中指定节点-我的文档
	    }
	    
	    //选中或取消选中的回调函数
	    function zTreeOnCheck(event, treeId, treeNode){
	    	//获取选中节点
	    	var zTree = ztree.getCheckedNodes(true);
	    	for (var i = 0; i < zTree.length; i++) {
	    		if(!isNull(zTree[i].fileType) && zTree[i].fileType != "folder"){
    				addToArray({
    					id: zTree[i].id,
    					name: zTree[i].name,
    					fileAddress: zTree[i].fileAddress
    				});
	    		}
	    	}
	    	//获取未选中节点
	    	zTree = ztree.getCheckedNodes(false);
	    	for (var i = 0; i < zTree.length; i++) {
	    		if(!isNull(zTree[i].fileType) && zTree[i].fileType != "folder"){
    				removeToArray(zTree[i].id);
	    		}
	    	}
	    }
	    
	    /********* tree 处理   end *************/
	    
	    //取消
	    $("body").on("click", "#cancle", function(){
	    	parent.layer.close(index);
	    });
	    
	    //确定
	    $("body").on("click", "#confimChoose", function(){
	    	var nodes = ztree.getCheckedNodes(true);
	    	for(var i = 0; i < nodes.length; i++){
	    		var node = nodes[i];
				if(!isNull(node.fileType) && node.fileType != "folder"){
					addToArray({
						id: node.id,
						name: node.name,
						fileAddress: node.fileAddress
					});
				}
			}
	    	parent.layer.close(index);
	    	parent.enclosureList = [].concat(enclosureList);
	    	parent.refreshCode = '0';
	    });
	    
	});
});

//向集合中添加元素
//参数为json
function addToArray(data){
	var inArray = false;
	$.each(enclosureList, function(i, item){
		if(item.id === data.id){
			inArray = true;
			return false;
		}
	});
	if(!inArray){//如果该元素在集合中不存在
		enclosureList.push({
			id: data.id,
			name: data.name,
			fileAddress: data.fileAddress
		});
	}
}

//移除集合中的元素
function removeToArray(id){
	var inArray = -1;
	$.each(enclosureList, function(i, item){
		if(id === item.id){
			inArray = i;
			return false;
		}
	});
	if(inArray != -1){//如果该元素在集合中存在
		enclosureList.splice(inArray, 1);
	}
}

function loadUploadMethod(){
    $wrap = $('#uploader'),
    // 文件容器
    $queue = $('<ul class="filelist"></ul>').appendTo( $wrap.find('.queueList') ),
    // 状态栏，包括进度和控制按钮
    $statusBar = $wrap.find('.statusBar'),
    // 文件总体选择信息。
    $info = $statusBar.find('.info'),
    // 上传按钮
    $upload = $wrap.find('.uploadBtn'),
    // 没选择文件之前的内容。
    $placeHolder = $wrap.find('.placeholder'),
    // 总体进度条
    $progress = $statusBar.find('.progress').hide(),
    // 添加的文件数量
    fileCount = 0,
    // 添加的文件总大小
    fileSize = 0,
    // 优化retina, 在retina下这个值是2
    ratio = window.devicePixelRatio || 1,
    // 缩略图大小
    thumbnailWidth = 110 * ratio,
    thumbnailHeight = 110 * ratio,
    // 可能有pedding, ready, uploading, confirm, done.
    state = 'pedding',
    // 所有文件的进度信息，key为file id
    percentages = {},
    supportTransition = (function(){
        var s = document.createElement('p').style,
            r = 'transition' in s ||
                  'WebkitTransition' in s ||
                  'MozTransition' in s ||
                  'msTransition' in s ||
                  'OTransition' in s;
        s = null;
        return r;
    })(),
    // WebUploader实例
    uploader;
	if (!WebUploader.Uploader.support()) {
	    alert( 'Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
	    throw new Error( 'WebUploader does not support the browser you are using.' );
	}
	
	var md5;
	//监听分块上传过程中的三个时间点
	WebUploader.Uploader.register({
		"before-send-file": "beforeSendFile",
		"before-send": "beforeSend",
		"after-send-file": "afterSendFile"
	}, {
		//时间点1：所有分块进行上传之前调用此函数
		beforeSendFile: function(file) {
			var deferred = WebUploader.Deferred();
			//1、计算文件的唯一标记，用于断点续传
			(new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024)
				.progress(function(percentage) {
					$('#' + file.id).find("p.state").text("正在读取文件信息...");
				})
				.then(function(val) {
					md5 = val;
					$('#' + file.id).find("p.state").text("成功获取文件信息...");
					//获取文件信息后进入下一步
					deferred.resolve();
				});
			return deferred.promise();
		},
		//时间点2：如果有分块上传，则每个分块上传之前调用此函数
		beforeSend: function(block) {
			var deferred = WebUploader.Deferred();
			var params = {
				//文件唯一标记
				"md5": md5,
				//当前分块下标
				"chunk": block.chunk,
				//当前分块大小
				"chunkSize": block.end - block.start
			};
			AjaxPostUtil.request({url:reqBasePath + "sysenclosure009", params: params, type:'json', callback:function(json){
    			if(json.returnCode == 0){
    				//分块存在，跳过
					deferred.reject();
    			}else{
    				//分块不存在或不完整，重新发送该分块内容
					deferred.resolve();
    			}
    		}, async: false});
			this.owner.options.formData.md5 = md5;
			deferred.resolve();
			return deferred.promise();
		},
		//时间点3：所有分块上传成功后调用此函数
		afterSendFile: function (data) {
			//如果分块上传成功，则通知后台合并分块
			AjaxPostUtil.request({url:reqBasePath + "sysenclosure008", params: {md5: md5, folderId: folderId, name: data.name, size: data.size}, type:'json', callback:function(json){
    			if(json.returnCode == 0){
    				addToArray(json.bean);
    			}else{
    				winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
    			}
    		}});
		 }
	});
	
	// 实例化
	uploader = WebUploader.create({
	    pick: {
	        id: '#filePicker',
	        label: '选择文件'
	    },
	    formData: {
	    	userToken: getCookie('userToken'),
	    	loginPCIp: returnCitySN["cip"],
	    	folderId: folderId
	    },
	    dnd: '#uploader .queueList',
	    paste: document.body,
	    // swf文件路径
	    swf: fileBasePath + '/assets/images/Uploader.swf',
	    disableGlobalDnd: true,//是否禁掉整个页面的拖拽功能
	    chunked: true,//是否要分片处理大文件上传
	    chunkSize: 10 * 1024 * 1024,
	    chunkRetry: 3,//网络问题上传失败后重试次数
	    threads: 1, //上传并发数
	    fileSizeLimit: 2000 * 1024 * 1024,//最大2GB
        fileSingleSizeLimit: 2000 * 1024 * 1024,
        resize: false,//不压缩
	    server: reqBasePath + 'sysenclosure007',
	    fileNumLimit: 300,
	});
	// 添加“添加文件”的按钮，
	uploader.addButton({
	    id: '#filePicker2',
	    label: '继续添加'
	});
	uploader.onUploadProgress = function(file, percentage) {
	    var $li = $('#'+file.id),
	        $percent = $li.find('.progress span');
	    $percent.css('width', percentage * 100 + '%');
	    percentages[file.id][1] = percentage;
	    updateTotalProgress();
	};
	uploader.onFileQueued = function(file) {
	    fileCount++;
	    fileSize += file.size;
	    if (fileCount === 1) {
	        $placeHolder.addClass( 'element-invisible' );
	        $statusBar.show();
	    }
	    addFile(file);
	    setState('ready');
	    updateTotalProgress();
	};
	uploader.onFileDequeued = function(file) {
	    fileCount--;
	    fileSize -= file.size;
	    if (!fileCount) {
	        setState( 'pedding' );
	    }
	    removeFile(file);
	    updateTotalProgress();
	};
	uploader.on( 'all', function( type ) {
	    var stats;
	    switch( type ) {
	        case 'uploadFinished':
	            setState( 'confirm' );
	            break;
	        case 'startUpload':
	            setState( 'uploading' );
	            break;
	        case 'stopUpload':
	            setState( 'paused' );
	            break;
	    }
	});
	uploader.on('uploadBeforeSend', function(block, data, headers) {
		headers['X-Requested-With']=  'XMLHttpRequest';
		data.userToken = getCookie('userToken');
		data.loginPCIp = returnCitySN["cip"];
		data.folderId = folderId;
		data.md5 = md5;
		data.chunk = block.chunk;
		data.chunkSize = block.end - block.start;
	});
	uploader.onError = function(code) {
	    alert('Eroor: ' + code);
	};
	$upload.on('click', function() {
	    if ($(this).hasClass( 'disabled')) {
	        return false;
	    }
	    if (state === 'ready') {
	        uploader.upload();
	    } else if (state === 'paused') {
	        uploader.upload();
	    } else if (state === 'uploading') {
	        uploader.stop(true);
	    }
	});
	$info.on('click', '.retry', function() {
	    uploader.retry();
	});
	$info.on('click', '.ignore', function() {
	    alert('todo');
	});
	$upload.addClass('state-' + state);
	updateTotalProgress();
}

//当有文件添加进来时执行，负责view的创建
function addFile( file ) {
    var $li = $( '<li id="' + file.id + '">' + '<p class="title">' + file.name + '</p>' + '<p class="imgWrap"></p>' + '<p class="progress"><span></span></p>' + '</li>' ),
        $btns = $('<div class="file-panel">' + '<span class="cancel">删除</span>' + '<span class="rotateRight">向右旋转</span>' + '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
        $prgress = $li.find('p.progress span'),
        $wrap = $li.find( 'p.imgWrap' ),
        $info = $('<p class="error"></p>'),
        showError = function( code ) {
            switch( code ) {
                case 'exceed_size':
                    text = '文件大小超出';
                    break;

                case 'interrupt':
                    text = '上传暂停';
                    break;

                default:
                    text = '上传失败，请重试';
                    break;
            }
            $info.text( text ).appendTo( $li );
        };
    if ( file.getStatus() === 'invalid' ) {
        showError( file.statusText );
    } else {
        $wrap.text( '预览中' );
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $wrap.text( '不能预览' );
                return;
            }
            var img = $('<img src="'+src+'">');
            $wrap.empty().append( img );
        }, thumbnailWidth, thumbnailHeight );
        percentages[ file.id ] = [ file.size, 0 ];
        file.rotation = 0;
    }
    file.on('statuschange', function( cur, prev ) {
        if ( prev === 'progress' ) {
            $prgress.hide().width(0);
        } else if ( prev === 'queued' ) {
            $li.off( 'mouseenter mouseleave' );
            $btns.remove();
        }
        // 成功
        if ( cur === 'error' || cur === 'invalid' ) {
            showError( file.statusText );
            percentages[ file.id ][ 1 ] = 1;
        } else if ( cur === 'interrupt' ) {
            showError( 'interrupt' );
        } else if ( cur === 'queued' ) {
            percentages[ file.id ][ 1 ] = 0;
        } else if ( cur === 'progress' ) {
            $info.remove();
            $prgress.css('display', 'block');
        } else if ( cur === 'complete' ) {
            $li.append( '<span class="success"></span>' );
        }
        $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
    });
    $li.on( 'mouseenter', function() {
        $btns.stop().animate({height: 30});
    });
    $li.on( 'mouseleave', function() {
        $btns.stop().animate({height: 0});
    });
    $btns.on( 'click', 'span', function() {
        var index = $(this).index(), deg;
        switch ( index ) {
            case 0:
                uploader.removeFile( file );
                return;

            case 1:
                file.rotation += 90;
                break;

            case 2:
                file.rotation -= 90;
                break;
        }
        if ( supportTransition ) {
            deg = 'rotate(' + file.rotation + 'deg)';
            $wrap.css({
                '-webkit-transform': deg,
                '-mos-transform': deg,
                '-o-transform': deg,
                'transform': deg
            });
        } else {
            $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
        }
    });
    $li.appendTo( $queue );
}

// 负责view的销毁
function removeFile(file) {
    var $li = $('#' + file.id);
    delete percentages[file.id];
    updateTotalProgress();
    $li.off().find('.file-panel').off().end().remove();
}

function updateTotalProgress() {
    var loaded = 0,
        total = 0,
        spans = $progress.children(),
        percent;
    $.each(percentages, function(k, v) {
        total += v[ 0 ];
        loaded += v[ 0 ] * v[ 1 ];
    });
    percent = total ? loaded / total : 0;
    spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
    spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
    updateStatus();
}

function updateStatus() {
    var text = '', stats;
    if (state === 'ready') {
        text = '选中' + fileCount + '个文件，共' + WebUploader.formatSize(fileSize) + '。';
    } else if (state === 'confirm') {
        stats = uploader.getStats();
        if (stats.uploadFailNum) {
            text = '已成功上传' + stats.successNum+ '个照片至服务器，'+ stats.uploadFailNum + '个文件上传失败，<a class="retry" href="#">重新上传</a>失败文件或<a class="ignore" href="#">忽略</a>'
        }
    } else {
        stats = uploader.getStats();
        text = '共' + fileCount + '张（' + WebUploader.formatSize(fileSize)  + '），已上传' + stats.successNum + '张';
        if (stats.uploadFailNum) {
            text += '，失败' + stats.uploadFailNum + '张';
        }
    }
    $info.html(text);
}

function setState(val) {
    var file, stats;
    if (val === state) {
        return;
    }
    $upload.removeClass('state-' + state);
    $upload.addClass('state-' + val);
    state = val;
    switch (state) {
        case 'pedding':
            $placeHolder.removeClass('element-invisible');
            $queue.parent().removeClass('filled');
            $queue.hide();
            $statusBar.addClass('element-invisible');
            uploader.refresh();
            break;
        case 'ready':
            $placeHolder.addClass('element-invisible');
            $( '#filePicker2' ).removeClass( 'element-invisible');
            $queue.parent().addClass('filled');
            $queue.show();
            $statusBar.removeClass('element-invisible');
            uploader.refresh();
            break;
        case 'uploading':
            $( '#filePicker2' ).addClass( 'element-invisible' );
            $progress.show();
            $upload.text( '暂停上传' );
            break;
        case 'paused':
            $progress.show();
            $upload.text( '继续上传' );
            break;
        case 'confirm':
            $progress.hide();
            $upload.text( '开始上传' ).addClass( 'disabled' );
            stats = uploader.getStats();
            if ( stats.successNum && !stats.uploadFailNum ) {
                setState( 'finish' );
                return;
            }
            break;
        case 'finish':
            stats = uploader.getStats();
            if (stats.successNum) {
                alert( '上传成功' );
            } else {
                // 没有成功的文件，重设
                state = 'done';
                location.reload();
            }
            break;
    }
    updateStatus();
}

