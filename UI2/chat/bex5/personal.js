define(function(require) {
	var IM = require("../base/js/im");
	var Model = function() {
		this.callParent();
	};
	
	Model.prototype.init = function() {
		var domNode = this.getElementByXid('divAvatar');
		var avatar = this.getElementByXid('avatar');
		var uploader = IM.bindChangeMyAvatar(require.toUrl('$UI/system/service/common/bizAction.j'), 'blobData', domNode);
		uploader.on('onSuccess', function(evt) {
			avatar.src = IM.getCurrentPerson().avatar;
		});

	};
	return Model;
});