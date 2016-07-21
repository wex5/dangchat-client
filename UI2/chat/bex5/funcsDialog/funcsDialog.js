/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");

	var url = require.normalizeName("./funcsDialog");
	var ComponentConfig = require("./funcsDialog.config");

	var FuncsDialog = WindowDialog.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		constructor : function(options) {
			this.mode = "runFunc";
			this.filter = "";

			this.callParent(options);
			this.src = require.toUrl('./dialog/funcList.w');
		},
		doInit : function(value, bindingContext) {
			this.callParent(value, bindingContext);
		},
		buildTemplate : function(cfg) {
			var e = this.callParent(cfg);
			e.attr('component', url);
			return e;
		},
		open : function(option){
			option = option || {};
			option.params = option.params || {};
			option.params.mode = this.mode;
			option.params.title = this.title || "我的应用";
			option.params.filter = this.filter;
			this.callParent(option);
		}
	});

	justep.Component.register(url, FuncsDialog);
	return FuncsDialog;
});