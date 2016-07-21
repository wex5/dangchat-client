define(function(require) {
	var $ = require("jquery");
//	var justep = require("$UI/system/lib/justep");
	var IM = require("./js/im");
	
	var Model = function() {
		this.callParent();
	};
	
	Model.prototype.modelParamsReceive = function(event){
		//根据接收到的参数设置页面的caption
		switch(this.params.editType) {
			case "myAboutMe":
				$(this.getElementByXid('title')).text("关于我");
				this.comp("editItem").set({"placeHolder":"请输入关于我"});
				$(this.comp("editItem").domNode).css("display", "none");
				$(this.comp("aboutMe").domNode).css("display", "block");
				this.showAboutMe(this.params.userId);
				break;
			default:
				break;
		}
	};
	
	Model.prototype.getUser = function(userId) {
		var user = IM.getUser(userId);
		return user;
	};
	
	Model.prototype.showAboutMe = function(userId) {
		var user = this.getUser(userId);
		if(user) {
			this.comp("aboutMe").val(user.about ? user.about : "");
		}	
	};
	
	Model.prototype.okBtnClick = function(event){
		//根据接收到的参数设置页面的caption
		switch(this.params.editType) {
			case "myAboutMe":
				IM.editMyAbout(this.comp("aboutMe").val());
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