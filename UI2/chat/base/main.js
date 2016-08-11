define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var SuperInput = require("../lib/superInput/superInput");
	var Utils = require("../lib/utils");
	var IM = require("./js/im");
	var store = require('$UI/system/lib/base/store');

	var maxMsgPage = 9;

	var Model = function() {
		this.callParent();
		this.dialogs = {}; // 会话列表
		this.messagePages = [];
		this.time = 0;
		this.timer = null;
		this.i = 0;
		this.offline = justep.Bind.observable(false);
		this.loginActorDfd;
	};
	
	Model.prototype.getMessageUrl = function(){
		return require.toUrl('./message.w');
	};
	
	// 图片路径转换
	Model.prototype.getImageUrl = function(url) {
		if (url) {
			return require.toUrl(url);
		} else {
			return "";
		}
	};

	Model.prototype.init = function() {
		var self = this;
		var rows = store.get("chat_dialogData");
		var cUid = IM.getCurrentPersonID();
		var sUid = store.get("chat_uid");
		if (cUid == sUid && rows) {
			this.comp("dialogData").loadData({
				rows : rows
			});
		}
		store.set("chat_uid", cUid);
		
		this.loginActorDfd = IM.loginActor();
		this.loginActorDfd.done(function() {
			justep.Shell.fireEvent('actorLongined');
			self.initEvent();
			var uid = IM.getCurrentPerson().uid;
			$(document).on('resume', function() {
				IM.updateClientState("-1,"+uid+",1");
			});
			$(document).on('pause', function() {
				IM.updateClientState("-1,"+uid+",0");
			});
		});
	};
	
	Model.prototype.getRowCallback = function(item,row) {
		var person = item.peer.peer.type === "user" ? IM.getPersonByUID(item.peer.peer.id) : {};
		var nickName = item.peer.peer.type === "user" ? person.name || item.peer.title : item.peer.title;
		var img = item.peer.peer.type === "user" ? person.avatar : item.peer.avatar ? item.peer.avatar : IM.getGroupDefaultIcon();
		if(row){
			row.val('fID', item.peer.peer.id);
			row.val('fType', item.peer.peer.type);
			row.val('fNickName', nickName);
			row.val('fCounter', item.counter);
			row.val('fImg', img);
			row.val('fLatestChat', SuperInput.emojiParse(Utils.getLatestChat(item)));
			row.val('fLatestChatDate', Utils.getDate(item.date));
		}else{
			row = {
				fID : item.peer.peer.id,
				fType : item.peer.peer.type,
				fNickName : nickName,
				fCounter : item.counter,
				fImg : item.peer.peer.type === "user" ? person.avatar : item.peer.avatar ? item.peer.avatar : IM.getGroupDefaultIcon(),
				fLatestChat : SuperInput.emojiParse(Utils.getLatestChat(item)),
				fLatestChatDate : Utils.getDate(item.date)
			};
		}
		return row;
	};
	
	Model.prototype.loadDialogs = function() {
		var self = this;
		// var showNotification = false;
		IM.bindDialogs(function(dialogs) {
			if(self.loadDialogsTimeoutHandle) 
			window.clearTimeout(self.loadDialogsTimeoutHandle);
			self.loadDialogsTimeoutHandle = setTimeout(function(){
				self.loadDialogsTimeoutHandle = null;
				var data = self.comp("dialogData");
				Utils.loadData(data, dialogs, self.getRowCallback);
				var rows = data.toJson({
					format : 'simple'
				});
				store.set("chat_dialogData", rows.rows);
			}, 500);
		});
	};
	
	Model.prototype.initEvent = function() {
		var self = this;
		window.addEventListener("online", function() {
			self.offline.set(false);
		}, true);
		window.addEventListener("offline", function() {
			self.offline.set(true);
		}, true);
		this.loadDialogs();
	};

	Model.prototype.modelModelConstruct = function(event) {
		if (IM.isLoggedIn()) {
			this.init();
		} else {
			justep.Shell.on('onLoggedIn', this.init, this);
		}
		justep.Shell.on("onSendMessagePage", function(event) {
			var id = event.id;
			var pid = event.pid;
			var type = event.type;
			this.showMessagePage(id, type, pid);
		}, this);
		var self = this;
		this.on('statusTap',function(){
			self.comp('scrollView1').scrollTo(0);
		});
	};

	Model.prototype.showMessagePage = function(fid, type, pid) {
		// 缓存一定数量的message页
		var self = this, url;
		var ourl = new justep.URL(self.getMessageUrl());
		ourl.setParam('uid', fid || pid);
		url = ourl.toString();
		var dfd = $.Deferred();
		var promise = dfd.promise();
		if (self.messagePages.length >= maxMsgPage && self.messagePages.indexOf(url) < 0) {
			var closeUrl = self.messagePages.shift();
			justep.Shell.closePage(closeUrl).done(function(){
				dfd.resolve();
			});
		}else{
			dfd.resolve();
		}
		promise.done(function(){
			justep.Shell.showPage(url, {
				id : fid,
				pid : pid,
				type : type
			}).then(function() {
				if (self.messagePages.indexOf(url) < 0)
					self.messagePages.push(url);
			});
		});
		// var peer = type==='user' ? IM.getUserPeer(fid):IM.getGroupPeer(fid);
		
	};

	Model.prototype.showMenuPopOverBtnClick = function(event) {
		this.comp('menuPopOver').show();
	};

	Model.prototype.touchStart = function(event) {
		this._pos = {
				x : event.originalEvent.changedTouches[0].pageX,
				y : event.originalEvent.changedTouches[0].pageY
			};
			var self = this;
			var contactsMenu = this.comp('contactsMenu');
			var groupMenu = this.comp('groupMenu');
			contactsMenu._id = event.bindingContext.$object.val("fID");
			groupMenu._id = event.bindingContext.$object.val("fID");
			var type = event.bindingContext.$object.val("fType");
			this.timer = setTimeout(function() {
				if (type === "user") {
					contactsMenu.set('anchor', event.target);
					contactsMenu.show();
				} else {
					groupMenu.set('anchor', event.target);
					groupMenu.show();
				}
				self.clsTimer();
			}, 1000);	
	};
	Model.prototype.touchMove = function(event) {
		this.clsTimer();
	};
	Model.prototype.clsTimer = function() {
		if (this.timer)
			clearTimeout(this.timer);
		this.timer = null;
	};
	
	Model.prototype.touchCancel = function(event) {
		this.clsTimer();
	};

	Model.prototype.touchEnd = function(event) {
		this.clsTimer();
	};

	Model.prototype.msgLIClick = function(event) {
		if (this.time < 1) {
			var row = event.bindingContext.$object;
			this.showMessagePage(row.val("fID"), row.val("fType"));
		}
	};

	Model.prototype.addContactBtnClick = function(event) {
		justep.Shell.showPage("newfriend");
		this.comp('menuPopOver').hide();
	};

	Model.prototype.createGroupBtnClick = function(event) {
		justep.Shell.showPage("newgroup", {});
		this.comp('menuPopOver').hide();
	};

	Model.prototype.contactInfoBtnClick = function(event) {
		var id = this.comp("contactsMenu")._id;
		justep.Shell.showPage("contact", {
			"contactId" : IM.getPersonByUID(id).id
		});
	};

	Model.prototype.deleteChatBtnClick = function(event) {
		var id = this.comp("contactsMenu")._id;
		var peer = IM.getUserPeer(id);
		justep.Util.confirm("删除该联系人的对话", function() {
			IM.deleteChat(peer);
		});
	};

	Model.prototype.deleteGroupChatBtnClick = function(event) {
		var id = this.comp("groupMenu")._id;
		var peer = IM.getGroupPeer(id);
		justep.Util.confirm("删除该组的对话?", function() {
			IM.deleteChat(peer);
		});
	};

	Model.prototype.leaveGroupBtnClick = function(event) {
		var id = this.comp("groupMenu")._id;
		var peer = IM.getGroupPeer(id);
		justep.Util.confirm("删除并退出该群?", function() {
			IM.leaveGroup(peer.id).then(function() {
				IM.deleteChat(peer);
			});
		});
	};

	Model.prototype.groupInfoBtnClick = function(event) {
		var id = this.comp("groupMenu")._id;
		var peer = IM.getGroupPeer(id);
		justep.Shell.showPage("groupmembers", {
			id : peer.id,
			type : peer.type
		});
	};

	Model.prototype.personalBtnClick = function(event) {
		if (this.loginActorDfd.state() === "resolved") {
			var uid = IM.getCurrentPerson().uid; 
			if (uid)
				justep.Shell.showPage("personal");
		}
	};

	Model.prototype.contactsMenuHideClick = function(event) {
		if (justep.Browser.isIphone) {
			this.i++;
			if (this.i >= 2) {
				this.comp('contactsMenu').hide();
				this.i = 0;
			} else {
				this.comp('contactsMenu').show();
			}

		} else {
			this.comp('contactsMenu').hide();
		}
	};

	Model.prototype.groupMenuHideClick = function(event) {
		if (justep.Browser.isIphone) {
			this.i++;
			if (this.i >= 2) {
				this.comp('groupMenu').hide();
				this.i = 0;
			} else {
				this.comp('groupMenu').show();
			}

		} else {
			this.comp('groupMenu').hide();
		}
	};

	Model.prototype.pagesActiveChanged = function(event) {
		var self = this;
		var i = event.to;
		this.loginActorDfd.then(function(){
			if(i===1){
				self.comp('contactsContainer').load();
			}
		});
		$(this.getElementByXid("showMenuPopOverBtn"))[event.to === 0 || event.to === 1 ? 'show' : 'hide']();
	};
	// 加载更多会话
	Model.prototype.scrollViewPullUp = function(event) {
		IM.onDialogsEnd();
	};

	return Model;
});