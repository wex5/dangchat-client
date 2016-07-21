define(function(require) {
	var IM = require("./js/im");
	var justep = require("$UI/system/lib/justep");
	var MD5 = require('$UI/system/lib/base/md5');
	var $ = require("jquery");
	var md5 = new MD5();

	var Model = function() {
		this.callParent();
	};

	Model.prototype.login = function() {
		var name = this.comp('name');
		var password = this.comp('password');
		var urlParams = {};
		urlParams.username = name.val() || $("[xid=name]").val();//为了支持360急速浏览器, 自动设置参数的情况
		urlParams.password = password.val() || $("[xid=password]").val();//同上
		urlParams.password = md5.hex_md5_salt(urlParams.password);
		urlParams.loginDate = justep.Date.toString(new Date(), 'yyyy-MM-dd');
		var client = this.getContext().getRequestParameter('client');
		if (client)
			urlParams.client = client;
		
		var self = this;
		IM.login(urlParams,this).done(function(data){
			self.owner.send(data);
			self.close();
		}).fail(function(error){
			justep.Util.hint(error);
		});
	};

	Model.prototype.loginBtnClick = function(event) {
		this.login();
	};

	Model.prototype.div1Keypress = function(event){
		if(13===event.keyCode) this.login();
	};

	return Model;
});