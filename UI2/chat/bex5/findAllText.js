define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("../base/js/im");

	var Model = function() {
		this.callParent();
		this.sId;
		this.destId;
		this.groupId;
	};

	Model.prototype.modelParamsReceive = function(event) {
		this.sId = this.params.sId;
		this.destId = this.params.destId;
		this.groupId = this.params.groupId;
		$(this.getElementByXid("input")).focus();
	};

	Model.prototype.searchClick = function(event) {
		var self = this;
		var rows = [];
		var message;
		var val = $(this.getElementByXid("input")).val();
		var option = {
			sId : this.sId,
			destId : this.destId,
			groupId : this.groupId,
		};
		IM.getSearchText(val, option).done(function(searchText){
			if (searchText.length > 0) {
				for(var i = 0; i < searchText.length; i++){				
					message = searchText[i];
					rows.push({
						fID : message.rid,
						fContent : message.content,
						fMessageTime : justep.Date.toString(justep.Date.fromString(message.date, "yyyy-MM-dd hh:mm"),"yyyy-MM-dd hh:mm"),
						fImg : IM.getPersonByUID(message.senderUserId).avatar,
						fSenderName : message.senderUserName,
						fDestUserName : message.receiverUserName
					});
				}
				self.comp("textData").loadData(rows);
				$(self.comp("searchText").domNode).show();
			} else {
				justep.Util.hint("暂无此条消息记录");
				self.comp("textData").loadData(rows);
				$(self.comp("searchText").domNode).hide();
			}
		});
	};

	Model.prototype.inputKeypress = function(event) {
		if (event.keyCode === 13)
			this.searchClick(event);
	};

	return Model;
});