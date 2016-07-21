define(function(require) {
	var $ = require("jquery");
	var IM = require("../base/js/im");
	var IMBizImpl = require("./js/im.biz.impl");
	var Model = function() {
		this.callParent();
	};

	// 显示好友列表
	Model.prototype.addBtnClick = function(event) {
		var self = this;
		if (IM.impl instanceof IMBizImpl)
			IM.impl.loginBiz().then(function() {
				self.comp("personalOrgDialog").open({
					"data" : {
						selected : {
							kind : "",
							value : ""
						}
					}
				});
			});

	};

	Model.prototype.personalOrgDialogReceive = function(event) {
		var self = this, data = event.data;
		var addPerson = function(uid) {
			var rows = self.comp("contactsData").find([ 'fID' ], [ uid ]);
			if (rows.length === 0) {
				self.userIds.push(uid);
				self.comp("contactsData").newData({
					defaultValues : [ {
						fID : uid,
						fName : this.name,
						fNickName : this.name,
						fImg : this.avatar ? this.avatar : IM.getPersonDefaultIcon(),
						fAbout : this.about
					} ]
				});
			}
		};
		for (var i = 0; i < data.length; i++) {
			var person = IM.getPerson(data[i].val("sPersonID"));
			IM.regPerson(person).done(addPerson.bind(person));
		}

		$(this.comp("newfirend").domNode).show();
	};

	return Model;
});