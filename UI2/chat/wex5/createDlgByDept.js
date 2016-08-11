define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("../base/js/im");

	var Model = function() {
		this.callParent();
		this.deptName = justep.Bind.observable();
		this.userIds = [];
		this.count = 0;
		this.personNum = 0;
	};

	Model.prototype.sendMessageBtnClick = function(event) {
		var sFID = this.params.sFID;
		var sName = this.params.sName;
		var self = this;
		if(this.createGroupState.get()){
			IM.getOrgPersons(IM.getCurrentPersonID()).done(function(persons) {
				var rows = [];
				$.each(persons, function(i, v) {
					if (v.sFID.indexOf(sFID) === 0&&v.sPersonID!==IM.getCurrentPersonID()) {
						rows.push(IM.getPerson(v.sPersonID));
					}
				});
				self.personNum = rows.length;
				if (rows.length >= 0) {
					justep.Util.confirm("确定将此部门及其子部门下所有人创建为群组？", function() {
						self.createGroupState.set(false);
						var addPerson = function(uid) {  
							self.userIds.push(uid);
							self.count++;
							if (self.count == self.personNum) {
								IM.createGroup(sName, null, self.userIds).then(function(peer) {
									justep.Shell.fireEvent("onSendMessagePage", {
										id : peer.id,
										type : peer.type
									});
								}, function(e) {
									self.createGroupState = false;
									justep.Util.hint("创建失败！"); 
								});
							}
						};
						for (var i = 0; i < rows.length; i++) {
							IM.regPerson(rows[i]).done(addPerson.bind());
						}
					});
				}
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

	return Model;
});