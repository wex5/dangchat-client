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
	

	
	
	Model.prototype.loadData = function(dataComp,newData,getRowCallback) {
		var oldDataCount = dataComp.getCount();
		if(oldDataCount === 0){
			var rows = [];
			for(var index = 0;index < newData.length ;index++){
				var row = getRowCallback.call(this,newData[index]);
				rows.push(row);
			}
			dataComp.loadData({
				rows : rows
			});
			return;
		}else if(newData.length === 0){
			return;
		}
		
		for(var index = 0;index < newData.length ;index++){
			var item = newData[index];
			var rows = dataComp.find([ "fID" ], [item.peer.peer.id]);
			if(rows.length > 0){
				var currentIndex = dataComp.getRowIndex(rows[0]);
				if(currentIndex != index){
					dataComp.moveRowTo((dataComp.datas.get())[currentIndex],(dataComp.datas.get())[index]);
				}
				getRowCallback.call(this,item,(dataComp.datas.get())[index]);
			}else{
				var row = getRowCallback.call(this,item);
				dataComp.loadData([row], true,null,index);
			}
		}
		for(var removeIndex = newData.length -1;removeIndex < dataComp.getCount(); removeIndex ++){
			dataComp.datas.splice(newData.length);
		}
	};
	
	Model.prototype.getRowCallback = function(item,row) {
		var person = item.peer.peer.type === "user" ? IM.getPersonByUID(item.peer.peer.id) : {};
		var nickName = item.peer.peer.type === "user" ? person.name || item.peer.title : item.peer.title;
		var img = item.peer.peer.type === "user" ? person.avatar : item.peer.avatar ? item.peer.avatar : IM.getGroupDefaultIcon();
		if(row){
			row.val('fID', item.peer.peer.id);
			row.val('fType', item.peer.peer.type);
			row.val('fNickName', nickName);
			row.val('fNickNamePY', ChinesePY.makeFirstPY(nickName));
			row.val('fCounter', item.counter);
			row.val('fImg', img);
			row.val('fLatestChat', SuperInput.emojiParse(Utils.getLatestChat(item)));
			row.val('fLatestChatDate', Utils.getDate(item.date));
		}else{
			row = {
				fID : item.peer.peer.id,
				fType : item.peer.peer.type,
				fNickName : nickName,
				fNickNamePY : ChinesePY.makeFirstPY(nickName),
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
			var data = self.comp("dialogData");
			self.loadData(data,dialogs,self.getRowCallback);
			var rows = data.toJson({
				format : 'simple'
			});
			store.set("chat_dialogData", rows);
			
		});
	};

	Model.prototype.bindGlobalCounter = function() {
		var self = this;
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