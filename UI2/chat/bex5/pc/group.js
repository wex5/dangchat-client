define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("../../base/js/im");
	var IMBizImpl = require("../js/im.biz.impl");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.addMembersBtnClick = function(event) {
		var self = this;
		if (IM.impl instanceof IMBizImpl)
			IM.impl.loginBiz().then(function() {
				self.comp("personalOrgDialogPC").open();
			});
	};

	Model.prototype.groupSendMessageBtnClick = function(event) {
		if (this.params.formDilog) {
			this.owner.close();
		}
		justep.Shell.fireEvent("onGroupSendMessagePage", {
				id : this.params.id,
				type : this.params.type
		});
	};

	Model.prototype.editNameClick = function(event) {
		if (this.adminId == IM.getUid()) {
			var gid = this.params.id;
			this.comp("windowDialog").set({
				src : require.toUrl("./editGroup.w"),
				title : '群名称',
			});
			this.comp("windowDialog").open({
				params : {
					"gid" : gid,
					"editType" : "groupTitle",
					"pc" : true
				}
			});
		}
	};

	Model.prototype.groupAboutClick = function(event) {
		if (this.adminId == IM.getUid()) {
			var gid = this.params.id;
			this.comp("windowDialog").set({
				src : require.toUrl("./editGroup.w"),
				title : '群介绍',
			});
			this.comp("windowDialog").open({
				params : {
					"gid" : gid,
					"editType" : "groupAbout",
					"pc" : true
				}
			});
		}
	};

	return Model;
});