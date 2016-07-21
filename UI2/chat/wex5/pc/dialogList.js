define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var SuperInput = require("../../lib/superInput/superInput");
	var Utils = require("../../lib/utils");
	var IM = require("../../base/js/im");
	var electronApp = require("../../lib/electron-app");
	var ChinesePY = require("$UI/system/lib/base/chinesePY");
	var store = require('$UI/system/lib/base/store');

	var Model = function() {
		this.callParent();
		this.dialogs = {}; // 会话列表
		this.currentDialogID = justep.Bind.observable();
		justep.Shell.on('onSendMessagePage', function(event) {
			this.showMessagePage(event.id, event.type);
		}, this);
		justep.Shell.on('onGroupSendMessagePage', function(event) {
			// var rows = this.comp("dialogData").find([ "fID" ], [ event.id ],
			// true);
			// if (rows && rows.length > 0)
			// this.showMessagePage(rows[0].val("fID"), rows[0].val("fType"));
			this.showMessagePage(event.id, event.type);
		}, this);
		this.pageTitle = $(document).attr("title");
		this.filterVal = justep.Bind.observable();
		this.isGroup = justep.Bind.observable(false);
	};

	Model.prototype.dialogFilter = function(row) {
		var filterVal = this.filterVal.get();
		if (filterVal && row) {
			var name = row.val('fNickName'), namePY = row.val('fNickNamePY');
			return name && (name.indexOf(filterVal) > -1 || namePY.indexOf(filterVal) > -1);
		} else
			return true;
	};

	Model.prototype.clsfilterVal = function() {
		this.filterVal.set("");
	};

	Model.prototype.modelModelConstruct = function(event) {
		if (IM.isLoggedIn()) {
			this.init();
		} else {
			justep.Shell.on('onLoggedIn', this.init, this);
		}
	};

	Model.prototype.init = function() {
		var rows = store.get("chat_dialogData");
		var cUid = IM.getCurrentPersonID();
		var sUid = store.get("chat_uid");
		if (cUid == sUid && rows) {
			this.comp("dialogData").loadData({
				rows : rows
			});
		}
		store.set("chat_uid", cUid);
		var self = this;
		IM.loginActor().done(function() {
			console.log(electronApp.getIsInElectron());
			if (electronApp.getIsInElectron()) {
				console.log("bind");
				self.bindGlobalCounter();
			}
			self.loadDialogs();
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
					fNickName : dialog.peer.peer.type === "user" ? person.name || dialog.peer.title : dialog.peer.title,
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
		var allRows = data.datas.get(), i, dialog, person, nickName, img;
		for (i = 0; i < dialogs.length; i++) {
			dialog = dialogs[i];
			this.dialogs[dialog.peer.peer.id] = dialog;
			person = dialog.peer.peer.type === "user" ? IM.getPersonByUID(dialog.peer.peer.id) : {};
			nickName = dialog.peer.peer.type === "user" ? person.name || dialog.peer.title : dialog.peer.title;
			img = dialog.peer.peer.type === "user" ? person.avatar : dialog.peer.avatar ? dialog.peer.avatar : IM.getGroupDefaultIcon();
			if (dialogs[i].peer.peer.id == allRows[i].getID()) {
				allRows[i].val('fID', dialog.peer.peer.id);
				allRows[i].val('fType', dialog.peer.peer.type);
				allRows[i].val('fNickName', nickName);
				allRows[i].val('fNickNamePY', ChinesePY.makeFirstPY(nickName));
				allRows[i].val('fCounter', dialog.counter);
				allRows[i].val('fImg', img);
				allRows[i].val('fLatestChat', SuperInput.emojiParse(Utils.getLatestChat(dialog)));
				allRows[i].val('fLatestChatDate', Utils.getDate(dialog.date));
			} else {
				var row = data.find([ "fID" ], [ dialogs[i].peer.peer.id ]);
				if (row && row.length > 0) {
					row[0].val('fID', dialog.peer.peer.id);
					row[0].val('fType', dialog.peer.peer.type);
					row[0].val('fNickName', nickName);
					row[0].val('fNickNamePY', ChinesePY.makeFirstPY(nickName));
					row[0].val('fCounter', dialog.counter);
					row[0].val('fImg', img);
					row[0].val('fLatestChat', SuperInput.emojiParse(Utils.getLatestChat(dialog)));
					row[0].val('fLatestChatDate', Utils.getDate(dialog.date));
					data.moveRowTo(row[0], allRows[i]);
				}
			}
		}
	};

	Model.prototype.loadDialogs = function() {
		var self = this;
		// var showNotification = false;
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
						var nickName = dialog.peer.peer.type === "user" ? person.name || dialog.peer.title : dialog.peer.title;
						rows.push({
							fID : dialog.peer.peer.id,
							fType : dialog.peer.peer.type,
							fNickName : nickName,
							fNickNamePY : ChinesePY.makeFirstPY(nickName),
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
		// IM.bindDialogs(function(dialogs) {
		// var rows = [];
		// self.dialogs = {};
		// if (dialogs) {
		// for (var i = 0; i < dialogs.length; i++) {
		// var dialog = dialogs[i];
		// self.dialogs[dialog.peer.peer.id] = dialog;
		// var person = dialog.peer.peer.type === "user" ?
		// IM.getPersonByUID(dialog.peer.peer.id) : {};
		// rows.push({
		// fID : dialog.peer.peer.id,
		// fType : dialog.peer.peer.type,
		// fNickName : dialog.peer.peer.type === "user" ? person.name :
		// dialog.peer.title,
		// fCounter : dialog.counter,
		// fImg : dialog.peer.peer.type === "user" ? person.avatar :
		// dialog.peer.avatar ? dialog.peer.avatar : IM.getGroupDefaultIcon(),
		// fLatestChat : SuperInput.emojiParse(Utils.getLatestChat(dialog)),
		// fLatestChatDate : Utils.getDate(dialog.date)
		// });
		//
		// // 如果有新消息并且是Electron App，则改变页面title，通知Electron收到了新消息。
		// /*
		// * if(electronApp.getIsInElectron()) { if(!showNotification &&
		// * dialog.counter > 0) { showNotification = true; } }
		// */
		// }
		// /*
		// * if(showNotification) { $(document).attr("title", pageTitle +
		// * "^"); showNotification = false; } else {
		// * $(document).attr("title", pageTitle); }
		// */
		// }
		// self.comp("dialogData").loadData(rows);
		// });
	};

	Model.prototype.bindGlobalCounter = function() {
		IM.bindGlobalCounter(function(counter) {
			if (counter) {
				electronApp.sendMessage("newMessage",{counter:counter.counter});
				
			}
		});
		
		/*IM.bindTempGlobalCounter(function(counter) {
			console.log("tempCounter:" + counter);
		});*/
	};

	// 图片路径转换
	Model.prototype.getImageUrl = function(url) {
		if (url) {
			return require.toUrl(url);
		} else {
			return "";
		}
	};

	Model.prototype.msgLIClick = function(event) {
		var row = event.bindingContext.$object;
		var id = row.val("fID");
		var type = row.val("fType");
		if (id)
			this.showMessagePage(id, type);
	};

	Model.prototype.showMessagePage = function(fid, type) {
		var peer = type === 'user' ? IM.getUserPeer(fid) : IM.getGroupPeer(fid);
		if (peer.id != this.currentDialogID.peek()) {
			this.currentDialogID.set(peer.id);
			justep.Shell.fireEvent('onShowMessagePage', {
				id : fid,
				type : type,
			});
		}
	};

	Model.prototype.getDialog = function(id) {
		var result = this.dialogs[id];
		if (!result)
			throw "根据id:" + id + "查找会话出错！";
		return result;
	};

	Model.prototype.newGroupBtnClick = function(event) {
		this.comp("newGroupWindowDialog").set({
			src : require.toUrl("./newGroup.w"),
			title : '创建群聊'
		});
		this.comp("newGroupWindowDialog").open();
	};

	Model.prototype.msgRightClick = function(event) {
		if (event.button == 2) {
			var popMenu = this.comp("popMenu");
			popMenu._id = event.bindingContext.$object.val("fID");
			popMenu._type = event.bindingContext.$object.val("fType");
			popMenu.set('anchor', event.target);
			if (popMenu._type === "group") {
				this.isGroup.set(true);
				this.comp("deleteChatBtn").set('label', "删除并退出");
			} else {
				this.isGroup.set(false);
				this.comp("deleteChatBtn").set('label', "删除会话");
			}
			setTimeout(function() {
				popMenu.show();
			}, 0);
		}
	};

	Model.prototype.deleteGroupChatBtnClick = function(event) {
		var popMenu = this.comp("popMenu");
		var id = popMenu._id;
		var gPeer = IM.getGroupPeer(id);
		justep.Util.confirm("确定删除该组的对话？", function() {
			IM.deleteChat(gPeer);
		});
	};

	Model.prototype.deleteChatBtnClick = function(event) {
		var self = this;
		var popMenu = this.comp("popMenu");
		var type = popMenu._type;
		var id = popMenu._id;
		if (type === "user") {
			var peer = IM.getUserPeer(id);
			justep.Util.confirm("确定删除该联系人的对话？", function() {
				IM.deleteChat(peer);
				if (self.currentDialogID.peek() === id) {
					self.currentDialogID.set(null);
					justep.Shell.fireEvent('onCloseMessagePage');
				}
			});
		} else {
			var gPeer = IM.getGroupPeer(id);
			justep.Util.confirm("确定退出该群？", function() {
				IM.leaveGroup(gPeer.id).then(function() {
					IM.deleteChat(gPeer);
					if (self.currentDialogID.peek() === id) {
						self.currentDialogID.set(null);
						justep.Shell.fireEvent('onCloseMessagePage');
					}
				});
			});
		}

	};

	Model.prototype.InfoBtnClick = function(event) {
		var popMenu = this.comp("popMenu");
		var type = popMenu._type;
		var id = popMenu._id;
		if (type === "user") {
			this.comp("newGroupWindowDialog").set({
				src : require.toUrl("./contact.w"),
				title : '联系人信息'
			});
			this.comp("newGroupWindowDialog").open({
				params : {
					"contactId" : IM.getPersonByUID(id).id,
					"formDilog" : true
				}
			});
		} else {
			this.comp("newGroupWindowDialog").set({
				src : require.toUrl("./group.w"),
				title : '群组信息'
			});
			this.comp("newGroupWindowDialog").open({
				params : {
					id : id,
					type : type,
					formDilog : true
				}
			});
		}
	};

	Model.prototype.scrollViewPullUp = function(event) {
		IM.onDialogsEnd();
	};

	return Model;
});