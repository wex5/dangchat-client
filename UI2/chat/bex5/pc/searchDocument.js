define(function(require) {
	// var $ = require("jquery");
	var Model = function() {
		this.callParent();
		this.on("onShowImg", function(event) {
			if (event.items instanceof Array)
				$.each(event.items, function(i, item) {
					if (item.w && item.h) {
						item.w *= 2;
						item.h *= 2;
					}
				});
		});
	};
	return Model;
});