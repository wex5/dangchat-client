define(function(require){
	var $ = require("jquery");
	//var justep = require("$UI/system/lib/justep");
	var IM = require("../../base/js/im");
	
	var Model = function(){
		this.callParent();
		this.peer = null;
		this.img = null;
	};

	Model.prototype.sendBtnClick = function(event){
		if(this.peer && this.img)
			IM.sendClipboardPhotoMessage(this.peer, this.img);
		this.owner.close();	
	};

	Model.prototype.showImg = function(img){
		var $img = $(this.getElementByXid('img'));
		
		var reader = new FileReader();
		reader.onload = function(e) {
			var imgStr = e.target.result;
			if (imgStr.indexOf('base64,') != -1) {
				$img.attr('src', imgStr);
			}
		};
		reader.readAsDataURL(img);		
	};
	
	Model.prototype.modelParamsReceive = function(event){
		this.img = event.params.img;
		var id = event.params.id;
		var type = event.params.type;
		this.peer =IM.getPeer(id,type);
		this.showImg(this.img);
	};

	Model.prototype.cancelBtnClick = function(event){
		this.owner.close();
	};

	return Model;
});