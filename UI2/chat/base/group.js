define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("./js/im");

	var Model = function() {
		this.callParent();
		this.adminId;
		this.isAdmin = justep.Bind.observable(false);
		this.groupMembersUid = [];
	};

	// 获取群详细
	Model.prototype.loadGroupMembers = function() {
		var self = this;
		var id = this.params.id;
		var type = this.params.type;
		var peer = IM.getPeer(id, type);
		self._bindGroupHandle = IM.bindGroup(peer.id, function(group) {
			self.comp("isShareGroup").set({
				"checked" : group.isShare
			});
			var rows = [];
			self.adminId = group.adminId;
			$(self.getElementByXid('groupName')).text(group.name);
			$(self.getElementByXid('groupAbout')).text(group.about ? group.about : "暂无群介绍");
			$(self.getElementByXid('avatar')).attr("src", group.avatar ? group.avatar : IM.getGroupDefaultIcon());
			for (var i = 0; i < group.members.length; i++) {
				var person = IM.getPersonByUID(group.members[i].peerInfo.peer.id);
				self.groupMembersUid.push(group.members[i].peerInfo.peer.id);
				rows.push({
					fID : group.members[i].peerInfo.peer.id,
					fName : person.name,
					fImg : person.avatar,
					fIsAdmin : self.adminId == group.members[i].peerInfo.peer.id,

				});
			}
			self.comp("groupMembersData").loadData({
				rows : rows
			});
		});
	};

	Model.prototype.currentPersonIsAdmin = function(isAdmin) {
		if (IM.getCurrentPerson().uid == this.adminId) {
			if (isAdmin) {
				return false;
			}
			return true;
		} else {
			return false;
		}
	};

	Model.prototype.modelModelConstruct = function(event) {
		this.init();
		this.isAdmin.set(IM.getGroup(this.params.id).adminId == IM.getCurrentPerson().uid);
	};

	Model.prototype.init = function() {
		this.loadGroupMembers();
	};

	// 解散群
	Model.prototype.dismiss = function(event) {
		var self = this;
		var gid = this.params.id;
		var peer = IM.getGroupPeer(gid);
		justep.Util.confirm("解散本群？", function() {
			var pRows = [];
			for (var i = 0; i < self.groupMembersUid.length; i++) {
				if (self.groupMembersUid[i] != IM.getUid()) {
					pRows.push(IM.kickMember(gid, self.groupMembersUid[i]));
				}
			}
			$.when.apply($, pRows).done(function() {
				IM.leaveGroup(gid).then(function() {
					IM.deleteChat(peer);
					self.owner.close();
					if (justep.Browser.isPC)
						justep.Shell.fireEvent('onCloseMessagePage');
				});
			});
		});
	};

	// 删除群成员
	Model.prototype.deleteMember = function(event) {
		// 判断该用户是否是群主
		if (this.adminId == IM.getUid()) {
			var gid = this.params.id;
			var uid = event.bindingContext.$object.val("fID");
			if (uid != IM.getUid()) {
				justep.Util.confirm("将联系人剔除本群？", function() {
					IM.kickMember(gid, uid);
				});
			}
		}
	};
	// 进入修改群介绍页面
	Model.prototype.groupAboutPanelClick = function(event) {
		if (this.adminId == IM.getUid())
			this.showEditPage("groupAbout");
	};
	// 进入修改群名称页面
	Model.prototype.groupTitleClick = function(event) {
		if (this.adminId == IM.getUid())
			this.showEditPage("groupTitle");
	};

	Model.prototype.showEditPage = function(editType) {
		var gid = this.params.id;
		if (gid) {
			justep.Shell.showPage("editGroup", {
				"gid" : gid,
				"editType" : editType
			});
		}
	};

	Model.prototype.personalBtnClick = function(event) {
		justep.Shell.showPage("personal");
	};

	Model.prototype.sendMessageBtnClick = function(event) {
		justep.Shell.fireEvent("onSendMessagePage", {
			id : this.params.id,
			type : this.params.type
		});
	};

	Model.prototype.modelUnLoad = function(event) {
		if (this._bindGroupHandle)
			this._bindGroupHandle.unbind();
	};

	Model.prototype.leaveGroupBtnClick = function(event) {
		var id  = this.params.id;
		var type = this.params.type;
		var peer = IM.getPeer(id,type);
		justep.Util.confirm("删除并退出该群?", function() {
			IM.leaveGroup(peer.id).then(function() {
				IM.deleteChat(peer);
				justep.Shell.showMainPage();
			});
		});
	};

	Model.prototype.isShareGroupChange = function(event){
		var id = this.params.id;
		if(event.checked){
			IM.updateGroupShared(id,"#|$,1");
		}else{
			IM.updateGroupShared(id,"#|$,0");
		}
	};

	return Model;
});