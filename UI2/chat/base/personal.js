define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("./js/im");
	var electronApp = require("../lib/electron-app");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.showMsgLikeClick = function() {
		this.comp('msglikeDlg').open();
	};

	// 接收参数，得到联系人信息并显示
	Model.prototype.modelParamsReceive = function(event) {
		var user = IM.getCurrentPerson();
		if (user) {
			// 显示联系人信息
			$(this.getElementByXid("userName")).text(user.name);
			$(this.getElementByXid("aboutMe")).text(user.about ? user.about : "向其他人简单介绍自己");
			$(this.getElementByXid("avatar")).attr("src", user.avatar ? user.avatar : IM.getPersonDefaultIcon());

			// 显示是否启用回车发送消息
			this.showIsSendByEnterEnabled();
			// 绑定用户信息改变事件，实时显示最新的用户信息。
			var self = this;
			IM.bindUser(user.uid, function(me) {
				self.showUserChangedInfo(me);
			});
		}
	};

	// 显示用户改变后的信息
	Model.prototype.showUserChangedInfo = function(user) {
		if (user) {
			$(this.getElementByXid("aboutMe")).text(user.about ? user.about : "向其他人简单介绍自己");
		}
	};

	// 显示是否启用回车发送消息
	Model.prototype.showIsSendByEnterEnabled = function() {
		var result = IM.isSendByEnterEnabled();
		this.comp("isSendByEnterEnabled").set({
			"checked" : result
		});
	};

	// 改变是否启用回车发送消息
	Model.prototype.isSendByEnterEnabledChange = function(event) {
		justep.Shell.fireEvent("onSendByEnterEnabledChanged");
		IM.changeSendByEnter(event.checked);
	};

	Model.prototype.showEditPage = function(editType) {
		var userId = IM.getCurrentPerson().uid;
		if (userId) {
			justep.Shell.showPage("editUser", {
				"userId" : userId,
				"editType" : editType
			});
		}
	};

	Model.prototype.aboutMePanelClick = function(event) {
		this.showEditPage("myAboutMe");
	};

	Model.prototype.modelModelConstruct = function(event) {
		this.init();
	};

	Model.prototype.init = function() {


	};

	Model.prototype.quitBtnClick = function(event) {
		var self = this;
		justep.Util.confirm("确认离开？", function() {
			if (electronApp.getIsInElectron()) {
				self.unbindGlobalCounter();
			}
			IM.logout();
		});
	};

	Model.prototype.unbindGlobalCounter = function() {
		IM.unbindGlobalCounter(function() {
		});
	};

	return Model;
});