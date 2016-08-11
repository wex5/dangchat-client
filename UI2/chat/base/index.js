define(function(require) {
	require('css!../lib/superInput/icon/iconfont').load();// 加载新增iconfont
	require('css!../lib/superInput/icon/addicon/iconfont').load();
	// var $ = require("jquery");
	 var justep = require("$UI/system/lib/justep");
	var ShellImpl = require('$UI/system/lib/portal/shellImpl');
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	var IM = require("./js/im");
	require("cordova!cordova-plugin-statusbar");
	
	var Model = function() {
		this.callParent();
		this._cfg = {
			loginURL : '../base/login.w',
			pageMappings : {

			}
		};
		this.loginDtd = this.getLoadedDeferred();
	};

	Model.prototype.createShellImpl = function() {
		var shellImpl = new ShellImpl(this, {
			"contentsXid" : "pages",
			"pageMappings" : this._cfg.pageMappings
		});
		shellImpl.on('onCallFN', this._doCallFN, this);
		shellImpl.on('onPageActive', this._doShowPage, this);
		shellImpl.on('onLoggedIn', this.loggedIn, this);
		shellImpl.on('onShowLoginDialog', this.showLoginDialog, this);
		shellImpl.on('toChooseOrg', this.toChooseOrg, this);
		shellImpl.on('actorLongined',function(){
			this.loginDtd.resolve();
		},this);
	};

	Model.prototype.createIMImpl = function() {
		// 由继承页面实现
	};

	Model.prototype._doCallFN = function(event) {
		var fn = event.fn, param = event.param;
		if ($.isFunction(this[fn])) {
			event.result = this[fn].call(this, param);
		}
	};

	Model.prototype._doShowPage = function(event) {
		var container = event.container, options = event.data.params, pageID = event.data.xid;
		if (container) {
			// 增加相关的class
			container.$domNode.addClass('x-chat-page-container').parent(".x-contents-content").addClass('x-chat-page-content');
		}
		if (this.hasListener('onShowPage')) {
			var eData = {
				source : this,
				pageID : pageID,
				container : container,
				options : options
			};
			this.fireEvent('onShowPage', eData);
		}
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

	Model.prototype.showLoginDialog = function() {
		var dlg = this.getLoginDialog();
		if (dlg)
			dlg.open();
	};

	Model.prototype.loggedIn = function() {
	};
	Model.prototype.toChooseOrg = function(event) {
	};
	Model.prototype._doInit = function() {
		if (this.hasListener('onInit')) {
			var eData = {
				source : this,
				config : this._cfg
			};
			this.fireEvent('onInit', eData);
		}
		this.createIMImpl();
		this.createShellImpl();
		IM.autoLogin();
	};

	Model.prototype.modelModelConstruct = function(event) {
		this._doInit();
		$('head').append("<title>铛铛</title>");
		
		if(window.Keyboard && Keyboard.shrinkView){
			Keyboard.shrinkView(false);
		}
		
		$(window).on('statusTap',function(){
			var activePage = justep.Shell.impl.getActivePage();
			if (activePage && activePage.innerContainer && activePage.innerContainer.getInnerModel()) {
				activePage.innerContainer.getInnerModel().fireEvent("statusTap");
			}
		});
		
	};

	return Model;
});