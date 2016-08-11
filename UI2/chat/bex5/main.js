define(function(require) {
	var IM = require("../base/js/im");

	
	var Model = function() {
		this.callParent();
	};
		// 图片路径转换
	Model.prototype.getImageUrl = function(url) {
		if (url) {
			return require.toUrl(url);
		} else {
			return "";
		}
	};
	
	Model.prototype.initEvent = function(){
		var context = this.getContext();
		IM.notification(context, IM.getCurrentPersonID());
		IM.pushNotification();
		this.callParent();
	};
	
	Model.prototype.getMessageUrl = function(){
		return require.toUrl('./message.w');
	};
	

	Model.prototype.pagesActiveChanged = function(event){
		this.callParent(event);
		$(this.getElementByXid("showMenuPopOverBtn"))[event.to === 0 || event.to === 1 ? 'show' : 'hide']();
		if(event.to === 2){
			this.comp("workContainer").load();
		}
	};
	return Model;
});