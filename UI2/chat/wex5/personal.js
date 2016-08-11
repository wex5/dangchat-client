define(function(require) {
	var IM = require("../base/js/im");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
		this.name = justep.Bind.observable();
	};

	// 接收参数，得到联系人信息并显示
	Model.prototype.modelParamsReceive = function(event) {
		var user = IM.getCurrentPerson();
		if (user) {
			// 显示联系人信息
			this.name.set(user.name.slice(-2));
			$(this.getElementByXid("userName")).text(user.name);
			$(this.getElementByXid("aboutMe")).text(user.about ? user.about : "向其他人简单介绍自己");
			if (user.avatar) {
				$(this.getElementByXid("avatar")).attr("src", user.avatar ? user.avatar : IM.getPersonDefaultIcon());
				$(this.getElementByXid("div5")).hide();
			} else {
				$(this.getElementByXid("avatar")).hide();
				$(this.getElementByXid("div5")).show();
			}

			// 显示是否启用回车发送消息
			this.showIsSendByEnterEnabled();
			// 绑定用户信息改变事件，实时显示最新的用户信息。
			var self = this;
			IM.bindUser(user.uid, function(me) {
				self.showUserChangedInfo(me);
			});
		}
	};

	Model.prototype.changePawdBtnClick = function(event) {
		if (justep.Browser.isPC) {
			this.comp("windowDialog").open({
				"src" : "$UI/work/reg/changePasswordActivity.m.w"
			});
		} else {
			justep.Shell.showPage("$UI/work/reg/changePasswordActivity.m.w");
		}
	};

	Model.prototype.aboutBtnClick = function(event) {
		var url = "$UI/work/aboutDD/process/about/mainActivity.w";
		url = require.toUrl(url);
		if (justep.Browser.isPC) {
			this.comp("windowDialog").open({
				"src" : url
			});
		} else {
			justep.Shell.showPage(url);
		}
	};

	Model.prototype.init = function() {
		var self = this;
		var domNode = this.getElementByXid('divAvatar');
		var avatar = this.getElementByXid('avatar');
		var uploader = IM.bindChangeMyAvatar(justep.Baas.BASE_URL + '/org/personAvatar/personAvatar', "img", domNode);

		uploader.on("onBefore", function(evt) {
			if (evt.promise === null) {
				evt.promise = $.Deferred();
			}
			self.comp("clipDialog").open({
				data : {
					file : evt.data,
					promise : evt.promise
				}
			});
		});

		uploader.on('onSuccess', function(evt) {
			avatar.src = IM.getCurrentPerson().avatar;
			$(avatar).show();
			$(self.getElementByXid("div5")).hide();
		});
	};

	Model.prototype.clipDialogReceive = function(event){
		if(event.data.data){
			event.data.promise.resolve(event.data.data);
		}else{
			event.data.promise.reject();
		}
	};

	return Model;
});