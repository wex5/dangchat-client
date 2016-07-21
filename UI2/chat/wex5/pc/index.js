define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	var IMWex5Impl = require("../js/im.wex5.impl");
	var electronApp = require("../../lib/electron-app");

	var Model = function() {
		this.callParent();
		this._cfg.loginURL = '../login.w', 
		this._cfg.pageMappings = {
			"main" : {
				url : require.toUrl("./main-message.w")
			},
			"contact" : {
				url : require.toUrl("./main-contact.w")
			},
			"orgManagement" : {
				url : require.toUrl("./main-orgManagement.w")
			}
		};
		window.isPortalWindow = true;
		this.on('onShowPage', this.doPageActive, this);
		this.on('onInit', this.doInit, this);
		// 设置是否是Electron App
		electronApp.setIsInElectron(this.getContext().getRequestParameter("inElectron") !== "" && this.getContext().getRequestParameter("inElectron") === "1");

	};

	Model.prototype.toContact = function() {
		justep.Shell.showPage("contact");
	};

	Model.prototype.toChats = function() {
		justep.Shell.showPage("main");

	};
	Model.prototype.OrgManagementPage = function() {
		justep.Shell.showPage("orgManagement");
	};
	Model.prototype.doPageActive = function(event) {
		var $meun = $('.x-chat-meun-tabs');
		$meun.children('li').removeClass('active');
		$meun.children('li.' + event.pageID).addClass('active');
	};

	Model.prototype.doInit = function(event) {

	};

	Model.prototype.getLoginDialog = function() {
		if (!this._loginDlg) {
			this._loginDlg = new WindowDialog({
				title : 'login',
				showTitle : false,
				src : require.toUrl(this._cfg.loginURL),
				parentNode : this.getRootNode()
			});
		}
		return this._loginDlg;
	};

	Model.prototype.loggedIn = function() {
		$('.x-chat-table').show();
		this.callParent();
	};

	Model.prototype.createIMImpl = function() {
		this._imWex5Impl = new IMWex5Impl(this);
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
	Model.prototype.toChooseOrg = function(event) {
		this.comp('chooseOrgDialog').open({
			params : {
				personID : event.personID,
				isFromPC : true
			}
		});
	};

	return Model;
});