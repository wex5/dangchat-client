define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var IM = require("../../base/js/im");
	var Model = function() {
		this.callParent();
	};
	
	Model.prototype.init = function() {
		var self = this;
		var domNode = this.getElementByXid('divAvatar');
		var avatar = this.getElementByXid('avatar');
		var uploader = IM.bindChangeMyAvatar(justep.Baas.BASE_URL+'/org/personAvatar/personAvatar', "img", domNode);
		
		uploader.on("onBefore",function(evt){
			if(evt.promise === null){
				evt.promise = $.Deferred();
			}
			self.comp("clipDialog").set({
				status : "normal"
			});
			self.comp("clipDialog").open({data:{file:evt.data,promise:evt.promise}});
		});
		
		uploader.on('onSuccess', function(evt) {
			avatar.src = IM.getCurrentPerson().avatar;
			$(avatar).show();
			$(self.getElementByXid("div5")).hide();
		});
	};
	
	Model.prototype.aboutMePanelClick = function(event) {
		var userId = IM.getCurrentPerson().uid;
		this.comp("windowDialog").set({
					src:require.toUrl("./editUser.w"),
					title : '关于我',
					status : "normal"
					});
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