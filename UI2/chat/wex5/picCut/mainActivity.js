define(function(require) {
	var $ = require("jquery");

	require("./js/cropper");
	var Baas = require("$UI/system/lib/base/baas");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.backBtnClick = function() {
		this.owner.send({data:"",promise:this.params.data.promise});
		this.close();
	};

	Model.prototype.modelLoad = function(event) {
  
		var options = {
			// data: {
			// x: 420,
			// y: 60,
			// width: 640,
			// height: 360
			// },
			// strict: false, //是否严格要求取景框必须在图片内, 默认是true
			// responsive: false,
			// checkImageOrigin: false

			modal : true, // 是否突出显示取景框，默认为true
			// guides: false, //取景框里是否有辅助线，默认是true
			// highlight: false, //这个没看明白，楼下解释
			// background: true, //是否设置背景，默认是 true

			// autoCrop: true, //是否到自动剪切模式,默认 true
			// autoCropArea: 1, //初始化完成后，取景框高度占预览图片的比例, 默认0.6
			dragCrop : false, // 是否允许用户生成取景框, 默认是true
			movable : true, // 图片是否可以移动
			rotatable : true, // 图片是否可以旋转
			zoomable : true, // 是否允许缩放图片
			touchDragZoom : true, // 是否支持手势缩放，默认为true
			// mouseWheelZoom: false, //是否支持鼠标的滚轮缩放，默认为true
			cropBoxMovable : false, // 取景框是否可以移动，默认是 true
			cropBoxResizable : true, // 用户是否能够调节取景框大小，默认为true

			aspectRatio : 1 / 1, // 取景框的宽高比
			preview : '.img-preview', // 剪裁完成后，剪裁出来的图片存放地址
		/*
		 * crop: function (data) {
		 * //初始化剪切后的回调函数，可以拿到剪裁后图片在原图上的x,y,width,height,rotate
		 * $dataX.val(Math.round(data.x)); $dataY.val(Math.round(data.y));
		 * $dataHeight.val(Math.round(data.height));
		 * $dataWidth.val(Math.round(data.width));
		 * $dataRotate.val(Math.round(data.rotate)); }
		 */
		};
		$('.cropper-example-1 > img').cropper(options);
		var blobURL = URL.createObjectURL(this.params.data.file);
		$('.cropper-example-1 > img').one('built.cropper', function() {
			URL.revokeObjectURL(blobURL); // Revoke when load complete
		}).cropper('reset').cropper('replace', blobURL);

	};

	Model.prototype.rotateBtnClick = function(event) {
		var n = 0;
		var timer = setInterval(function() {
			if (n == 45) {
				clearInterval(timer);
			} else {
				$('.cropper-example-1 > img').cropper("rotate", 1);
			}
			n++;
		}, 10);
	};

	Model.prototype.uploadBtnClick = function(event) {
		var self = this;
		/** 返回blob格式 */
		// $('.cropper-example-1 >
		// img').cropper("getCroppedCanvas").toBlob(function(blob){
		// if(blob){
		// self.close();
		// self.params.data.callback(blob);
		// }
		// });
		/** 返回base64格式 */
		var result = $('.cropper-example-1 > img').cropper("getCroppedCanvas").toDataURL();
		if (result) {
			//self.params.data.dtd.resolve(result/*,self.params.data.dtd*/);
			self.owner.send({data:result,promise:self.params.data.promise});
			self.close();
		}
	};

	return Model;
});