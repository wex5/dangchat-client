define(function(require){
//	var $ = require("jquery");
	var IM = require("../../base/js/im");
	var Model = function(){
		this.callParent();
	};
	Model.prototype.aboutMeClick = function(event){
		var userId = IM.getCurrentPerson().uid;
		this.comp("windowDialog").set({src:require.toUrl("./editUser.w"),title : '关于我',});
		this.comp("windowDialog").open({
			params : {
				"userId" : userId,
				"editType" : "myAboutMe",
				"pc" : true
			}
		});
	};
	return Model;
});