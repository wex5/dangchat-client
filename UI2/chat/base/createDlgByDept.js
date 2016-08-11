define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("./js/im");

	var Model = function() {
		this.callParent();
		this.deptName = justep.Bind.observable();
		this.createGroupState = justep.Bind.observable(true);
	};

	Model.prototype.sendMessageBtnClick = function(event) {
		var self = this;
		var sFID = this.params.sFID;
		var sName = this.params.sName;
		if(this.createGroupState.get()){
			justep.Util.confirm("确定将此部门及其子部门下所有人创建为群组？", function() {
				self.createGroupState.set(false);
				IM.createDeptDlg(sFID, sName).done(function(peer) {
					justep.Shell.fireEvent("onSendMessagePage", {
						id : peer.id,
						type : peer.type
					});
					//self.getElementByXid('sendMessageBtn').disabled = false;
				});
			});
		}else{
			justep.Util.hint("正在创建群组请稍后...");
		}
	};

	Model.prototype.modelModelConstructDone = function(event) {
		this.deptName.set(this.params.sName);
	};

	Model.prototype.personalBtnClick = function(event) {
		justep.Shell.showPage("personal");
	};

	Model.prototype.modelInactive = function(event){
		this.createGroupState.set(true);
	};

	return Model;
});