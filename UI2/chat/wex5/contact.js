define(function(require) {
	var IM = require("../base/js/im");
	var justep = require("$UI/system/lib/justep");
	var Person = require("../base/js/person");
	var Model = function() {
		this.callParent();
		this.name = justep.Bind.observable();
	};

	Model.prototype.modelParamsReceive = function(event) {
		if (IM.isLoggedIn()) {
			this.init();
			// 注册关闭本页面的事件
			justep.Shell.on("onCloseContactPage", this.closeSelf, this);
		} else {
			justep.Shell.on("onLoggedIn", this.init, this);
		}
	};

	Model.prototype.init = function() {
		var contactId = this.params.contactId;
		var person = IM.getPerson(contactId);
		if (!person) {
			var p = {
				id : this.params.contactId,
				name : this.params.name,
				uid : '',
				// avatar : getPersonAvatar(psm),
				nick : '',
				phones : [],
				about : ''
			};
			person = new Person(p);
		}
		this.uid = null;
		this.userID = IM.addFriend(person);
		$(this.getElementByXid('accountName')).text(person.name);
		this.name.set(person.name.slice(-2));
		if (!person.avatar) {
			$(this.getElementByXid('avatar')).hide();
			$(this.getElementByXid('div15')).show();
		} else {
			$(this.getElementByXid('avatar')).attr("src", person.avatar);
			$(this.getElementByXid('div15')).hide();
		}

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

	return Model;
});