define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.gridRowClick = function(event) {
		if (event.row && event.row.val('sPersonID')) {
			var contactId = event.row.val("sPersonID");
			justep.Shell.fireEvent('onContactInfoPage', {
				contactId : contactId
			});
		}
		// else {
		// justep.Shell.fireEvent('createDeptDlg', {
		// sFID : event.row.val('sFID'),
		// sName : event.row.val('sName')
		// });
		// }
		// if(event.row&&event.row.val('sFID')&&event.row.val('sName')){
		//		
		// }
	};

	return Model;
});