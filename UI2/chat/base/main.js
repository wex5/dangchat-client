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

		var context = this.getContext();
		IM.notification(context, cUid);

		IM.loginActor().done(function() {
			self.initEvent();
			self.comp('contactsContainer').load();
			var uid = IM.getCurrentPerson().uid;
			$(document).on('resume', function() {
				IM.updateClientState("-1,"+uid+",1");
			});
			$(document).on('pause', function() {
				IM.updateClientState("-1,"+uid+",0");
			});
		});
	};
	var getIndex = function(id, dialogs) {
		var index = -1;
		$.each(dialogs, function(i, v) {
			if (v.peer.peer.id === id) {
				index = i;
				return false;
			}
		});
		return index;
	};
	var isIn = function(dialogs, id) {
		var dialogsID = [];
		for (var i = 0; i < dialogs.length; i++) {
			dialogsID.push(dialogs[i].peer.peer.id);
		}
		if (dialogsID.indexOf(id) >= 0) {
			return true;
		} else {
			return false;
		}
	};
	Model.prototype.addNewDialogs = function(data, dialogs) {
		var rows = [], i, dialog, person;
		var row = data.getFirstRow();
		var lastRow = data.getLastRow();
		var lastRowID = lastRow && lastRow.getID();
		var firstRowID = row && row.getID();
		var index = getIndex(firstRowID, dialogs);
		if (index === 0) {
			index = getIndex(lastRowID, dialogs);
			for (i = index + 1; i < dialogs.length; i++) {
				dialog = dialogs[i];
				this.dialogs[dialog.peer.peer.id] = dialog;
				person = dialog.peer.peer.type === "user" ? IM.getPersonByUID(dialog.peer.peer.id) : {};
				rows.push({
					fID : dialog.peer.peer.id,
					fType : dialog.peer.peer.type,
					fNickName : dialog.peer.peer.type === "user" ? person.name : dialog.peer.title,
					fCounter : dialog.counter,
					fImg : dialog.peer.peer.type === "user" ? person.avatar : dialog.peer.avatar ? dialog.peer.avatar : IM.getGroupDefaultIcon(),
					fLatestChat : SuperInput.emojiParse(Utils.getLatestChat(dialog)),
					fLatestChatDate : Utils.getDate(dialog.date)
				});
			}
			data.loadData(rows, true);
		} else {
			for (i = 0; i < index; i++) {
				dialog = dialogs[i];
				this.dialogs[dialog.peer.peer.id] = dialog;
				person = dialog.peer.peer.type === "user" ? IM.getPersonByUID(dialog.peer.peer.id) : {};
				rows.push({
					fID : dialog.peer.peer.id,
					fType : dialog.peer.peer.type,
					fNickName : dialog.peer.peer.type === "user" ? person.name : dialog.peer.title,
					fCounter : dialog.counter,
					fImg : dialog.peer.peer.type === "user" ? person.avatar : dialog.peer.avatar ? dialog.peer.avatar : IM.getGroupDefaultIcon(),
					fLatestChat : SuperInput.emojiParse(Utils.getLatestChat(dialog)),
					fLatestChatDate : Utils.getDate(dialog.date)
				});
			}
			data.loadData(rows, true, null, 0);
		}
	};
	Model.prototype.sortData = function(data, dialogs) {
		var allRows = data.datas.get(), i, dialog, person;
		for (i = 0; i < dialogs.length; i++) {
			dialog = dialogs[i];
			this.dialogs[dialog.peer.peer.id] = dialog;
			person = dialog.peer.peer.type === "user" ? IM.getPersonByUID(dialog.peer.peer.id) : {};
			if (dialogs[i].peer.peer.id == allRows[i].getID()) {
				allRows[i].val('fID', dialog.peer.peer.id);
				allRows[i].val('fType', dialog.peer.peer.type);
				allRows[i].val('fNickName', dialog.peer.peer.type === "user" ? person.name : dialog.peer.title);
				allRows[i].val('fCounter', dialog.counter);
				allRows[i].val('fImg', dialog.peer.peer.type === "user" ? person.avatar : dialog.peer.avatar ? dialog.peer.avatar : IM.getGroupDefaultIcon());
				allRows[i].val('fLatestChat', SuperInput.emojiParse(Utils.getLatestChat(dialog)));
				allRows[i].val('fLatestChatDate', Utils.getDate(dialog.date));
			} else {
				var row = data.find([ "fID" ], [ dialogs[i].peer.peer.id ]);
				if (row && row.length > 0) {
					row[0].val('fID', dialog.peer.peer.id);
					row[0].val('fType', dialog.peer.peer.type);
					row[0].val('fNickName', dialog.peer.peer.type === "user" ? person.name : dialog.peer.title);
					row[0].val('fCounter', dialog.counter);
					row[0].val('fImg', dialog.peer.peer.type === "user" ? person.avatar : dialog.peer.avatar ? dialog.peer.avatar : IM.getGroupDefaultIcon());
					row[0].val('fLatestChat', SuperInput.emojiParse(Utils.getLatestChat(dialog)));
					row[0].val('fLatestChatDate', Utils.getDate(dialog.date));
					data.moveRowTo(row[0], allRows[i]);
				}
			}
		}
	};
	Model.prototype.initEvent = function() {
		var self = this;
		window.addEventListener("online", function() {
			self.offline.set(false);
		}, true);
		window.addEventListener("offline", function() {
			self.offline.set(true);
		}, true);
		IM.bindDialogs(function(dialogs) {
			var data = self.comp("dialogData"), i, dialog, person;
			var dataCount = data.getCount();
			var rows = [];
			self.dialogs = {};
			if (dialogs) {
				if (dataCount > 0) {
					rows = [];
					data.each(function(params) {
						var row = params.row;
						var isExist = isIn(dialogs, row.getID());
						if (!isExist)
							rows.push(row);
					});
					if (rows.length > 0) {
						for (i = 0; i < rows.length; i++) {
							data.remove(rows[i]);
						}
					}
					if (data.count() != dialogs.length) {
						self.addNewDialogs(data, dialogs);
					}
					if (data.count() == dialogs.length) {
						self.sortData(data, dialogs);
					}
					rows = data.toJson({
						format : 'simple'
					});
				} else {
					for (i = 0; i < dialogs.length; i++) {
						dialog = dialogs[i];
						self.dialogs[dialog.peer.peer.id] = dialog;
						person = dialog.peer.peer.type === "user" ? IM.getPersonByUID(dialog.peer.peer.id) : {};
						rows.push({
							fID : dialog.peer.peer.id,
							fType : dialog.peer.peer.type,
							fNickName : dialog.peer.peer.type === "user" ? person.name : dialog.peer.title,
							fCounter : dialog.counter,
							fImg : dialog.peer.peer.type === "user" ? person.avatar : dialog.peer.avatar ? dialog.peer.avatar : IM.getGroupDefaultIcon(),
							fLatestChat : SuperInput.emojiParse(Utils.getLatestChat(dialog)),
							fLatestChatDate : Utils.getDate(dialog.date)
						});
					}
					self.comp("dialogData").loadData({
						rows : rows
					});
				}
				store.set("chat_dialogData", rows);
			}
		});
	};

	Model.prototype.getDialog = function(id) {
		var result = this.dialogs[id];
		if (!result)
			throw "根据id:" + id + "查找会话出错！";
		return result;
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
		var peer = this.getDialog(id).peer.peer;
		justep.Util.confirm("删除该联系人的对话", function() {
			IM.deleteChat(peer);
		});
	};

	Model.prototype.deleteGroupChatBtnClick = function(event) {
		var id = this.comp("groupMenu")._id;
		var peer = this.getDialog(id).peer.peer;
		justep.Util.confirm("删除该组的对话?", function() {
			IM.deleteChat(peer);
		});
	};

	Model.prototype.leaveGroupBtnClick = function(event) {
		var id = this.comp("groupMenu")._id;
		var peer = this.getDialog(id).peer.peer;
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
		var uid = IM.getCurrentPerson().uid; 
		if (uid)
			justep.Shell.showPage("personal");
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

	Model.prototype.workBtnClick = function(event) {
		this.comp("workContainer").load();
	};

	Model.prototype.pagesActiveChanged = function(event) {
		$(this.getElementByXid("showMenuPopOverBtn"))[event.to === 0 || event.to === 1 ? 'show' : 'hide']();
	};
	// 加载更多会话
	Model.prototype.scrollViewPullUp = function(event) {
		IM.onDialogsEnd();
	};

	return Model;
});