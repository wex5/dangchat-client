define(function(require) {
	var IM = require("../base/js/im");
	var Model = function() {
		this.callParent();
	};

	// 进入添加成员页面
	Model.prototype.addMemberBtnClick = function(event) {
		this.comp("windowDialog").set({
			src : require.toUrl("./chooseContact.w"),
			title : '添加群成员'
		});
		this.comp("windowDialog").open({
			params : {
				fromDialog : true,
				createGroup : true
			}
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

	Model.prototype.windowDialogReceived = function(event) {
		var id = this.params.id;
		var type = this.params.type;
		var peer = IM.getPeer(id, type);
		var data = event.data;
		var invitePerson = function(uid) {
			IM.inviteMember(peer.id, uid);
		};
		for (var i = 0; i < data.length; i++) {
			var person = IM.getPerson(data[i].val("fSpersonID"));
			IM.regPerson(person).done(invitePerson);
		}
	};

	return Model;
});