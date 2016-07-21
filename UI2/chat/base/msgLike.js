define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("./js/im");

	var Model = function() {
		this.callParent();
		this.time = 0;
		this.timer = null;
		this.i = 0;
		this.row_touch = justep.Bind.observable();
	};

	Model.prototype.dataCustomRefresh = function(event) {
		var deferred = $.Deferred();
		event.promise = deferred.promise();
		IM.getLikeMsgs("", 20, 0).then(function(data) {
			var rows = data.rows || [];
			$.each(rows, function(i, row) {
				var senderpid = row['fsenderpid'].value;
				var person = IM.getPerson(senderpid);

				row['fsendericon'] = person.avatar;
			});
			event.source.loadData(rows);
			deferred.resolve();
		});
	};

	Model.prototype.getSenderName = function(row) {
		var type = row.val('fdialogtype');
		return type === 'user' ? row.val('fsendername') : (row.val('fdialogname') + "-" + row.val('fsendername'));
	};

	Model.prototype.touchstart = function(event) {
		this.row_touch.set(event.bindingContext.$object);
		this._pos = {
			x : event.originalEvent.changedTouches[0].pageX,
			y : event.originalEvent.changedTouches[0].pageY
		};
		var self = this;
		var popMenu = this.comp('popMenu');
		popMenu._fdialogid = event.bindingContext.$object.val("fdialogid");
		popMenu._fdialogtype = event.bindingContext.$object.val("fdialogtype");
		popMenu._fmsgid = event.bindingContext.$object.val("fmsgid");
		this.time = 0;
		if (this.timer)
			this.clsTimer();
		this.timer = setInterval(function() {
			self.time += 1;
			if (self.time >= 1) {
				popMenu.set('anchor', event.target);
				popMenu.show();
				self.clsTimer();
			}
		}, 1000);
	};

	Model.prototype.touchend = function(event) {
		this.clsTimer();
	};

	Model.prototype.clsTimer = function() {
		if (this.timer)
			clearInterval(this.timer);
		this.timer = null;
	};

	Model.prototype.removeLikeBtnClick = function(event) {
		var popMenu = this.comp('popMenu');
		var fdialogid = popMenu._fdialogid;
		var fdialogtype = popMenu._fdialogtype;
		var fmsgid = popMenu._fmsgid;
		var peer = IM.getPeer(fdialogid, fdialogtype);
		IM.removeLike(peer, fmsgid);
		this.comp('data').refreshData();
	};

	Model.prototype.li1Touchmove = function(event) {
		var moveX = Math.abs(this._pos.x - event.originalEvent.changedTouches[0].pageX);
		var moveY = Math.abs(this._pos.y - event.originalEvent.changedTouches[0].pageY);
		if (moveX > 10 || moveY > 10) {
			this.clsTimer();
		}
	};

	Model.prototype.popMenuHide = function(event) {
		if (justep.Browser.isIphone) {
			this.i++;
			if (this.i >= 2) {
				this.comp('popMenu').hide();
				this.i = 0;
			} else {
				this.comp('popMenu').show();
			}

		} else {
			this.comp('popMenu').hide();
		}
	};

	Model.prototype.rightClick = function(event) {
		if (event.button == 2) {
			var popMenu = this.comp('popMenu');
			popMenu._fdialogid = event.bindingContext.$object.val("fdialogid");
			popMenu._fdialogtype = event.bindingContext.$object.val("fdialogtype");
			popMenu._fmsgid = event.bindingContext.$object.val("fmsgid");
			popMenu.set('anchor', event.target);
			setTimeout(function() {
				popMenu.show();
			}, 0);
		}
	};
	
	Model.prototype.contentTouchend = function(event){
		this.row_touch.set();
	};

	return Model;
});
