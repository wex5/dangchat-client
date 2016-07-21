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
		this.loadPerson().done(function(persons) {
			var rows = [];
			$.each(persons, function(i, v) {
				if (v.sFID.indexOf(sFID) === 0) {
					rows.push(IM.getPerson(v.sPersonID));
				}
			});
			if (rows.length >= 0) {
				justep.Util.confirm("确定将此部门及其子部门下所有人创建为群组？", function() {
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
						self.personNum = rows.length;
						IM.regPerson(rows[i]).done(addPerson.bind());
					}
				});
			}
		});
	};

	Model.prototype.loadPerson = function(event) {
		var deferred = $.Deferred();
		justep.Baas.sendRequest({
			"url" : "/chat/loadPerson",
			"action" : "loadPerson",
			"async" : false,
			"params" : {
				"sPersonID" : IM.getCurrentPerson().id
			},
			"success" : function(data) {
				var persons = data.persons;
				deferred.resolve(persons);
			}
		});
		return deferred.promise();
	};

	Model.prototype.modelModelConstructDone = function(event) {
		this.deptName.set(this.params.sName);
	};

	Model.prototype.personalBtnClick = function(event) {
		justep.Shell.showPage("personal");
	};

	return Model;
});