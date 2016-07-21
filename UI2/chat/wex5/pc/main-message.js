define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Model = function() {
		this.callParent();
		justep.Shell.on('onShowMessagePage', function(event) {
			this.comp("contentContainer").removeClass("hide");
			this.comp('contentContainer').refresh(require.toUrl('./message.w'), {
					id : event.id,
					pid : event.pid,
					type : event.type
			});
		}, this);
		justep.Shell.on('onCloseMessagePage', function(event) {
			this.comp("contentContainer").addClass("hide");
		}, this);
	};
	return Model;
});