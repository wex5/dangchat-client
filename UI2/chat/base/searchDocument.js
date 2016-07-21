define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var fileApi = require("$UI/system/components/justep/docCommon/fileApi");
	var PhotoSwipe = require("../lib/photoswipe/photoswipe.min");
	var PhotoSwipeUI_Default = require("../lib/photoswipe/photoswipe-ui-default.min");
	var IM = require("./js/im");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelModelConstructDone = function(event) {
		var self = this;
		var rows = [], message;
		var option = {
			currentUserId : this.params.currentUserId,
			senderUserId : this.params.sId,
			destUserId : this.params.destId,
			groupId : this.params.groupId
		};
		IM.getSearchDoc(option).done(function(searchDoc) {
			if (searchDoc.length > 0) {
				for (var i = 0; i < searchDoc.length; i++) {
					message = searchDoc[i];
					rows.push({
						fID : message.rid,
						fContent : message.content,
						fDate : justep.Date.toString(justep.Date.fromString(message.date, "yyyy-MM-dd hh:mm"),"yyyy-MM-dd hh:mm"),
						fFileId : message.fileId,
						fFileName : message.fileName,
						fFileSize : message.fileSize,
						fFileUrl : message.fileUrl,
						fReceiverUserId : message.receiverUserId,
						freceiverUserName : message.receiverUserName,
						fSenderUserId : message.senderUserId,
						fSenderUserName : message.senderUserName,
						fImg : IM.getPersonByUID(message.senderUserId).avatar,
						fType : message.type,
						fWidth : message.width,
						fHeight : message.height
					});
				}
				self.comp('data').loadData(rows);
				$(self.comp("searchDoc").domNode).show();
			} else {
				justep.Util.hint('暂无历史文档');
			}
		});
		this.initEvent();
	};

	var getPhotos = function(data) {
		var row, photos = [];
		data.each(function(params) {
			row = params.row;
			if (row.val("fType") === "photo") {
				photos.push({
					w : row.val('fWidth'),
					h : row.val('fHeight'),
					fileName : row.val("fFileName"),
					url : row.val("fFileUrl")
				});
			}
		});
		return photos;
	};
	Model.prototype.initEvent = function(event) {
		var list = this.getElementByXid('list');
		$(list).on("click.photo", ".img-rounded", this.viewImageHandle.bind(this));
		$(list).on("click.file", "a.fileMsg", this.fileClickHandle.bind(this));
	};
	Model.prototype.viewImageHandle = function(event) {
		// TODO 图片预览
		var data = this.comp('data');
		var index;
		var photos = getPhotos(data);
		if (photos.length > 0) {
			var ctx = justep.Bind.contextFor(event.target);
			var fileUrl = ctx.$object.val("fFileUrl");
			index = -1;
			$.each(photos, function(i, photo) {
				if (photo.url === fileUrl) {
					index = i;
					return false;
				}
			});
			if (index > -1) {
				this.showImgs(photos, index);
			}
		}
	};

	Model.prototype.showImgs = function(photos, index) {
		var self = this;
		var pswpElement = this.getElementByXid('pswp');
		var items = [];
		$.each(photos, function(i, photo) {
			items.push({
				src : photo.url,
				w : photo.w,
				h : photo.h
			});
		});
		var options = {
			index : index,
			history : false,
			captionEl : false,
			fullscreenEl : false,
			shareEl : false,
			maxSpreadZoom : 3,
			tapToClose : true
		};
		this.fireEvent("onShowImg", {
			options : options,
			items : items
		});
		this._gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		this._gallery.listen('close', function() {
			self.comp('router').removeRouteItem('gallery');
			self.comp('router').publishState();
		});
		this._gallery.init();
		this.comp('router').addRouteItem('gallery');
		this.comp('router').publishState();
	};

	Model.prototype.fileClickHandle = function(event) {
		var ctx = justep.Bind.contextFor(event.target);
		var fileUrl = ctx.$object.val("fFileUrl");
		var fileName = ctx.$object.val("fFileName");
		fileApi.browse(fileUrl, fileName);
	};
	Model.prototype.routerRoute = function(event) {
		if (event.name === "gallery" && event.routeState === "leave") {
			this._gallery.close();
		}
	};
	return Model;
});