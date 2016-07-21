define(function(require) {
	var $ = require("jquery");
//	var justep = require("$UI/system/lib/justep");
	var IM = require("./js/im");

	var Model = function() {
		this.callParent();
	};
	Model.prototype.getGroup = function(gid) {
		var group = IM.getGroup(gid);
		return group;
	};

	Model.prototype.modelParamsReceive = function(event) {
		// 根据接收到的参数设置页面的caption
		switch (this.params.editType) {
		case "groupAbout":
			$(this.getElementByXid('title')).text("关于群");	
			$(this.comp("editItem").domNode).css("display", "none");
			$(this.comp("groupAbout").domNode).css("display", "block");
			this.showGroupAbout(this.params.gid);
			break;
			case "groupTitle":
			$(this.getElementByXid('title')).text("群名称");
			$(this.comp("editItem").domNode).css("display", "block");
			$(this.comp("groupAbout").domNode).css("display", "none");
			this.comp("editItem").set({
				"placeHolder" : "请输入群名称"
			});
			this.showGroupTitle(this.params.gid);
			break;
		default:
			break;
		}
	};
	
	Model.prototype.showGroupTitle = function(gid) {
		var group = this.getGroup(gid);
		if(group){
			this.comp("editItem").val(group.name ? group.name : "");
		}
	};
	
	Model.prototype.showGroupAbout = function(gid) {
		var group = this.getGroup(gid);
		if (group) {
			this.comp("groupAbout").val(group.about ? group.about : "");
		}
	};

	Model.prototype.okBtnClick = function(event) {
		// 根据接收到的参数设置页面的caption
		switch (this.params.editType) {
		case "groupAbout":
			IM.editGroupAbout(this.params.gid, this.comp("groupAbout").val());
			break;
		case "groupTitle":
			IM.editGroupTitle(this.params.gid, this.comp("editItem").val());
			break;
		default:
			break;
		}
		
		if(this.params.pc){
			this.owner.close();
		}else{
			this.close();
		}
	};

	Model.prototype.cancelBtnClick = function(event){
		if(this.params.pc){
			this.owner.close();
		}else{
			this.close();
		}
	};

	return Model;
});