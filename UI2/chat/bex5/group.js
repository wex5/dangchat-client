define(function(require) {
	var IMBizImpl = require("./js/im.biz.impl");
	var IM = require("../base/js/im");
	var Model = function() {
		this.callParent();
	};

	// 进入添加成员页面
	Model.prototype.addMemberBtnClick = function(event) {
		var self = this;
		if (IM.impl instanceof IMBizImpl)
			IM.impl.loginBiz().then(function() {
				self.comp("personalOrgDialog").open();
			});
	};
	
	Model.prototype.personalOrgDialogReceive = function(event) {
		var id = this.params.id;
		var type = this.params.type;
		var peer = IM.getPeer(id, type);
		var data = event.data;
		var invitePerson = function(uid) {
			IM.inviteMember(peer.id, uid);
		};
		for (var i = 0; i < data.length; i++) {
			var person = IM.getPerson(data[i].val("sPersonID"));
			IM.regPerson(person).done(invitePerson);
		}
	};

	return Model;
});