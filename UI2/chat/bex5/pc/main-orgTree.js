define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Model = function() {
		this.callParent();
		justep.Shell.on('onContactInfoPage', function(event) {
			this.comp('contentContainer').refresh(require.toUrl('./contact.w'), {
				"contactId" : event.contactId

			});
		}, this);
		justep.Shell.on('createDeptDlg', function(event) {
			this.comp('contentContainer').refresh(require.toUrl('./createDlgByDept.w'), {
				sFID : event.sFID,
				sName : event.sName
			});
		}, this);
	};
	return Model;
});