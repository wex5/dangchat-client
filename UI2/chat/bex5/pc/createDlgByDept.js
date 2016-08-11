define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("../../base/js/im");

	var Model = function() {
		this.callParent();
		this.deptName = justep.Bind.observable();
		this.createGroupState = justep.Bind.observable(true);
	};

	Model.prototype.sendMessageBtnClick = function(event) {
		var sFID = this.params.sFID;
		var sName = this.params.sName;
		var self = this;
		if(this.createGroupState.get()){
			this.createGroupState.set(false);
			justep.Util.confirm("确定将此部门及其子部门下所有人创建为群组？", function() {
				IM.createDeptDlg(sFID, sName).done(function(peer) {
					justep.Shell.fireEvent("onGroupSendMessagePage", {
						id : peer.id,
						type : peer.type
					});
					self.createGroupState.set(true);
				});
			});
		}else{
			justep.Util.hint("正在创建群组请稍后");
		}
	};

	Model.prototype.modelModelConstructDone = function(event) {
		this.deptName.set(this.params.sName);
	};

	Model.prototype.modelInactive = function(event){
		this.createGroupState.set(true);
	};

	return Model;
});