define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("./js/im");

	var Model = function() {
		this.callParent();
	};

	// 接收参数，得到联系人信息并显示
	Model.prototype.modelParamsReceive = function(event) {
		if (IM.isLoggedIn()) {
			this.init();
			// 注册关闭本页面的事件
			justep.Shell.on("onCloseContactPage", this.closeSelf, this);
		} else {
			justep.Shell.on("onLoggedIn", this.init, this);
		}
	};
	// 显示用户改变后的信息
	Model.prototype.showUserChangedInfo = function(user) {
		if (user) {
			$("span[xid=aboutMe]", this.getRootNode()).text(user.about || '');
			this.setUserOnline(user.isOnline);
		}
	};

	// 显示是否启用联系人的消息推送
	Model.prototype.showIsNotificationsEnabled = function(contactId) {
		var userPeer = IM.getUserPeer(contactId);
		if (userPeer) {
			var checked = IM.isNotificationsEnabled(userPeer);
			this.comp("isNotificationsEnabled").set({
				"checked" : checked
			});
		}
	};

	// 设置联系人的在线状态
	Model.prototype.setUserOnline = function(online) {
		$(this.getElementByXid("userStatus")).text(online ? "在线" : "离线");
	};

	Model.prototype.modelUnLoad = function(event) {
		// 解绑用户
				var currentPersonID = IM.getCurrentPerson().id;
		if(this.params.contactId !== currentPersonID&&this._bindUserHandle){
			this._bindUserHandle.unbind();
		}
	};

	// 改变消息推送设置
	Model.prototype.isNotificationsEnabledChange = function(event) {
		var userPeer = IM.getUserPeer(this.params.contactId);
		if (userPeer) {
			IM.changeNotificationsEnabled(userPeer, event.checked);
		}
	};

	Model.prototype.sendMessageClick = function(event) {
		// 打开聊天页面
		this.userID.then(function(id) {
			justep.Shell.fireEvent("onSendMessagePage", {
				id : id,
				type : "user"
			});
		});
		if (this.params.formDilog) {
			this.owner.close();
		}
	};

	Model.prototype.closeSelf = function() {
		this.close();
	};

	Model.prototype.init = function() {
		var contactId = this.params.contactId;
		var person = IM.getPerson(contactId);
		this.uid = null;
		this.userID = IM.addFriend(person);
		$(this.getElementByXid('accountName')).text(person.name);
		$(this.getElementByXid('avatar')).attr("src", person.avatar);
		// 显示是否启用联系人的消息推送
		var self = this;
		this.userID.then(function(uid) {
			self.uid = uid;
			self.showIsNotificationsEnabled(uid);
			if (self._bindUserHandle)
				self._bindUserHandle.unbind();
			self._bindUserHandle = IM.bindUser(uid, function(me) {
				self.showUserChangedInfo(me);
			});
		});
	};

	Model.prototype.personalBtnClick = function(event) {
		justep.Shell.showPage("personal");
	};

	Model.prototype.modelInactive = function(event) {
		var currentPersonID = IM.getCurrentPerson().id;
		if(this.params.contactId !== currentPersonID&&this._bindUserHandle){
			this._bindUserHandle.unbind();
		}
	};

	return Model;
});