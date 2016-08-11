define(function(require) {
	// var $ = require("jquery");
	var IM = require("../../base/js/im");
	var justep = require("$UI/system/lib/justep");
	var IMBizImpl = require("../js/im.biz.impl");
	var Model = function() {
		this.callParent();
		this.userIds = [];
	};
	Model.prototype.addBtnClick = function(event) {
		var self = this;
		if (IM.impl instanceof IMBizImpl)
			IM.impl.loginBiz().then(function() {
				self.comp("orgDialogPC").open({
					"data" : {
						selected : []
					}
				});
			});
	};
	Model.prototype.orgDialogPCReceive = function(event) {
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
	Model.prototype.createGroupBtnClick = function(event) {
		var title = this.comp('groupName').val();
		var self = this;
		if(this.createGroupState.get()){
			this.createGroupState.set(false);
			if (title) {
				IM.createGroup(title, null, this.userIds).then(function(peer) {
					justep.Shell.fireEvent("onGroupSendMessagePage", {
						id : peer.id,
						type : peer.type
					});
					self.owner.close();
				});
			} else {
				// justep.Util.hint("请输入群名称！");
				var data = this.comp('contactsData');
				if (data.count() < 3) {
					data.each(function(params) {
						var row = params.row;
						title = title +'、'+row.val('fName');
					});
					title = IM.getCurrentPerson().name + title + '...';
					IM.createGroup(title, null, this.userIds).then(function(peer) {
						justep.Shell.fireEvent("onGroupSendMessagePage", {
							id : peer.id,
							type : peer.type
						});
						self.owner.close();
					});
				} else {
					var index = 1;
					data.each(function(params) {
						if (index < 3) {
							var row = params.row;
							title = title + '、' + row.val('fName');
						}
						index++;
					});
					title = IM.getCurrentPerson().name + title + '...';
					IM.createGroup(title, null, this.userIds).then(function(peer) {
						justep.Shell.fireEvent("onGroupSendMessagePage", {
							id : peer.id,
							type : peer.type
						});
						self.owner.close();
					});
				}
			}
		}else{
			justep.Util.hint("正在创建群组请稍后...");
		}
	};
	Model.prototype.modelParamsReceive = function(event) {
		this.userIds = [];
		this.comp('groupName').val("");
		this.comp("contactsData").clear();
		$(this.comp("newfirend").domNode).hide();
	};
	return Model;
});