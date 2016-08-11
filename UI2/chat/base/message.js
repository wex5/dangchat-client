define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var fileApi = require("$UI/system/components/justep/docCommon/fileApi");
	var IM = require("./js/im");
	var PhotoSwipe = require("../lib/photoswipe/photoswipe.min");
	var PhotoSwipeUI_Default = require("../lib/photoswipe/photoswipe-ui-default.min");
	var electronApp = require("../lib/electron-app");
	var store = require('$UI/system/lib/base/store');
	
	require('css!../lib/photoswipe/photoswipe').load();
	require('css!../lib/photoswipe/default-skin').load();
	require("cordova!com.verso.cordova.clipboard");
	require("cordova!cordova-plugin-file");
	require("cordova!cordova-plugin-file-transfer");
	require("cordova!com.synconset.imagepicker");
	require("cordova!cordova-plugin-keyboard");
	
	
	
	var Model = function() {
		this.callParent();
		this.userName = "";
		this.isOnline = false;
		this.status = justep.Bind.observable("");
		this.curPeer = null;
		this.typingText = justep.Bind.observable("");
		this.fileType = [ 'image/vnd.dwg ', 'image/vnd.dxf', 'image/gif', 'image/jp2 ', 'image/jpeg', 'image/png', 'image/vnd.svf', 'image/tiff' ];
		this.messages = null;
		this.pageSize = 15;
		this.time = 0;
		this.timer = null;
		this.messageId;
		this.isGroupChat = justep.Bind.observable(false);
		this.row_touch = justep.Bind.observable();
		this.isText = justep.Bind.observable();
		this.isAudio = justep.Bind.observable();
		this.msgType = justep.Bind.observable();
		this.isAttentionBtnShow = justep.Bind.observable();
		this.i = 0;
		this.more = justep.Bind.observable(false);
		this.imageItemHideForApp = justep.Bind.observable(true);
		this.imageItemHideForBrowser = justep.Bind.observable(true);
		
	};

	// 图片路径转换
	Model.prototype.getImageUrl = function(url) {
		if (url) {
			return require.toUrl(url);
		} else { 
			return "";
		}
	};

	var messageParse = function(msg) {
		return IM.messageParse(msg, {
			photoClass : 'img-rounded',
			videoClass : 'video',
			audioClass : 'audio',
			fileClass : 'fileMsg',
			linkClass : 'link'
		});
	};

	var isIn = function(messages, id) {
		var mid = [];
		for (var i = 0; i < messages.length; i++) {
			mid.push(messages[i].rid);
		}
		if (mid.indexOf(id) >= 0) {
			return true;
		} else {
			return false;
		}
	};

	var getIndex = function(id, messages) {
		var index = -1;
		$.each(messages, function(i, v) {
			if (v.rid === id) {
				index = i;
				return false;
			}
		});
		return index;
	};

	// 后端推送时第一次没有文件的url
	var updateMessage = function(row, messages) {
		if (row) {
			var index = getIndex(row.getID(), messages);
			if (index > -1) {
				var msg = messageParse(messages[index]);
				row.val('fAttentionNum', msg.attentionNum);
				row.val('fIsOwnSet', msg.isOwnSet);
				if (msg.state !== 'unknown')
					row.val('fState', msg.state);
				var type = row.val('fStyle');
				var fileUrl = row.val('fileUrl');
				if ((type === 'photo' || type === 'document' || type === 'audio' || type === 'video') && !fileUrl) {
					if (msg.fileUrl) {
						row.val('fContent', msg.content);
						row.val('fileUrl', msg.fileUrl);
					}
				}
			}
		}
	};

	Model.prototype.setMessages = function(messages, delays) {
		var self = this, rows, i, message;
		var today = new Date();
		var data = self.comp("messageData");
		var dataCount = data.getCount();
		self.messages = messages;
		if (dataCount > 0) {
			rows = [];
			data.each(function(params) {
				var row = params.row;
				updateMessage(row, messages);
				var isExist = isIn(self.messages, row.getID());
				if (!isExist || row.val("fState") === "pending")
					rows.push(row);
			});
			if (rows.length > 0) {
				for (i = 0; i < rows.length; i++) {
					data.remove(rows[i]);
				}
			}
			var row = data.getLastRow();
			var lastRowId = row && row.getID();
			var index = getIndex(lastRowId, messages);
			if (index > -1 && index + 1 !== messages.length) {
				rows = [];
				for (i = index + 1; i < messages.length; i++) {
					message = messageParse(messages[i]);
					if (message) {
						rows.unshift({
							fID : message.mid,
							fContent : message.content,
							fSender : message.sender.name,
							fImg : message.sender.avatar,
							isOut : message.isOut,
							fileUrl : message.fileUrl,
							fStyle : message.type,
							fState : message.state,
							fSenderPID : message.senderPID,
							fSenderTime : justep.Date.toString(today, "yyyy/MM/dd") === justep.Date.toString(message.fullDate, "yyyy/MM/dd") ? justep.Date.toString(message.fullDate, "hh:mm")
									: justep.Date.toString(message.fullDate, "yyyy/MM/dd hh:mm"),
							fFileName : message.fileName,
							fAttentionNum : message.attentionNum,
							fIsOwnSet : message.isOwnSet,
							fOption : message.option,
							fMessageText : message.messageText,
							fChecked : 0
						});
					}
				}
				self.comp("messageData").loadData(rows, true);
				self.scrollToEnd();
			}
		} else {
			rows = [];
			var count = messages.length >= self.pageSize ? self.pageSize : messages.length;
			for (i = 0; i < count; i++) {
				message = messageParse(messages[messages.length - i - 1]);
				if (message) {
					rows.unshift({
						fID : message.mid,
						fContent : message.content,
						fSender : message.sender.name,
						fImg : message.sender.avatar,
						isOut : message.isOut,
						fileUrl : message.fileUrl,
						fStyle : message.type,
						fState : message.state,
						fSenderPID : message.senderPID,
						fSenderTime : justep.Date.toString(today, "yyyy/MM/dd") === justep.Date.toString(message.fullDate, "yyyy/MM/dd") ? justep.Date.toString(message.fullDate, "hh:mm")
								: justep.Date.toString(message.fullDate, "yyyy/MM/dd hh:mm"),
						fFileName : message.fileName,
						fAttentionNum : message.attentionNum,
						fIsOwnSet : message.isOwnSet,
						fOption : message.option,
						fMessageText : message.messageText,
						fChecked : 0
					});
				}
			}
			self.comp("messageData").loadData(rows);
			self.rowCount = messages.length >= self.pageSize ? self.pageSize : messages.length;
			if (count > 0)
				self.scrollToEnd(1000);
		}
	};

	// 发送按钮事件
	Model.prototype.okBtnClick = function(event) {
		if (this.curPeer) {
			var text = event.value;
			if (!text)
				return;
			event.source.clear();
			// event.source.closePicker();
			if (this.params !== undefined) {
				var peer = this.curPeer;
				IM.sendTextMessage(peer, text);
			}
		}
	};

	Model.prototype.personalClick = function(event) {
		this.comp('popMenu').show();
	};

	// 清除会话
	Model.prototype.clearChatBtnClick = function(event) {
		this.comp("allMessageDialog").show({
			message : "确定要删除全部消息？"
		});
	};

	Model.prototype.allMessageDialogYes = function(event) {
		if (this.curPeer) {
			if (this.params !== undefined) {
				var peer = this.curPeer;
				IM.clearChat(peer);
			}
		}
	};

	// 判断是否在线 好友 是否正在输入
	Model.prototype.modelModelConstructDone = function(event) {
		if (this.params) {
			var id = this.params.id;
			var pid = this.params.pid;
			var type = this.params.type;
			var self = this;
			var initPeer = function(id) {
				self.curPeer = IM.getPeer(id, type);
				self.initClient();
			};
			if (!id && pid) {
				var person = IM.getPerson(pid);
				IM.addFriend(person).done(function(uid) {
					initPeer(uid);
				});
			} else if (id)
				initPeer(id);
			this.isGroupChat.set(type === "group");
			this.initEvent();
		}
		if (electronApp.getIsInElectron()) {
			$(this.getElementByXid("prScrn")).removeClass("x-item-hide");
		}
		this.on('statusTap',function(){
			self.msgScrollViewPullDown();
			self.comp('msgScrollView').scrollTo(0);
		});
		$(this.getRootNode()).on('copy',function(){
			var selection = window.getSelection();
	        var tempDiv = $('<div></div>').text(selection).css({
	        	position:"absolute",
	        	left:"-99999px"
	        }).appendTo('body');
		    var range = selection.getRangeAt(0);
		    selection.selectAllChildren(tempDiv.get(0));
		    window.setTimeout(function () {
		        tempDiv.remove();
		        selection.removeAllRanges();
		        selection.addRange(range);
		    }, 0);
		});
	};

	Model.prototype.scrollToEnd = function(duration) {
		// 特殊逻辑，支持打开后滚到最后
		if(duration){
			window.setTimeout(justep.Util.bindModelFn(this, function() {
				this.comp('msgScrollView').scrollTo('end');
			}, this), duration);
		}else{
			this.comp('msgScrollView').scrollTo('end');
		}
	};

	Model.prototype.initClient = function() {
		var self = this;
		var peer = self.curPeer;

		if (peer) {
			IM.onConversationOpen(peer);
			self._bindChatHandle = IM.bindMessages(peer, function(messages, delays) {
				self.setMessages(messages, delays);
			});
			if (peer.type == "user") {
				$(this.comp("personal").domNode).show();
				this.userName = IM.getPersonByUID(peer.id).name || IM.getUser(peer.id).name;
				self.status.set(this.userName);

				self._bindUserOnlineHandle = IM.bindUserOnline(peer.id, function(online) {
					self.isOnline = online ? (online.isOnline ? "-在线" : "-离线") : "";
					var userStatus = self.userName + self.isOnline;
					self.status.set(userStatus);
				});

				self._bindTypingHandle = IM.bindTyping(peer, function(typing) {
					self.typingText.set(typing.typing ? "对方正在输入" : "");
				});
			} else {
				$(this.comp("group").domNode).show();
				self._bindGroupHandle = IM.bindGroup(peer.id, function(group) {
					self.status.set(group.name + "(" + group.members.length + ")");
				});
				self._bindTypingHandle = IM.bindTyping(peer, function(typing) {
					self.typingText.set(typing.typing ? (typing.typing.substring(0, 2) + "正在输入") : "");
				});
			}
		}
	};

	Model.prototype.modelUnLoad = function(event) {
		var peer = this.curPeer;
		if (peer) {
			if (this._bindChatHandle)
				this._bindChatHandle.unbind();
			if (this._bindUserOnlineHandle)
				this._bindUserOnlineHandle.unbind();
			if (this._bindGroupHandle)
				this._bindGroupHandle.unbind();
			if (this._bindTypingHandle)
				this._bindTypingHandle.unbind();
			IM.onConversationClosed(peer);
		}
		justep.Shell.off('onSendByEnterEnabledChanged', this.updateSendByEnterEnabled, this);
	};

	// 监听文件改变
	Model.prototype.initEvent = function() {
		var self = this;
		var panelComp = self.comp('panel');
		var superInput = self.comp('superinput');
		var scrollView = self.comp('msgScrollView');
		var $scrollEle = scrollView.$scrollEle;
		var $panelContent = $(this.getElementByXid('msgListContent'));
		var recontentHeight = function(event) {
			var height = event.height;
			if (event.isSuperInputPop) {
				if ($scrollEle.hasClass('x-iscoll5')) {
					self.comp('msgScrollView').$rootEle.css("bottom", height);
					self.comp('msgScrollView').refresh(true);
				} else {
					var scrollHeight = $scrollEle.find('.x-scroll-content').get(0).scrollHeight;
					var keyboardHeight = store.get('keyboardHeight');
					var keyboardShow = store.get('keyboardDidShow');
					if(justep.Browser.isIOS && !justep.Browser.isX5App){
						var innerheight = window.innerHeight - superInput.$domNode.height();
						if(justep.Browser.isStandalone){
							panelComp.$domNode.css('bottom',keyboardHeight + 45);
						}else{
							panelComp.$domNode.css('bottom',keyboardHeight + 45 - 45);
						}
						if(scrollHeight > innerheight - 48 - 58){
							$scrollEle.css({
								top : "auto",
								bottom:0,
								overflow:"visible"
							});
						}
					}else{
						if(justep.Browser.isIOS){
							//ios app 中 走滚动到最后 因为有弹动效果 不是最优解
							var innerheight = window.innerHeight - height - 68;
							if(keyboardShow){
								panelComp.$domNode.css('bottom',0);
							}else{
								panelComp.$domNode.css('bottom',keyboardHeight);
							}
							if(scrollHeight > innerheight){
								$scrollEle.css({
									top : 'auto',
									bottom:0,
									overflow:"visible"
								});
							}else{
								$scrollEle.css({
									top : '-50px',
									bottom:"auto",
									overflow:"auto"
								});
							}
						}else if(justep.Browser.isPC){
							$scrollEle.css({
								top : "-50px",
								height : "75vh"
							});
							self.scrollToEnd();
						}else {
							var innerheight = window.innerHeight;
							$scrollEle.css({
								top : "-50px",
								height : innerheight - 58
							});
							self.scrollToEnd();
						}
					}
				}
			} else {
				if ($scrollEle.hasClass('x-iscoll5')) {
					self.comp('msgScrollView').$rootEle.css("bottom", 58);
					self.comp('msgScrollView').refresh(true);
				} else {
					panelComp.$domNode.css('bottom',0);
					$scrollEle.css({
						position : "absolute",
						top : "-50px",
						height:"auto",
						overflow:"auto"
					});
					scrollView.scroller.scrollTo(100000);
				}
			}
		};
		
		superInput.on('onResize', recontentHeight);
		var msgList = this.getElementByXid('msgList');

		$(msgList).on("click.audio", ".audioMsg", this.playVoiceHandle.bind(this));
		$(msgList).on("click.photo", ".photoMsg", this.viewImageHandle.bind(this));
		$(msgList).on("click.file", "a.fileMsg", this.fileClickHandle.bind(this));
		$(msgList).on("click.link", "a.link", this.linkClickHandle.bind(this));
		var photoInput = this.getElementByXid('photoInput');
		$(photoInput).on("change", this.sendPhotoOrFileHandle.bind(this));

		var fileInput = this.getElementByXid('fileInput');
		$(fileInput).on("change", this.sendPhotoOrFileHandle.bind(this));
		var videoInput = this.getElementByXid('videoInput');
		$(videoInput).on("change", this.sendPhotoOrFileHandle.bind(this));
		var audioInput = this.getElementByXid('audioInput');
		$(audioInput).on("change", this.sendPhotoOrFileHandle.bind(this));

		if (justep.Browser.isX5Apps) {
			if (justep.Browser.isAndroid) {
				$(fileInput).attr("accept", "doc/*");
			} else if (justep.Browser.isIOS) {
				$(audioInput).parent().parent().hide();
				var self = this;
				$(fileInput).on("click.upload", function(event) {
					event.preventDefault();
					var mockEvent = {
						target : {
							files : []
						}
					};
					imagePicker.getPictures(function(result) {
						if (result.length > 0) {
							var content = '';
							var dfds = [];
							for (var i = 0; i < result.length; i++) {
								(function() {
									var dfd = $.Deferred();
									dfds.push(dfd);
									window.resolveLocalFileSystemURI(result[i], function(fileEntry) {
										fileEntry.file(function(file) {
											if (!file.type) {
												file.type = "image/jpeg";
											}
											mockEvent.target.files.push(file);
											dfd.resolve();
										}, function() {
											dfd.resolve();
										});
									}, function() {
										dfd.resolve();
									});
								})();
							}
							$.when.apply($, dfds).done(function() {
								self.sendPhotoOrFileHandle(mockEvent);
							});
						}
					}, function() {
					}, {});
				});
			}
		}
		this.comp('superinput').$domNode.on('paste drop', this.sendClipboardImageHandle.bind(this));
	};
	var getAfterPressText = function(e, text) {
		var src = e.srcElement || e.target;
		if (justep.Browser.IE && !justep.Browser.IE11) {
			var selRange = document.selection.createRange();
			var selTxt = selRange.text;// 选中的文本
			var srcRange = src.createTextRange();
			var srcText = srcRange.text;
			selRange.setEndPoint("StartToStart", srcRange);
			var beforeTxt = selRange.text;// 插入字符前的文本
		} else {
			var selTxt = window.getSelection().toString();// 选中的文本
			var srcRange = window.getSelection().getRangeAt(0).endOffset// src.selectionEnd;
			var srcText = src.textContent// src.value;
			var beforeTxt = src.textContent.substring(0, srcRange)// src.value.substring(0,
			// srcRange);
		}

		var insertTxt = text || String.fromCharCode(e.keyCode);// 插入字符
		var afterTxt = srcText.substr(beforeTxt.length);// 插入字符后的文本
		var txt = beforeTxt.substr(0, beforeTxt.length - selTxt.length) + insertTxt + afterTxt;
		return txt;
	};
	// 发送剪切板图片文件
	Model.prototype.sendClipboardImageHandle = function(event) {
		if (event.originalEvent) {
			event = event.originalEvent;
		}
		var clipboardData = event.clipboardData || event.dataTransfer;
		if (clipboardData && clipboardData.items) {
			var item;
			var i;
			var types = clipboardData.types || [];
			if (types.indexOf("text/html") != -1) {
				return true;
			}
			for (i = 0; i < types.length; i++) {
				if (types[i] === 'Files') {
					item = clipboardData.items[i];
					break;
				}
			}
			if (item && item.kind === 'file') {
				if (item.type.match(/^image\//i)) {
					var blob = item.getAsFile();
					this.showClipboardImage(blob);
				} else if (this.curPeer){
					for(i = 0; i < clipboardData.items.length; i++ ){
						item = clipboardData.items[i];
						if(item.kind === 'file'&&item.type.match(/^image\//i)){
							IM.sendClipboardPhotoMessage(this.curPeer,item.getAsFile());
						}else{
							IM.sendFileMessage(this.curPeer, item.getAsFile());
						}
					}
				}
				return false;
			}
		}
	};

	Model.prototype.showClipboardImage = function(img) {
		// pc端实现
	};
	var maxFileSize = function(file) {
		if (file.size > IM.fileSize) {
			throw justep.Error.create("文件不能超过" + IM.fileSize / 1024 / 1024 + "M");
		}
		return true;
	};
	// 发送图片 文件
	Model.prototype.sendPhotoOrFileHandle = function(event) {
		var peer = this.curPeer;
		if (peer) {
			var files = event.target.files;

			if (files && files.length > 0) {
				for (var i = 0; i < files.length; i++) {
					if (maxFileSize(files[i])) {
						if (this.fileType.indexOf(files[i].type) >= 0) {
							IM.sendPhotoMessage(peer, files[i]);
						} else {
							IM.sendFileMessage(peer, files[i]);
						}
					}
				}
			}
		}
		this.comp('superinput').closePicker();
		event.target.value = '';
	};

	var time2Str = function(time) {
		// 分钟
		var minute = time / 60;
		var minutes = parseInt(minute);
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		// 秒
		var second = time % 60;
		var seconds = parseInt(second);
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		return "" + minutes + "" + ":" + "" + seconds + "";
	};

	Model.prototype.updateVocText = function(voc,error) {
		if(!error){
			if (voc) {
				$(voc).prop('_isLoaded', true).next().removeClass('icon-loading-b').addClass('glyphicon glyphicon-volume-up').next('label').text(time2Str(voc.currentTime) + '/' + time2Str(voc.duration));
			}			
		}else{
			if (voc) {
				$(voc).next().removeClass('icon-loading-b').addClass('icon-close-circled').next('label').text('加载语音失败');
			}
		}

	};

	Model.prototype.superInputFinishRecVoice = function(event) {
		// TODO 发送语音
		var peer = this.curPeer;
		if (peer)
			IM.sendVoiceMessage(peer, 0, event.voice);
		// IM.sendFileMessage(peer, event.voice);
	};

	Model.prototype.viewImageHandle = function(event) {
		if (this.time < 1 && !this.more.get()) {
			var data = this.comp("messageData");
			var photos = getPhotos(data);
			if (photos.length > 0) {
				var ctx = justep.Bind.contextFor(event.target);
				var fileUrl = ctx.$object.val("fileUrl");
				var index = -1;
				$.each(photos, function(i, photo) {
					if (photo.url === fileUrl) {
						index = i;
						return false;
					}
				});
				if (index > -1)
					this.showImgs(photos, index);
			}
		}
	};

	Model.prototype.showImgs = function(photos, index) {
		// TODO 图片预览
		var pswpElement = this.getElementByXid('pswp');
		var items = [];
		var self = this;
		$.each(photos, function(i, photo) {
			items.push({
				src : photo.url,
				w : photo.option.w,
				h : photo.option.h
			});
		});
		var options = {
			index : index,
			history : false,
			captionEl : false,
			fullscreenEl : false,
			shareEl : false,
			maxSpreadZoom : 3,
			tapToClose : true
		};
		this.fireEvent("onShowImg", {
			options : options,
			items : items
		});
		this._gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		this._gallery.listen('close', function() {
			self.comp('router').removeRouteItem('gallery');
			self.comp('router').publishState();
		});
		this._gallery.init();
		this.comp('router').addRouteItem('gallery');
		this.comp('router').publishState();
	};

	Model.prototype.routerRoute = function(event) {
		if (event.name === "gallery" && event.routeState === "leave") {
			this._gallery.close();
		} else {
			this.cancelClick();// 取消更多状态
		}
	};

	Model.prototype.playVoiceHandle = function(event) {
		var self = this;
		var node = event.currentTarget;
		var $node = $(node);
		var voc = $node.prop('voc');
		if (!voc) {// 初始化语音相关
			var $audio = $node.children('audio');
			if ($audio.length > 0) {
				voc = $audio[0];
				$audio.on('play', function(event) {
					// event.currentTarget
					this._isplaying = true;
					$node.children('i').addClass('audioPlaing').removeClass('glyphicon glyphicon-volume-up').addClass('glyphicon glyphicon-stop');
				}).on('ended pause', function(event) {
					this._isplaying = false;
					this.currentTime = 0;
					$node.children('i').removeClass('audioPlaing').removeClass('glyphicon glyphicon-stop').addClass('glyphicon glyphicon-volume-up');
				}).on('timeupdate', function(event) {
					self.updateVocText(this);
				});
				$node.prop('voc', voc);
			}
		}
		if (voc && voc._isLoaded) voc._isplaying ? voc.pause() : voc.play();
	};

	// 显示群操作菜单
	Model.prototype.groupClick = function(event) {
		this.comp('groupPopMenu').show();
	};

	Model.prototype.groupInfoBtnClick = function(event) {
		if (this.curPeer) {
			justep.Shell.showPage("groupmembers", {
				id : this.curPeer.id,
				type : this.curPeer.type
			});
		}
	};

	Model.prototype.isPhoto = function(fStyle) {
		if (fStyle === "photo") {
			return true;
		} else {
			return false;
		}
	};

	Model.prototype.msgScrollViewPullDown = function(event) {
		if (!this.curPeer)
			return;
		var today = new Date();
		if (this.rowCount + 1 < this.messages.length) {
			// 加载更多数据
			var rows = [];

			for (var i = 0; i < this.pageSize; i++) {
				var message = messageParse(this.messages[this.messages.length - this.rowCount - 1]);
				if (message) {
					rows.unshift({
						fID : message.mid,
						fContent : message.content,
						fSender : message.sender.name,
						fImg : message.sender.avatar,
						isOut : message.isOut,
						fileUrl : message.fileUrl,
						fStyle : message.type,
						fState : message.state,
						fSenderPID : message.senderPID,
						fSenderTime : justep.Date.toString(today, "yyyy/MM/dd") === justep.Date.toString(message.fullDate, "yyyy/MM/dd") ? justep.Date.toString(message.fullDate, "hh:mm")
								: justep.Date.toString(message.fullDate, "yyyy/MM/dd hh:mm"),
						fFileName : message.fileName,
						fAttentionNum : message.attentionNum,
						fIsOwnSet : message.isOwnSet,
						fOption : message.option,
						fMessageText : message.messageText,
						fChecked : 0
					});
					this.rowCount++;
				}

				if (this.rowCount == this.messages.length) {
					break;
				}
			}
			if (rows.length > 0)
				this.comp("messageData").loadData(rows, true, null, 0);
		}
		if (this.rowCount + this.pageSize > this.messages.length) {
			IM.onChatEnd(this.curPeer);
		}
	};

	Model.prototype.showPersonClick = function() {
		if (this.curPeer) {
			justep.Shell.showPage("contact", {
				"contactId" : IM.getPersonByUID(this.curPeer.id).id
			});
		}
	};

	Model.prototype.touchStart = function(event) {
		this.touchMoved = false;
		this.touchStartTime = new Date().getTime();
		this.imageItemHideForBrowser.set(true);
		this.imageItemHideForApp.set(true);
		if (!this.more.get()) {
			this.row_touch.set(event.bindingContext.$object);
			if (event.bindingContext.$object.val("fIsOwnSet")) {
				this.isAttentionBtnShow.set(false);
			} else {
				this.isAttentionBtnShow.set(true);
			}
			var msgPopMenu = this.comp('msgPopMenu');
			msgPopMenu.set('anchor', event.target);
			var fileUrl = event.bindingContext.$object.val("fileUrl");
			msgPopMenu._fContent = event.bindingContext.$object.val("fMessageText");
			msgPopMenu._fContentHtml = event.bindingContext.$object.val("fContent");
			msgPopMenu._fStyle = event.bindingContext.$object.val("fStyle");
			this.msgType.set(msgPopMenu._fStyle);
			msgPopMenu._fileUrl = fileUrl;
			msgPopMenu._fileName = event.bindingContext.$object.val("fFileName");
			msgPopMenu._messageId = event.bindingContext.$object.val("fID");
			msgPopMenu._fSender = event.bindingContext.$object.val("fSender");
			msgPopMenu._fSenderPID = event.bindingContext.$object.val("fSenderPID");
			msgPopMenu._row = event.bindingContext.$object;
			this.time = 0;
			var self = this;
			if (msgPopMenu._fStyle === "text") {
				this.isText.set(false);
			} else {
				this.isText.set(true);
			}
			if (msgPopMenu._fStyle === "audio") {
				this.isAudio.set(true);
			} else {
				this.isAudio.set(false);
			}
			if(msgPopMenu._fStyle === "photo"&&justep.Browser.isX5App){
				self.imageItemHideForApp.set(false);
			}
			this.timer = window.setTimeout(function() {
				msgPopMenu.show();
			}, 1000);
		}
		
	};

	// 删除当前消息
	Model.prototype.messageDialogYes = function(event) {
		var rid = this.comp('msgPopMenu')._messageId;
		if (this.params !== undefined) {
			var peer = this.curPeer;
			IM.deleteMessage(peer, rid);
		}
	};
	// 弹出提示信息
	Model.prototype.rightClick = function(event) {
		var self = this;
		self.imageItemHideForBrowser.set(true);
		self.imageItemHideForApp.set(true);
		if (event.button == 2 && !this.more.get()) {
			if (event.bindingContext.$object.val("fIsOwnSet")) {
				this.isAttentionBtnShow.set(false);
			} else {
				this.isAttentionBtnShow.set(true);
			}
			var msgPopMenu = this.comp("msgPopMenu");
			var fileUrl = event.bindingContext.$object.val("fileUrl");
			msgPopMenu._fContent = event.bindingContext.$object.val("fMessageText");
			msgPopMenu._fContentHtml = event.bindingContext.$object.val("fContent");
			msgPopMenu._fStyle = event.bindingContext.$object.val("fStyle");
			msgPopMenu._fileUrl = fileUrl;
			msgPopMenu._fileName = event.bindingContext.$object.val("fFileName");
			msgPopMenu._messageId = event.bindingContext.$object.val("fID");
			msgPopMenu._fSender = event.bindingContext.$object.val("fSender");
			msgPopMenu._fSenderPID = event.bindingContext.$object.val("fSenderPID");
			msgPopMenu._row = event.bindingContext.$object;
			msgPopMenu.set('anchor', event.target);
			if (msgPopMenu._fStyle === "text") {
				this.isText.set(false);
			} else {
				this.isText.set(true);
			}
			if (msgPopMenu._fStyle === "audio") {
				this.isAudio.set(true);
			} else {
				this.isAudio.set(false);
			}
			if(msgPopMenu._fStyle === "photo"&&!justep.Browser.isX5App){
				self.imageItemHideForBrowser.set(false);
			}
			setTimeout(function() {
				msgPopMenu.show();
			}, 0);
		}
	};

	// 删除消息
	Model.prototype.deleteMsgBtnClick = function(event) {
		if (this.params !== undefined) {
			this.comp("messageDialog").show({
				message : "删除消息？"
			});
		}
	};

	Model.prototype.touchMove = function(event) {
		this.touchMoved = true;
		this.clsTimer();
	};

	Model.prototype.clsTimer = function() {
		if (this.timer)
			window.clearTimeout(this.timer);
		this.timer = null;
	};

	Model.prototype.touchEnd = function(event) {
		if(event.target.tagName.toLowerCase() == "video"){
			var endTime = this.touchEndTime = new Date().getTime();
			var target = event.target;
			if(endTime - this.touchStartTime < 300 && this.touchMoved == false){
				if(target.paused){
					target.play();
				}else{
					target.pause();
				}
			}
		}
		this.clsTimer();
	};

	var getPhotos = function(data) {
		var rows = data.find([ "fStyle" ], [ "photo" ]);
		var photos = [];
		if (rows && rows.length > 0)
			for (var i = 0; i < rows.length; i++) {
				var url = rows[i].val("fileUrl");
				var option = rows[i].row["fOption"];// 特殊逻辑缓存在row上的扩展数据
				url && photos.push({
					url : url,
					option : option
				});
			}
		return photos;
	};

	Model.prototype.modelActive = function(event) {
		if(window.Keyboard && Keyboard.hideFormAccessoryBar){
				Keyboard.hideFormAccessoryBar(true);
		}
		var peer = this.curPeer;
		if (peer)
			IM.onConversationOpen(peer);
	};

	Model.prototype.modelInactive = function(event) {
		if(window.Keyboard && Keyboard.hideFormAccessoryBar){
			Keyboard.hideFormAccessoryBar(false);
		}
		var peer = this.curPeer;
		if (peer)
			IM.onConversationClosed(peer);
	};

	Model.prototype.closeOrCancelClick = function(event) {
		if(this.more.get()){
			this.cancelClick(event);
		}else{
			this.closeBtnClick(event);
		}
		
	};
	
	Model.prototype.closeBtnClick = function(event) {
		justep.Shell.showMainPage();
	};
	
	// 取消选中状态
	Model.prototype.cancelClick = function(event) {
		this.more.set(false);
		var type = this.curPeer.type;
		if (type === 'user') {
			$(this.getElementByXid('personal')).show();
		} else {
			$(this.getElementByXid('group')).show();
		}
		this.comp('messageData').each(function(params) {
			var row = params.row;
			row.val("fChecked", 0);
		});
		this.comp('router').removeRouteItem('more');
		this.comp('router').publishState();
	};

	Model.prototype.updateSendByEnterEnabled = function() {
		// 设置superInput的回车发送
		var superInput = this.comp('superinput');
		if (superInput) {
			superInput.set('isSendByEnterEnabled', IM.isSendByEnterEnabled());
		}
	};

	Model.prototype.modelParamsReceive = function(event) {
		this.updateSendByEnterEnabled();
	};

	Model.prototype.contactInfo = function(event) {
		justep.Shell.fireEvent('onContactInfoPage', {
			"contactId" : event.bindingContext.$object.val("fSenderPID")
		});
	};

	Model.prototype.msgListContentTouchend = function(event) {
		this.row_touch.set();
	};
	// 保存文件
	Model.prototype.saveBtnClick = function(event) {
		if (!this.more.get()) {
			var msgPopMenu = this.comp('msgPopMenu');
			var fileUrl = msgPopMenu._fileUrl;
			var fileName = msgPopMenu._fileName;
			fileApi.download(fileUrl, fileName);
		}
	};

	// 保存图片到相册
	Model.prototype.saveToAlbumBtnClick = function(event) {
		function getCacheDirectoryPath(fileName) {
			var os = cordova && cordova.file.cacheDirectory;
			var ext = cordova && cordova.file.externalCacheDirectory;
			var dirc = (ext) ? ext : (os ? os : "");
			return (dirc + fileName);
		}
		if (!this.more.get()) {
			var msgPopMenu = this.comp('msgPopMenu');
			var fileUrl = msgPopMenu._fileUrl;
			var fileName = msgPopMenu._fileName;
			var fullName = getCacheDirectoryPath(fileName);
			var ft = new FileTransfer();
			ft.download(fileUrl, fullName, function(entry) {
				ft.saveToAlbum(fullName, function(re) {
					plugins.toast.showLongBottom("图片:[" + fileName + "]已经保存到相册");
				});
			}, function(err) {
				plugins.toast.showShortBottom("图片:[" + fileName + "]保存失败");
			});
		}
	};

	Model.prototype._getHtmlText = function(str) {
		var ret = str;
		try {
			var $div = $("<div/>");
			ret = $div.html(ret).text();
			$div.remove();
		} catch (e) {
		}
		return ret;
	};

	// 复制功能
	Model.prototype.copyBtnClick = function(event) {
		var msgPopMenu = this.comp('msgPopMenu');
		if (msgPopMenu._fStyle === "text") {
			var text = this._getHtmlText(msgPopMenu._fContent);
			if (justep.Browser.isX5App) {
				cordova.plugins.clipboard.copy(text, function(evt) {
					justep.Util.hint("复制成功！");
				});
				return;
			}
		}
		justep.Util.hint("暂不支持复制文件");
	};
	Model.prototype.getContactListUrl = function() {
		return require.toUrl("./contactList.w");
	};
	// 转发
	Model.prototype.transmitBtnClick = function(event) {
		var mspPopMenu = this.comp("msgPopMenu");
		var text = mspPopMenu._fileUrl ? mspPopMenu._fileUrl : mspPopMenu._fContent;
		this.comp("transmitWindowDialog").set({
			src : this.getContactListUrl(),// require.toUrl("./contactList.w"),
			title : '选择转发人'
		});
		this.comp("transmitWindowDialog").open({
			params : {
				fromDialog : true,
				data : {
					callback : justep.Util.bindModelFn(this, function(option) {
						IM.sendTextMessage(option.peer, text);
						if (option.count == option.index) {
							justep.Util.hint('转发成功');
						}
					})
				}
			}
		});
	};
	// 关注
	Model.prototype.attentionBtnClick = function(event) {
		var msgPopMenu = this.comp('msgPopMenu');
		var option = {
			msgID : msgPopMenu._messageId,
			msgContent : msgPopMenu._fContentHtml,
			msgType : msgPopMenu._fStyle,
			msgFileUrl : msgPopMenu._fileUrl,
			dialogID : this.curPeer.id,
			dialogType : this.curPeer.type,
			dialogName : this.curPeer.type === "user" ? IM.getPersonByUID(this.curPeer.id).name : IM.getGroup(this.curPeer.id).name,
			dialogPID : this.curPeer.type === "user" ? IM.getPersonByUID(this.curPeer.id).id : "",
			senderID : IM.getPerson(msgPopMenu._fSenderPID).uid,
			senderName : msgPopMenu._fSender,
			senderPID : msgPopMenu._fSenderPID
		};
		var rid = this.comp('msgPopMenu')._messageId;
		IM.addLike(this.curPeer, rid, option);
	};
	// 取消关注
	Model.prototype.item12Click = function(event) {
		var rid = this.comp('msgPopMenu')._messageId;
		IM.removeLike(this.curPeer, rid);
	};
	// 关闭消息菜单
	Model.prototype.msgPopMenuHideClick = function(event) {
		if (justep.Browser.isIphone) {
			this.i++;
			if (this.i >= 2) {
				this.comp('msgPopMenu').hide();
				this.i = 0;
			} else {
				this.comp('msgPopMenu').show();
			}

		} else {
			this.comp('msgPopMenu').hide();
		}
	};

	Model.prototype.modelLoad = function(event) {
		var self = this;
		if(window.Keyboard && Keyboard.hideFormAccessoryBar){
			Keyboard.hideFormAccessoryBar(true);
		}
		document.addEventListener("deviceready", onDeviceReady, false);
		// 加载完成
		function onDeviceReady() {
			
		}
		justep.Shell.on('onSendByEnterEnabledChanged', this.updateSendByEnterEnabled, this);
	};
	// 预览文档
	Model.prototype.fileClickHandle = function(event) {
		if (event.button === 0) {
			var ctx = justep.Bind.contextFor(event.target);
			var fileUrl = ctx.$object.val("fileUrl");
			var fileName = ctx.$object.val("fFileName");
			if(electronApp.getIsInElectron()){
				fileApi.download(fileUrl, fileName);
			}else{
				fileApi.browse(fileUrl, fileName);
			}
		}
		return false;
	};

	// Model.prototype.getLinkDlgUrl = function() {
	// return require.toUrl('./link.w');
	// };

	Model.prototype.linkClickHandle = function(event) {
		var url = $(event.currentTarget).attr("href") || $(event.target).text();
		if (url && !(new RegExp("(?:(?:[a-z]+:)?//)", 'i')).test(url))
			url = "http://" + url;
		window.open(url, "_system");
		return false;
	};
	var quoteModel = function(sender, text) {
		return justep.String.format("[ {0}: {1} ] <br>———————————————<br>:", sender, text || "");
	};
	var aModel = function(sender) {
		return justep.String.format("@{0}: <br>", sender);
	};
	// 引用
	Model.prototype.quoteBtnClick = function(event) {
		var text = this.comp("msgPopMenu")._fContent;
		var sender = this.comp("msgPopMenu")._fSender;
		var value = this.comp("superinput").val();
		this.comp("superinput").val(quoteModel(sender, text) + value);
	};
	// @
	Model.prototype.aBtnClick = function(event) {
		var sender = this.comp("msgPopMenu")._fSender;
		var value = this.comp("superinput").val();
		this.comp("superinput").val(aModel(sender) + value);
	};

	Model.prototype.searchTextClick = function(event) {
		if (this.curPeer) {
			if (this.curPeer.type === "user") {
				justep.Shell.showPage("findAllText", {
					sId : IM.getCurrentPerson().uid,
					destId : this.curPeer.id,
					groupId : null
				});
			} else {
				justep.Shell.showPage("findAllText", {
					sId : null,
					destId : null,
					groupId : this.curPeer.id
				});
			}
		}
	};

	Model.prototype.searchDocClick = function(event) {
		if (this.curPeer) {
			if (this.curPeer.type === "user") {
				justep.Shell.showPage("searchDocument", {
					currentUserId : IM.getCurrentPerson().uid,
					sId : IM.getCurrentPerson().uid,
					destId : this.curPeer.id,
					groupId : null
				});
			} else {
				justep.Shell.showPage("searchDocument", {
					currentUserId : IM.getCurrentPerson().uid,
					sId : null,
					destId : null,
					groupId : this.curPeer.id
				});
			}
		}
	};
	// 更多
	Model.prototype.moreBtnClick = function(event) {
		$(this.getElementByXid('cancelMoreStateDiv')).removeClass('x-moreClass');
		$(this.getElementByXid('div18')).removeClass('x-moreClass');
		this.more.set(true);
		this.comp('router').addRouteItem('more');
		this.comp('router').publishState();
		this.comp('msgPopMenu')._row.val('fChecked', 1);
	};
	

	Model.prototype.mediaClick = function(event) {
		if (this.more.get()) {
			var row = event.bindingContext.$object;
			var fChecked = row.val('fChecked');
			if (fChecked === 0) {
				row.val('fChecked', 1);
			} else {
				row.val('fChecked', 0);
			}
		}
	};

	Model.prototype.optionBtnClick = function(event) {
		this.comp('optionPopMenu').show();
	};

	Model.prototype.optionTransmitBtnClick = function(event) {
		var self = this;
		this.comp("transmitWindowDialog").set({
			src : this.getContactListUrl(),
			title : '选择转发人'
		});
		this.comp("transmitWindowDialog").open({
			params : {
				fromDialog : true,
				data : {
					callback : justep.Util.bindModelFn(this, function(option) {
						var data = self.comp('messageData');
						var count = data.count();
						var index = 0;
						data.each(function(params) {
							index++;
							var row = params.row;
							if (row.val("fChecked") === 1&&row.val("fStyle")!=="audio") {
								IM.sendTextMessage(option.peer, row.val("fileUrl") ? row.val("fileUrl") : row.val("fMessageText"));
							}
						});
						if (option.count === option.index) {
							if (count === index) {
								data.each(function(params) {
									var row = params.row;
									row.val("fChecked", 0);
								});
							}
							justep.Util.hint('转发成功');
						}
					})
				}
			}
		});
	};

	Model.prototype.optionAttentionBtnClick = function(event) {
		var data = this.comp('messageData');
		var self = this;
		var count = data.count();
		var index = 0;
		data.each(function(params) {
			index++;
			var row = params.row;
			if (row.val("fChecked") === 1) {
				var option = {
					msgID : row.val('fID'),
					msgContent : row.val('fContent'),
					msgType : row.val('fStyle'),
					msgFileUrl : row.val('fileUrl'),
					dialogID : self.curPeer.id,
					dialogType : self.curPeer.type,
					dialogName : self.curPeer.type === "user" ? IM.getPersonByUID(self.curPeer.id).name : IM.getGroup(self.curPeer.id).name,
					dialogPID : self.curPeer.type === "user" ? IM.getPersonByUID(self.curPeer.id).id : "",
					senderID : IM.getPerson(row.val('fSenderPID')).uid,
					senderName : row.val('fSender'),
					senderPID : row.val('fSenderPID')
				};
				var rid = row.val('fID');
				if (!row.val('fIsOwnSet')) {
					IM.addLike(self.curPeer, rid, option);
				}
			}
		});
		if (count === index) {
			data.each(function(params) {
				var row = params.row;
				row.val("fChecked", 0);
			});
		}
	};

	Model.prototype.optionDelBtnClick = function(event) {
		var data = this.comp('messageData');
		var self = this;
		var count = data.count();
		var index = 0;
		justep.Util.confirm("删除选中的消息?", function() {
			data.each(function(params) {
				index++;
				var row = params.row;
				if (row.val("fChecked") === 1) {
					IM.deleteMessage(self.curPeer, row.val('fID'));
				}
			});
			if (count === index) {
				data.each(function(params) {
					var row = params.row;
					row.val('fChecked', 0);
				});
			}
		});
	};

	Model.prototype.loadMedia = function(event){
		function _loadMedia(element){
			if(element.readyState < 3 && (!element.retrytimes || element.retrytimes < 3)){
				element.retrytimes = element.retrytimes || 0;
				element.retrytimes++;
				element.load();
				setTimeout(function(){
					_loadMedia(element);
				},element.retrytimes == 1?2000:element.retrytimes == 2?5000:5000);
			}else if(element.readyState > 3 && element.retrytimes !== 0){
				element.retrytimes = 0;
			}
		}
		
		var msgList = this.comp('msgList');
		if(msgList && msgList.$domNode){
			var domNode = msgList.$domNode;
			var mediaLists = domNode.find('audio,video');
			mediaLists.each(function(index,element){
				_loadMedia(element);
			});
		}
	};
	
	Model.prototype.msgListAfterRender = function(event){
		function debounce(fn, wait,scope) {
			return function() {
				var args = arguments,
					later = function() {
						fn.__timeout = undefined;
						fn.apply( scope, args );
					};
				if(fn.__timeout ) {
					clearTimeout(fn.__timeout);
				}
				fn.__timeout = setTimeout( later, wait );
			};
		}
		debounce(this.loadMedia,500,this)();
	};

	return Model;
});