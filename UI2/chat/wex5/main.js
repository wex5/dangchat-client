define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var store = require('$UI/system/lib/base/store');
	var Utils = require("../lib/utils");
	var SuperInput = require("../lib/superInput/superInput");
	var IM = require("../base/js/im");
	var Model = function() {
		this.callParent();
		this.actorReadyOK = justep.Bind.observable(false);
	};

	Model.prototype.manageGroupBtnClick = function(event) {
		justep.Shell.showPage("$UI/work/org/createOrgActivity.m.w");
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
	Model.prototype.getMessageUrl = function() {
		return require.toUrl('./message.w');
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

	Model.prototype.init = function() {
		var self = this;
		var rows = store.get("chat_dialogData");
		var cUid = IM.getCurrentPersonID();
		var sUid = store.get("chat_uid");
		if (cUid == sUid && rows) {
			this.comp("dialogData").loadData({
				rows : rows
			});
			if (rows && rows.length !== 0) {
				self.comp('popOver').hide();
			}
		}
		store.set("chat_uid", cUid);
		IM.loginActor().done(function() {
			self.actorReadyOK.set(true);
			self.initEvent();
			self.comp('contactsContainer').load();
			self.comp('windowContainer').load();
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
		$(this.getElementByXid("showMenuPopOverBtn"))[event.to === 0 || event.to === 1 ? 'show' : 'hide']();
		$(this.getElementByXid("manageGroupBtn"))[(event.to === 1 && (IM.getCurrentInfo().CurrentFunRole != 3)) ? 'show' : 'hide']();
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
					fNickName : dialog.peer.peer.type === "user" ? (person.name ? person.name : dialog.peer.title) : dialog.peer.title,
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
					fNickName : dialog.peer.peer.type === "user" ? (person.name ? person.name : dialog.peer.title) : dialog.peer.title,
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
				allRows[i].val('fNickName', dialog.peer.peer.type === "user" ? (person.name ? person.name : dialog.peer.title) : dialog.peer.title);
				allRows[i].val('fCounter', dialog.counter);
				allRows[i].val('fImg', dialog.peer.peer.type === "user" ? person.avatar : dialog.peer.avatar ? dialog.peer.avatar : IM.getGroupDefaultIcon());
				allRows[i].val('fLatestChat', SuperInput.emojiParse(Utils.getLatestChat(dialog)));
				allRows[i].val('fLatestChatDate', Utils.getDate(dialog.date));
			} else {
				var row = data.find([ "fID" ], [ dialogs[i].peer.peer.id ]);
				if (row && row.length > 0) {
					row[0].val('fID', dialog.peer.peer.id);
					row[0].val('fType', dialog.peer.peer.type);
					row[0].val('fNickName', dialog.peer.peer.type === "user" ? (person.name ? person.name : dialog.peer.title) : dialog.peer.title);
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
							fNickName : dialog.peer.peer.type === "user" ? (person.name ? person.name : dialog.peer.title) : dialog.peer.title,
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
			self.comp("popOver").hide();
		});
	};
	
	Model.prototype.personalBtnClick = function(event) {
		if(this.actorReadyOK.get()){
			var uid = IM.getCurrentPerson().uid;
			if (uid)
				justep.Shell.showPage("personal");
		}
	};
	
	return Model;
});