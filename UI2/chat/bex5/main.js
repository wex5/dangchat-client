define(function(require) {
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
	
	Model.prototype.getMessageUrl = function(){
		return require.toUrl('./message.w');
	};
	Model.prototype.pagesActiveChanged = function(event){
		$(this.getElementByXid("showMenuPopOverBtn"))[event.to === 0 || event.to === 1 ? 'show' : 'hide']();
		if(event.to === 2){
			this.comp("workContainer").load();
		}
	};
	return Model;
});