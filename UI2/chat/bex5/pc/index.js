define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IMBizImpl = require("../js/im.biz.impl");
	var electronApp = require("../../lib/electron-app");
	var IM = require("../../base/js/im");
	var Model = function() {
		this.callParent();
		this._cfg.pageMappings = {
			"main" : {
				url : require.toUrl("./main-message.w")
			},
			"contact" : {
				url : require.toUrl("./main-contact.w")
			},
			"orgTree" : {
				url : require.toUrl("./main-orgTree.w")
			},

		};
		window.isPortalWindow = true;
		this.on('onShowPage', this.doPageActive, this);
		this.on('onInit', this.doInit, this);
		// 设置是否是Electron App
		electronApp.setIsInElectron(this.getContext().getRequestParameter("inElectron") !== "" && this.getContext().getRequestParameter("inElectron") === "1");

	};

	Model.prototype.toContact = function() {
		IM.loginActor().done(function(){
			justep.Shell.showPage("contact");
		});
	};

	Model.prototype.toOrgTree = function() {
		this._imBizImpl.loginBiz().then(function() {
			justep.Shell.showPage("orgTree");
		});
	};

	Model.prototype.toChats = function() {
		justep.Shell.showPage("main");

	};

	Model.prototype.doPageActive = function(event) {
		var $meun = $('.x-chat-meun-tabs');
		$meun.children('li').removeClass('active');
		$meun.children('li.' + event.pageID).addClass('active');
	};

	Model.prototype.doInit = function(event) {

	};

	Model.prototype.loggedIn = function() {
		window.setInterval(justep.Util.bindModelFn(this, function() {
			this._imBizImpl.loginBiz();
		}, this), 1000 * 60 * 5);
		$('.x-chat-table').show();
		this.callParent();
	};

	Model.prototype.sessionTimeout = function() {
		this._imBizImpl.loginBiz();
	};

	Model.prototype.createIMImpl = function() {
		this._imBizImpl = new IMBizImpl(this);
	};

	Model.prototype.createShellImpl = function() {
		this.callParent();
		justep.Shell.on("onSendMessagePage", this.toChats, this);
		justep.Shell.on("onGroupSendMessagePage", this.toChats, this);
	};

	Model.prototype.personalInfo = function() {
		this.comp("personalDialog").set({
			src : require.toUrl("./personal.w"),
			title : '个人信息',
		});
		this.comp("personalDialog").open();
	};

	Model.prototype.modelLoad = function(event) {
		this.toChats();
	};

	return Model;
});