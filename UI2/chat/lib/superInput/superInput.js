/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	require("$UI/system/components/justep/common/res");
	require('css!./css/superInput').load();
	require('css!./css/emoji').load();
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-media");
	require("cordova!cordova-plugin-keyboard");
	var store = require('$UI/system/lib/base/store');
	var electronApp = require("../electron-app");
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Button = require("$UI/system/components/justep/button/button");
	var ScrollView = require("$UI/system/components/justep/scrollView/scrollView");

	var url = require.normalizeName("./superInput");
	var ComponentConfig = require("./superInput.config");

	var textInput_icon = 'iconfont icon-jianpan2';
	var emojiInput_icon = 'iconfont icon-biaoqing';
	var twemoji = require("./js/twemoji.amd");
	var emoji = require("./js/emoji");
	var Recorder = require("./lib/recorder");
	var emojiUrl = require.toUrl("./img/emoji/");
	var createTwemoji = function(contents, btnGroup) {
		if (!contents || !btnGroup)
			return;
		/*
		 * <div class="row grid"> <div class="col cell col-xs-2"> </div>
		 */
		var created = {};
		$.each(emoji, function(i, v) {
			if (!created[v.category]) {
				var xid = justep.UUID.createUUID();
				created[v.category] = {
					content : contents.add({
						xid : xid
					}),
					html : []
				};
				new Button({
					target : xid,
					label : v.category,
					'class' : 'btn btn-link',
					parentNode : btnGroup.domNode
				});
			}
			var ret = created[v.category].html;
			ret.push('<div class="col cell col-xs-2">');
			ret.push(v.value);
			ret.push('</div>');
		});
		$.each(created, function(n, v) {
			var s = '<div class="row grid">' + v.html.join("") + '</div>';
			var scrollView = new ScrollView({
				parentNode : v.content.domNode,
				recycleSelector : ".col.cell"
			});
			scrollView.$domNode.addClass('container-fluid');
			scrollView.$domNode.find('.x-scroll-content').html(s);
			twemojiParse(v.content.domNode, 36);
		});
		// contents.to(1);
	};

	var twemojiParse = function(what, size) {
		return twemoji.parse(what, {
			base : emojiUrl,
			size : size || 16
		});
	};

	var SuperInput = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			if(window.Keyboard && Keyboard.shrinkView){
				Keyboard.shrinkView(true);
			}
			
			this.callParent(options);
			this.eventNamespace = new Date().getTime() + "";
			this._isTextMode = false;
			this.isSendByEnterEnabled = true;
			this.maximumDuration = 60;
		},

		dispose : function() {
			$(window).off('.' + this.eventNamespace);
			if (this.resizeHandle)
				$(window).off('resize', this.resizeHandle);
			this.callParent();
		},

		// 动态创建组件
		buildTemplate : function(config) {
			// TODO
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'form-control';
			return "<input class='" + config['class'] + "' " + (config.style ? (" style='" + config.style + "' ") : "") + (config.xid ? (" xid='" + config.xid + "' ") : "") + " component='" + url
					+ "' " + " ></input>";
		},

		// 初始化
		doInit : function(value, bindingContext, allBindings) {
			this.callParent(value, bindingContext, allBindings);
			if (justep.Browser.isIphone) {
				this.addClass('iphone');
			}
			if (justep.Browser.isMobileFromUserAgent) {
				this._get$InputArea().height("58px");
			}
			this._bindEvent();
			this.fixWebkitBug();
		},

		fixWebkitBug : function() {
			if (!justep.Browser.isPCFromUserAgent) {
				this.$domNode.css('position', 'static');
				this.$domNode.offset();
				this.$domNode.css('position', 'fixed');
			}
		},
		doUpdate : function(value, bindingContext, allBindings) {
			this.callParent(value, bindingContext, allBindings);
		},
		propertyChangedHandler : function(key, oldVal, value) {
			this.callParent(key, oldVal, value);
		},
		_get$Content : function() {
			return this.$domNode.find('.x-input-content');
		},
		_get$VoiceInfo : function() {
			return this.$domNode.find('.x-voice-info');
		},
		_get$Emoji : function() {
			return this.$domNode.find('.x-superinput-emoji');
		},
		_get$InputArea : function() {
			return this.$domNode.find('.x-superinput-area');
		},
		_get$Attachment : function() {
			return this.$domNode.find('.x-superinput-attachment');
		},
		_getBtnEmoji : function() {
			var model = this.getModel();
			return this._btnEmoji || (this._btnEmoji = model.comp(this.$domNode.find('.x-btn-emoji')[0]));
		},
		_bindEvent : function() {
			var model = this.getModel();
			var self = this;
			this.$content = this._get$Content();
			this.$emoji = this._get$Emoji();

			$(window).on('keyboardhide.' + this.eventNamespace, function() {
				if (self._isTextMode) {
					self.closePicker();// 关闭输入法
				}
			});

			// 点击功能其他区域关闭输入法
			self.$domNode.on('click', function(event) {
				event.stopPropagation();// 阻止向上冒泡
			});
			$(model.getRootNode()).on('click', function() {
				self.closePicker();// 关闭输入法
			});
			// 记录w的宽高
			var viewportHeight = $(window).height();
			var viewportWidth = $(window).width();
			self.resizeHandle = function() {
				var newviewportHeight = $(window).height();
				var newviewportWidth = $(window).width();
				var isKeyboardActiv = viewportHeight - newviewportHeight > 150 && viewportWidth == newviewportWidth;// 宽度不变，高度减小大于150
				var isKeyboardInactiv = viewportHeight - newviewportHeight < -150 && viewportWidth == newviewportWidth;// 宽度不变，高度增加大于150
				if (isKeyboardActiv) {
					store.set('keyboardDidShow',true);
					self._isTextMode = true;
					// $emoji.addClass('hide');
					self.inputRender();
					self._resetTop(true);
				} else if (isKeyboardInactiv && self._isTextMode) {
					store.set('keyboardDidShow',false);
					self._resetTop();
				}
				viewportHeight = $(window).height();
				viewportWidth = $(window).width();
			};
			// 计算键盘弹出高度 resize 比 keyboarddidhide/keyboardshow的时机更早 所以采用resize
			if ((justep.Browser.isAndroid && !justep.Browser.isYuanXin) || (justep.Browser.isIOS && justep.Browser.isX5App)) {
				$(window).on('resize', self.resizeHandle);
			}
			// 输入按钮显示控制
			this.$content.on('input', function(evt) {
				var range = self.getRange();
				if (range) {
					self._lastRange = range;
				}
				self.inputRender();
			}).on('keydown', function(event) {
				if(self.isSendByEnterEnabled){
					if (event.ctrlKey != true && 13 === event.keyCode) {
						self._doSend();
						return false;
					}else if(event.ctrlKey == true && 13 === event.keyCode){
						self.$content.html(self.$content.html()+'<br><br>');
						if (typeof window.getSelection != "undefined"
			                && typeof document.createRange != "undefined") {
				            var range = document.createRange();
				            range.selectNodeContents(self.$content.get(0));
				            range.collapse(false);
				            var sel = window.getSelection();
				            sel.removeAllRanges();
				            sel.addRange(range);
				        } else if (typeof document.body.createTextRange != "undefined") {
				            var textRange = document.body.createTextRange();
				            textRange.moveToElementText(self.$content.get(0));
				            textRange.collapse(false);
				            textRange.select();
				        }
						return false;
					}
				}else{
					if (event.ctrlKey == true && 13 === event.keyCode) {
						self._doSend();
						return false;
					}
				}
				
			}).on('focus', function() {
				if (justep.Browser.isIOS && !justep.Browser.isX5App) {
					self._resetTop(true);
				}
				if (justep.Browser.isYuanXin) {
					self._isTextMode = true;
					self._resetTop(true);
				}
				if (!self._lastRange) {
					setTimeout(function() {
						if(window.getSelection().rangeCount > 0){
							self._lastRange = window.getSelection().getRangeAt(0);
						}
					}, 300);
				}
			}).on('blur', function(event) {
				self.$content.removeClass('active');
				/*
				 * if (justep.Browser.isYuanXin) { if(self._isTextMode){
				 * self.closePicker();// 关闭输入法 } }
				 */
			}).on('click', function(event) {
				if (justep.Browser.isIOS) {
					if ($(event.target).is('img')) {
						self.cursorTo(event.target);
					}
					var range = self.getRange();
					if (range) {
						self._lastRange = range;
					}
					if (!self._isTextMode) {
						self.changeInputMode(true);
					}
					event.preventDefault();
				} else if (justep.Browser.isAndroid) {
					if ($(event.target).is('img')) {
						self.cursorTo(event.target);
					}
					var range = self.getRange();
					if (range) {
						self._lastRange = range;
					}
				}
			});
			// 表情和普通输入法切换
			$('.x-btn-emoji').on('click', function(e) {
				if(self.$domNode.hasClass('x-superinput-pc')){
					if(self.$emoji.css('display') == "none"){
						self.$emoji.css('display',"flex");
					}else{
						self.$emoji.toggle();
					}
					var model = self.getModel();
					var contents = model.comp(self.$emoji.find('.x-contents')[0]);
					contents.to(1);
				}else{
					var btnEmoji = self._getBtnEmoji();
					if (btnEmoji) {
						self.changeInputMode(!self._isTextMode);
					}
					return false;
				}
			});
			
			
			
			$('.x-btn-attachment').on('click', function(e) {
				if(self.$domNode.hasClass('x-superinput-pc')){
					if(self.$emoji.css('display') == "none"){
						self.$emoji.css('display',"flex");
					}else{
						self.$emoji.toggle();
					}
					var model = self.getModel();
					var contents = model.comp(self.$emoji.find('.x-contents')[0]);
					contents.to(0);
				}else{
					self.changeInputMode(false,false,true);
					return false;
				}
				
			});

			// 创建表情区
			var callback = function() {
				var contents = model.comp(self.$emoji.find('.x-contents')[0]);
				var btnGroup = model.comp(self.$emoji.find('.btn-group')[0]);
				createTwemoji(contents, btnGroup);
			};
			if (justep.ModelBase.MODEL_STATUS_CONSTRUCT_DONE > model.getStatus())
				model.on(justep.ModelBase.MODEL_CONSTRUCT_DONE_EVENT, callback);
			else
				justep.Bind.utils.domNodeReady.addReadyCallback(this.domNode, callback);

			// 绑定选择表情
			self.$emoji.on('click', '.emoji', function(evt) {
				self.copyEmoji($(evt.target));
			});
			this.$domNode.find('.x-btn-send').on('click', this._doSend.bind(this));
			this.$domNode.find('.x-btn-voice').on('touchstart mousedown', this.startRecVoice.bind(this)).on('touchend mouseup', this.stopRecVoice.bind(this));
			this.$domNode.find('.x-btn-prScrn').on('click', this._prScrn.bind(this));
		},

		changeInputMode : function(isTextInput, disableContentIndexChange,isToAttachments) {
			if (isTextInput) {
				// $emoji.addClass('hide');
				this._isTextMode = true;
				this.$content.focus();
				this.cursorToLastRang();
			} else {
				if (!disableContentIndexChange) {
					var model = this.getModel();
					var contents = model.comp(this.$emoji.find('.x-contents')[0]);
					var activeContentIndex = contents.active;
					if(isToAttachments){
						if (contents.getLength() > 0) {
							contents.to(0);
						} else {
							setTimeout(function() {
								contents.to(0);
							}, 300);
						}
					}else{
						if (activeContentIndex < 1) {
							if (contents.getLength() > 1) {
								contents.to(1);
							} else {
								setTimeout(function() {
									contents.to(1);
								}, 300);
							}
						}
					}
					
				}
				if(this._isTextMode == false && !this.$emoji.hasClass('x-emoji-hide')){
				}else{
					//ios中因为键盘有动画 不出发resize事件 所以切换表情时候 获取的高度还是有键盘的时候的高度
					store.set('keyboardDidShow',false);
					this.$emoji.removeClass('x-emoji-hide');
					this._isTextMode = false;
					this._resetTop(true);
				}
			}
			this.inputRender();
		},

		_resetTop : function(isInputActiv) {
			var self = this;
			if (isInputActiv) {
				var nh = $(window).innerHeight();
				var emojiInputAreaHeight = this.$domNode.outerHeight();
				var keyboardHeight = store.get('keyboardHeight');
				if (justep.Browser.isIOS && justep.Browser.isX5App) {
					if (emojiInputAreaHeight > 200) {
						/**
						 * 表情计算  表情切换附件才会进入的逻辑 ，
						 * 从输入法到表情本应走这个逻辑，但是因为键盘缩下去有动画,为了高性能调整布局
						 * 表情弹出走的是键盘弹出的逻辑，此时emojiInputAreaHeight 为0 
						 * nh高度为有键盘的时候的高度
						 */
						this.$domNode.css('top', nh - keyboardHeight - 58);
						this.$emoji.height(keyboardHeight + 58);
						this.fireEvent('onResize', {
							source : this,
							height : keyboardHeight + 58,
							isSuperInputPop : true
						});
						return;	
					}else{
						//键盘弹出计算
						setTimeout(function(){
							//某些神奇的输入法改变高度有2次变化，比如科大讯飞
							var newNh = $(window).innerHeight();
							if(newNh < nh){
								self._resetTop(true);
							}
						},100);
						this.$domNode.css('top', nh - 58);
						this.$emoji.height(keyboardHeight + 58);
						window.requestAnimationFrame(function(){
							self.$domNode.css("display","none");
							self.$domNode.offset();
							self.$domNode.css("display","");
							self.$domNode.offset();
							try{
								var selection = window.getSelection();
								selection && selection.collapseToEnd && selection.collapseToEnd();
							}catch(e){};
						});
						this.fireEvent('onResize', {
							source : this,
							height : 58,
							isSuperInputPop : true
						});
						return;
					}
				}else if (justep.Browser.isIOS) {
					if (keyboardHeight) {
						if (justep.Browser.isWeChat || justep.Browser.isStandalone) {
							// 在standalone或者wechat模式 没有下工具栏遮挡 同时键盘有access bar 所以修正高度为45
							this.$domNode.css('top', nh - keyboardHeight - 58 - 45);
							this.$emoji.height(keyboardHeight + 45);
							this.fireEvent('onResize', {
								source : this,
								height : keyboardHeight + 58 + 45,
								isSuperInputPop : true
							});

						} else {
							this.$domNode.css('top', nh - keyboardHeight - 58);
							this.$emoji.height(keyboardHeight);
							this.fireEvent('onResize', {
								source : this,
								height : keyboardHeight + 58,
								isSuperInputPop : true
							});
						}
						$(window).scrollTop(0);
						setTimeout(function() {
							$(window).scrollTop(0);
						}, 0);
						return;
					}
				} else if (justep.Browser.isAndroid) {
					if (justep.Browser.isYuanXin) {
						keyboardHeight = 260;
					}
					var emojiInputAreaHeight = this.$domNode.outerHeight();
					if (emojiInputAreaHeight > 200) {
						// 表情top计算
						if (keyboardHeight) {
							// 已知键盘高度
							this.$domNode.css('top', nh - keyboardHeight - 58);
							this.$emoji.height(keyboardHeight);
							this.fireEvent('onResize', {
								source : this,
								height : keyboardHeight + 58,
								isSuperInputPop : true
							});
							return;
						} else {
							this.$domNode.css('top', nh - emojiInputAreaHeight);
						}
					} else {
						// 键盘弹出top计算
						if (keyboardHeight) {
							this.$emoji.height(keyboardHeight);
						}
						if (this._isTextMode) {
							if (justep.Browser.isYuanXin) {
								this.$domNode.css('top', nh - keyboardHeight - 58);
								this.fireEvent('onResize', {
									source : this,
									height : keyboardHeight + 58,
									isSuperInputPop : true
								});
								return;
							} else {
								this.fireEvent('onResize', {
									source : this,
									height : 58,
									isSuperInputPop : true
								});
							}
						} else {
							setTimeout(function() {
								if (keyboardHeight) {
									self.fireEvent('onResize', {
										source : self,
										height : keyboardHeight + 58,
										isSuperInputPop : true
									});
								} else {
									self.fireEvent('onResize', {
										source : self,
										height : 290 + 58,
										isSuperInputPop : true
									});
								}
							}, 0);
						}
						this.$domNode.css('top', nh - 58);
						return;
					}
				} else {
					this.$domNode.css('top', nh - this.$domNode.outerHeight());
					self.fireEvent('onResize', {
						source : self,
						height : 290 + 58,
						isSuperInputPop : true
					});
				}
			} else {
				this.$domNode.css('top', 'auto');
			}
			this.fireEvent('onResize', {
				source : this,
				height : this.$domNode.outerHeight(),
				isSuperInputPop : isInputActiv ? true : false
			});
		},
		_doSend : function(event) {
			var self = this;
			var eData = {
				source : this,
				value : this.val()
			};
			
			if (this._isTextMode && (store.get('keyboardDidShow') || justep.Browser.isYuanXin)) {
				if(justep.Browser.isAndroid){
					self.$content.focus();
				}else{
					//TODO 插件支持更多特性
					/*$(window).one('keyboardDidHide',function(){
						self.$content.focus();
					});*/
				}
			};
			this.fireEvent('onSend', eData);
		},
		_prScrn : function() {
			var state = electronApp.sendSyncMessage("screenCapture");
			if (state) {
				this.fireEvent("screenCapture", {
					source : this
				});
			}
		},
		
		copyEmoji : function(emoji) {
			var alt = emoji.attr('image-alt');
			var src = emoji.attr('image-src');
			this.pasteAtCursor('<img class="emoji" src="' + src + '" alt="' + alt + '" width="16px" height="16px">');
			this.inputRender();
		},
		getRange : function() {
			if (window.getSelection) {
				var sel = window.getSelection();
				if (sel.getRangeAt && sel.rangeCount)
					return sel.getRangeAt(0);
			}
		},
		cursorTo : function(node) {
			if (node) {
				var range = document.createRange();
				range.setStartAfter(node);
				range.collapse(true);
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			}
		},
		cursorToEnd : function(node) {
			if (node)
				this.cursorTo(node.lastChild);
		},
		cursorToLastRang : function() {
			var range = this._lastRange;
			if (window.getSelection && range) {
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			}
		},
		pasteAtCursor : function(text) {
			var range = this._lastRange;
			if (!range) {
				if (!justep.Browser.isYuanXin) {
					this.$content.focus();
					this.$content.blur();
					range = this.getRange();
				}
			}
			if (window.getSelection && range) {
				var el = document.createElement('div');
				el.innerHTML = text;
				var frag = document.createDocumentFragment(), node, lastNode;

				while ((node = el.firstChild)) {
					lastNode = frag.appendChild(node);
				}

				range.deleteContents();
				range.insertNode(frag);
				if (lastNode) {
					var sel = window.getSelection();
					range = range.cloneRange();
					range.setStartAfter(lastNode);
					range.collapse();
					if (justep.Browser.isAndroid) {
						sel.removeAllRanges();
						sel.addRange(range);
					}
					if (!justep.Browser.isYuanXin) {
						this.$content.blur();
					}
					this._lastRange = range;
				}
			}
		},
		inputRender : function() {
			var val = this.$content.html();
			var iosInput = justep.Browser.isIOS && val === "<br>";
			if (val && !iosInput) {
				this.$domNode.find('.x-btn-send').removeClass('hide');
				this.$domNode.find('.x-btn-voice').addClass('hide');
			} else {
				this.$domNode.find('.x-btn-voice').removeClass('hide');
				this.$domNode.find('.x-btn-send').addClass('hide');
			}
			var btnEmoji = this._getBtnEmoji();
			if (!this._isTextMode) {
				this.$content.addClass('active');
				btnEmoji && btnEmoji.set('icon', textInput_icon);
			} else {
				btnEmoji && btnEmoji.set('icon', emojiInput_icon);
			}
			
			if(this.$domNode.hasClass('x-superinput-pc')){
				btnEmoji && btnEmoji.set('icon', emojiInput_icon);
			}
		},
		closePicker : function() {
			var eventData = {
				source : this,
				cancel : false
			};
			this.fireEvent('onClosePicker', eventData);
			if (eventData.cancel) {
				return;
			}
			var sourceHeight = this.$emoji.height();
			var _oldTextMode = this._isTextMode;
			this.$content.blur();
			this.$domNode.css('top', 'auto');
			this.$emoji.addClass('x-emoji-hide');

			this._isTextMode = false;
			this.inputRender();
			// var $Attachment = this._get$Attachment();
			// $Attachment.addClass('hide');
			if (sourceHeight > 200 || _oldTextMode === true) {
				this.fireEvent('onResize', {
					source : this,
					height : 58,
					isSuperInputPop : false
				});
			}
		},
		showVoiceInfo : function(b) {
			var $VoiceInfo = this._get$VoiceInfo();
			this.$content[b ? 'addClass' : 'removeClass']('hide');
			$VoiceInfo[b ? 'removeClass' : 'addClass']('hide');
		},
		setVoiceRecTime : function(len) {
			this.$domNode.find('.x-voice-recording-time').text(len);
		},
		createRecorder : function() {
			var deferred = $.Deferred();
			var _recorder = new Recorder({
				encoderPath : require.toUrl("./lib/oggopusEncoder.js")
			// monitorGain: 0,
			// numberOfChannels: 1,
			// bitRate: 48000,
			// encoderSampleRate: 48000
			});
			if (Recorder.isRecordingSupported()) {
				var self = this;
				_recorder.addEventListener("streamReady", function() {
					deferred.resolve(_recorder);
				});
				_recorder.addEventListener("streamError", function(error) {
					switch (error.code || error.name) {
					case 'PERMISSION_DENIED':
					case 'PermissionDeniedError':
						throw justep.Error.create('用户拒绝提供信息。');
					case 'NOT_SUPPORTED_ERROR':
					case 'NotSupportedError':
						throw justep.Error.create('浏览器不支持硬件设备。');
					case 'MANDATORY_UNSATISFIED_ERROR':
					case 'MandatoryUnsatisfiedError':
						throw justep.Error.create('无法发现指定的硬件设备。');
					default:
						throw justep.Error.create('无法打开麦克风。异常信息:' + (error.code || error.name));
					}

				});
				_recorder.addEventListener("duration", function(e) {
					self.setVoiceRecTime(e.detail.toFixed(2) + "秒");
					if (e.detail >= self.maximumDuration) {
						self.stopRecVoice();
					}
				});
				_recorder.addEventListener("dataAvailable", function(e) {
					if (!self._recordCancel) {
						var eData = {
							source : self,
							recorder : self.recorder,
							voice : e.detail
						};
						self.fireEvent('onFinishRecVoice', eData);
					}
				});
				_recorder.initStream();
			} else
				deferred.reject("不支持录音!");
			return deferred.promise();
		},
		// startRecVoice : function() {
		// var self = this;
		// self.stopRecVoice();
		// self.createRecorder().then(function(rec){
		// self._recordCancel = false;
		// self.recorder = rec;
		// self.recorder.start();
		// self.showVoiceInfo(true);
		// self._recording = true;
		// var eData = {
		// source : self
		// };
		// self.fireEvent('onStartRecVoice', eData);
		// });
		//			
		// return false;
		// },

		getMediaStorePath : function() {
			var ios = cordova && cordova.file.cacheDirectory;
			var ext = cordova && cordova.file.externalCacheDirectory;
			var dirc = (ext) ? ext : (ios ? ios : "");
			return dirc;
		},

		startRecVoice : function(event) {
			var self = this;
			if (!self._recording) {
				this.startRecordingTime = new Date().getTime();
				if (justep.Browser.isX5App) {
					self.fileName = justep.Date.toString(new Date(), "yyyyMMddhhmmss") + ".wav";// cordova.file.externalRootDirectory+
					self.fileName = self.getMediaStorePath() + self.fileName;
					window.requestAnimationFrame(function(){
						self.mediaRec = new Media(self.fileName, function(a) {
							console.log(a);
						}, function(err) {
							throw justep.Error.create(err);
						});
						self.mediaRec.startRecord();
						self.showVoiceInfo(true);
						self._recording = true;
						var eData = {
							source : self
						};
						self.fireEvent('onStartRecVoice', eData);
					});
				} else {
					Recorder.get(function(rec) {
						self.recorder = rec;
						rec.start();
						self.showVoiceInfo(true);
						self._recording = true;
						var eData = {
							source : self
						};
						self.fireEvent('onStartRecVoice', eData);
					});
				}
			}
			return false;
		},

		// stopRecVoice : function() {
		// this.showVoiceInfo(false);
		// if (this._recording) {
		// this._recording = false;
		// this.recorder.stop();
		// }
		// return false;
		// },
		getFileData : function(url) {
			var deferred = $.Deferred();
			var gotFileEntry = function(fileEntry) {
				fileEntry.file(gotFile, fail);
			};
			var gotFS = function(fileSystem) {
				fileSystem.root.getFile(url, {
					create : true,
					exclusive : false
				}, gotFileEntry, fail);
			};

			var gotFile = function(file) {
				/* deferred.resolve(file); */
				var reader = new FileReader();
				reader.onload = function(e) {
					deferred.resolve(new Blob([ this.result ], {
						type : 'audio/wav'
					}));
				};
				reader.readAsArrayBuffer(file);

			};
			var fail = function() {

			};
			window.resolveLocalFileSystemURI(url, gotFileEntry, fail);
			return deferred.promise();
		},

		stopRecVoice : function(event) {
			if(this._recording){
				var changedTouches = event.originalEvent.changedTouches;
				var threshold = window.screen.width - 50;
				if(changedTouches && changedTouches[0].clientX < threshold){
					this.cancelRecVoice(event);
					return false;
				}
				
				var stopRecordingTime = new Date().getTime();
				if(stopRecordingTime - this.startRecordingTime < 1000){
					justep.Util.hint("说话时间太短！");
					this.cancelRecVoice(event);
					return false;
				}
			}else{
				return;
			}
			var self = this;
			window.requestAnimationFrame(function(){
				if (self._recording) {
					self.showVoiceInfo(false);
					if (justep.Browser.isX5App) {
						self.mediaRec.stopRecord();
						self.getFileData(self.fileName).then(function(voice) {
							self._recording = false;
							var eData = {
								source : self,
								recorder : self.mediaRec,
								voice : voice
							};
							self.fireEvent('onFinishRecVoice', eData);
						});
					} else {
						self.recorder.stop();
						self._recording = false;
						var eData = {
							source : self,
							recorder : self.recorder,
							voice : self.recorder.getBlob()
						};
						self.fireEvent('onFinishRecVoice', eData);
					}
				}
			});
			return false;
		},
		cancelRecVoice : function() {
			this.showVoiceInfo(false);
			if (this._recording) {
				if (justep.Browser.isX5App) {
					this.mediaRec.stopRecord();
				}else {
					this.recorder.stop();
				}
				this._recording = false;
				this._recordCancel = true;
				var eData = {
					source : this
				};
				this.fireEvent('onCancelRecVoice', eData);
				return false;
			}
		},
		val : function(v) {
			if (arguments.length === 0) {
				var temp = this.$content.clone();
				temp.find('img').replaceWith(function() {
					return this.alt;
				});
				var ret = temp.html();
				temp.remove();
				return ret;
			}
			this.$content.html(twemojiParse(v, 16));
			this.inputRender();
		},
		clear : function() {
			this.$content.empty();
			this.inputRender();
		}
	});

	SuperInput.emojiParse = twemojiParse;
	justep.Component.register(url, SuperInput);
	return SuperInput;
});