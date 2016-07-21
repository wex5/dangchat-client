define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("../../base/js/im");
	var Clipboard = require("../../lib/clipboard.min");
	var Model = function() {
		this.callParent();
		this.$sendByEnter = justep.Bind.observable(IM.isSendByEnterEnabled());
		this.on("onShowImg", function(event) {
			if (event.items instanceof Array)
				$.each(event.items, function(i, item) {
					if (item.w && item.h) {
						item.w *= 2;
						item.h *= 2;
					}
				});
		});
		
		
		
	};

	var createClipboard = function(node, textFn) {
		var clipboard = new Clipboard(node, {
			text : textFn
		});
		return clipboard;
	};

	Model.prototype.modelLoad = function(event) {
		this.callParent(event);
		
		var msgPopMenu = this.comp('msgPopMenu');
		var self = this;
		this.clipboard = createClipboard(this.getElementByXid('copyBtn'), function() {
			return self._getHtmlText(msgPopMenu._fContent);
		});
	};
	
	Model.prototype.updateSendByEnterEnabled = function() {
		this.callParent();
		this.$sendByEnter.set(IM.isSendByEnterEnabled());
	};
	
	
	Model.prototype.modelModelConstructDone = function(event) {
		this.callParent(event);
		var self = this;
		this.comp('superinput').on("screenCapture",function(event){
			event.source.$content.focus();
			document.execCommand("paste");
		});
		this.comp('superinput').changeInputMode(false,false);
		this.comp('superinput').on('onClosePicker',function(event){
			event.cancel = true;
		});
	};

	Model.prototype.modelUnLoad = function(event) {
		this.callParent(event);
		if (this.clipboard)
			this.clipboard.destroy();
	};

	// Model.prototype.getLinkDlgUrl = function() {
	// return require.toUrl('./link.w');
	// };

	Model.prototype.showPerson = function(event) {
		this.comp("windowDialog").set({
			src : require.toUrl("./contact.w"),
			title : '联系人信息'
		});
		this.comp("windowDialog").open({
			params : {
				"contactId" : IM.getPersonByUID(this.curPeer.id).id,
				"formDilog" : true
			}
		});
	};
	
	
	Model.prototype.showClipboardImage = function(img) {
		this.comp("showClipboardImageDlg").set({
			src : require.toUrl("./showClipboardImage.w"),
			title : '剪切板图片'
		});
		this.comp("showClipboardImageDlg").open({
			params : {
				img : img,
				id : this.curPeer.id,
				type : this.curPeer.type
			}
		});
	};

	Model.prototype.groupInfoBtn = function(event) {
		this.comp("windowDialog").set({
			src : require.toUrl("./group.w"),
			title : '群组信息'
		});
		this.comp("windowDialog").open({
			params : {
				id : this.curPeer.id,
				type : this.curPeer.type,
				formDilog : true
			}
		});
	};

	Model.prototype.contactInfo = function(event) {
		this.comp("windowDialog").set({
			src : require.toUrl("./contact.w"),
			title : '联系人信息'
		});
		this.comp("windowDialog").open({
			params : {
				"contactId" : event.bindingContext.$object.val("fSenderPID"),
				"type":this.curPeer.type,
				"formDilog" : true
			}
		});
	};

	// 复制功能
	Model.prototype.copyBtnClick = function(event) {

	};

	// 转发
	Model.prototype.transmitBtnClick = function(event) {
		var mspPopMenu = this.comp("msgPopMenu");
		var text = mspPopMenu._fileUrl ? mspPopMenu._fileUrl : mspPopMenu._fContent;
		this.comp("transmitWindowDialog").set({
			src : require.toUrl("./contactList.w"),
			title : '选择转发人',
			status : 'normal'
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

	Model.prototype.searchTextClick = function(event) {
		this.comp("windowDialog").set({
			src : require.toUrl("./findAllText.w"),
			title : '搜索聊天信息'
		});
		if (this.curPeer.type === "user") {
			this.comp("windowDialog").open({
				params : {
					sId : IM.getCurrentPerson().uid,
					destId : this.curPeer.id,
					groupId : 0
				}
			});
		} else {
			this.comp("windowDialog").open({
				params : {
					sId : 0,
					destId : 0,
					groupId : this.curPeer.id
				}
			});
		}
	};

	Model.prototype.searchDocClick = function(event) {
		this.comp("windowDialog").set({
			src : require.toUrl("./searchDocument.w"),
			title : '历史文档'
		});
		if (this.curPeer) {
			if (this.curPeer.type === "user") {
				this.comp("windowDialog").open({
					params : {
						currentUserId : IM.getCurrentPerson().uid,
						sId : IM.getCurrentPerson().uid,
						destId : this.curPeer.id,
						groupId : null
					}
				});
			} else {
				this.comp("windowDialog").open({
					params : {
						currentUserId : IM.getCurrentPerson().uid,
						sId : null,
						destId : null,
						groupId : this.curPeer.id
					}
				});
			}
		}
	};
	Model.prototype.optionTransmitBtnClick = function(event) {
		var self = this;
		this.comp("transmitWindowDialog").set({
			src : require.toUrl("./contactList.w"),
			title : '选择转发人',
			status : 'normal'
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

	Model.prototype.addMoreMsgClick = function(event){
		this.msgScrollViewPullDown();
	};

	return Model;
});