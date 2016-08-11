define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var store = require('$UI/system/lib/base/store');
	var Utils = require("../lib/utils");
	var SuperInput = require("../lib/superInput/superInput");
	var IM = require("../base/js/im");
	var Push = require("$UI/system/lib/base/push");

	var Model = function() {
		this.callParent();
		this.loginActorDfd;
	};
	Model.prototype.getMessageUrl = function(){
		return require.toUrl('./message.w');
	};
	Model.prototype.manageGroupBtnClick = function(event) {
		justep.Shell.showPage("$UI/work/org/createOrgActivity.m.w");
	};
	
	Model.prototype.init = function() {
		var self = this;
		var rows = store.get("wex5Chat_dialogData");
		var cUid = IM.getCurrentPersonID();
		var sUid = store.get("wex5Chat_uid");
		if (cUid == sUid && rows) {
			this.comp("dialogData").loadData({
				rows : rows
			});
		}
		store.set("wex5Chat_uid", cUid);
		this.loginActorDfd = IM.loginActor();
		this.loginActorDfd.done(function() {
			justep.Shell.fireEvent('actorLongined');
			self.initEvent();
			var uid = IM.getCurrentPerson().uid;
			$(document).on('resume', function() {
				IM.updateClientState("-1," + uid + ",1");
			});
			$(document).on('pause', function() {
				IM.updateClientState("-1," + uid + ",0");
			});
		});
	};

	Model.prototype.pagesActiveChanged = function(event) {
		var self = this;
		var i = event.to;
		this.loginActorDfd.then(function() {
			if (i=== 1) {
				self.comp('contactsContainer').load();
			}
			if (i === 2) {
				self.comp('windowContainer').load();
			}
		});
		$(this.getElementByXid("showMenuPopOverBtn"))[event.to === 0 || event.to === 1 ? 'show' : 'hide']();
		$(this.getElementByXid("manageGroupBtn"))[(event.to === 1 && (IM.getCurrentInfo().CurrentFunRole != 3)) ? 'show' : 'hide']();
	};

	Model.prototype.getRowCallback = function(item, row) {
		var person = item.peer.peer.type === "user" ? IM.getPersonByUID(item.peer.peer.id) : {};
		var nickName = item.peer.peer.type === "user" ? person.name || item.peer.title : item.peer.title;
		var img = item.peer.peer.type === "user" ? person.avatar : item.peer.avatar ? item.peer.avatar : IM.getGroupDefaultIcon();
		if (row) {
			row.val('fID', item.peer.peer.id);
			row.val('fType', item.peer.peer.type);
			row.val('fNickName', nickName);
			row.val('fCounter', item.counter);
			row.val('fImg', img);
			row.val('fLatestChat', SuperInput.emojiParse(Utils.getLatestChat(item)));
			row.val('fLatestChatDate', Utils.getDate(item.date));
		} else {
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
				store.set("wex5Chat_dialogData", rows.rows);
			}, 500);
		});
	};

	Model.prototype.initEvent = function() {
		var self = this;
		
		//hcr 添加推送相关, 当前先不验证用户名和密码, 代码逻辑有点不对： 登录在这里做，但退出在wex5的退出中实现
		Push.init(IM.getCurrentPersonID(), null);

		//hcr 点推送通知时，打开相应的会话
		Push.on("onMessage", function(event){
			if (event.message.e && event.message.e.peerId && event.message.e.peerType){
				var id = event.message.e.peerId * 1;
				var type = (event.message.e.peerType==1)? "user" : "group";
				justep.Shell.fireEvent("onSendMessagePage", {id: id, type: type});					
			}
		});
		
		window.addEventListener("online", function() {
			self.offline.set(false);
		}, true);
		window.addEventListener("offline", function() {
			self.offline.set(true);
		}, true);
		this.loadDialogs();
	};

	Model.prototype.personalBtnClick = function(event) {
		if (this.loginActorDfd.state() === "resolved") {
			var uid = IM.getCurrentPerson().uid;
			if (uid)
				justep.Shell.showPage("personal");
		}
	};

	return Model;
});