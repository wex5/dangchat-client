define(function(require) {
	var $ = require("jquery");
	var IM = require("../base/js/im");
	var Model = function() {
		this.callParent();
	};

	// 显示好友列表
	Model.prototype.addBtnClick = function(event) {
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

	Model.prototype.windowDialogReceived = function(event) {
		var self = this, data = event.data;
		if(this.comp('contactsData').count()>0){
			this.comp('contactsData').clear();
		}
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
		if(data.length>0){
			for (var i = 0; i < data.length; i++) {
				var person = IM.getPerson(data[i].val("fSpersonID"));
				IM.regPerson(person).done(addPerson.bind(person));
			}
			$(this.comp("newfirend").domNode).show();
		}else{
			$(this.comp("newfirend").domNode).hide();
		}
	};

	return Model;
});