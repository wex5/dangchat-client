define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("./js/im");

	var Model = function() {
		this.callParent();
		this.deptName = justep.Bind.observable();
	};

	Model.prototype.sendMessageBtnClick = function(event) {
		var sFID = this.params.sFID;
		var sName = this.params.sName;
		IM.createDeptDlg(sFID, sName).done(function(peer) {
			justep.Shell.fireEvent("onSendMessagePage", {
				id : peer.id,
				type : peer.type
			});
		});
	};

	Model.prototype.modelModelConstructDone = function(event) {
		this.deptName.set(this.params.sName);
	};

	Model.prototype.personalBtnClick = function(event) {
		justep.Shell.showPage("personal");
	};

	return Model;
});