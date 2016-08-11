define(function(require) {
	var $ = require("jquery");
	var IM = require("./js/im");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function() {
		this.callParent();
		this.userIds = [];
		this.createGroupState = justep.Bind.observable(true);
	};

	Model.prototype.modelLoad = function(event) {
		$(this.comp("groupName").domNode).focus();
	};

	// 创建群组
	Model.prototype.createGroupBtnClick = function(event) {
		// if (!this.createGroupState) { }
		var self = this;
		var title = this.comp('groupName').val();
		if(this.createGroupState.get()){
			this.createGroupState.set(false);
			if (title) {
				//this.createGroupState = true;
				IM.createGroup(title, null, this.userIds).then(function(peer) {
					justep.Shell.fireEvent("onSendMessagePage", {
						id : peer.id,
						type : peer.type
					});
					//self.createGroupState = false;
				}, function(e) {
					self.createGroupState = false;
					justep.Util.hint("创建失败！");
				});
			} else {
				//justep.Util.hint("请输入群名称！");
				var data = this.comp('contactsData');
				if (data.count() < 3) {
					data.each(function(params) {
						var row = params.row;
						title = title + '、' + row.val('fName');
					});
					title = IM.getCurrentPerson().name + title + '...';
					IM.createGroup(title, null, this.userIds).then(function(peer) {
						justep.Shell.fireEvent("onSendMessagePage", {
							id : peer.id,
							type : peer.type
						});
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
						justep.Shell.fireEvent("onSendMessagePage", {
							id : peer.id,
							type : peer.type
						});
					});
				}
			}
		}else{
			justep.Util.hint("正在创建群组请稍后...");
		}
	};

	// 得到选中联系人ID
	Model.prototype.getUserIds = function(event) {
		var value = event.value;
		if (value === "1") {
			this.userIds.push(event.bindingContext.$object.getID());

		} else {
			var index = this.userIds.indexOf(event.bindingContext.$object.getID());
			this.userIds.splice(index, 1);
		}
	};

	Model.prototype.modelModelConstruct = function(event) {
		this.init();
	};
	Model.prototype.init = function() {
	};

	Model.prototype.modelParamsReceive = function(event) {
		this.userIds = [];
		this.comp('groupName').val("");
		this.comp("contactsData").clear();
		$(this.comp("newfirend").domNode).hide();
	};

	Model.prototype.deleteMember = function(event) {
		var self = this;
		justep.Util.confirm("删除该联系人？", function() {
			var data = self.comp("contactsData");
			var row = event.bindingContext.$object;
			var uid = row.val("fID");
			var index = self.userIds.indexOf(uid);
			data.deleteData(row);
			self.userIds.splice(index, 1);
			if (data.getCount() === 0) {
				$(self.comp("newfirend").domNode).hide();
			}
		});
	};

	Model.prototype.modelInactive = function(event){
		this.createGroupState.set(true);
	};

	return Model;
});