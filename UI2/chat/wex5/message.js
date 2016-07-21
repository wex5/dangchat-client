define(function(require) {

	var Model = function() {
		this.callParent();
	};
	Model.prototype.getImageUrl = function(url) {
		if (url) {
			return require.toUrl(url);
		} else {
			return "";
		}
	};
	Model.prototype.getContactListUrl = function() {
		return require.toUrl("./contactList.w");
	};
	return Model;
});