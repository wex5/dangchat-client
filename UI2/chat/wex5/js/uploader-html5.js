/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var Object = require('$UI/system/lib/base/object'), Observable = require('$UI/system/lib/base/observable'), localResizeImage = require('./plugins/compress/dist/lrz.bundle'), justep = require("$UI/system/lib/justep");
	$ = require('jquery');
	/* require('res!./plugins'); */

	var Uploader = Object.extend({
		mixins : Observable,
		constructor : function(selector, config) {
			var defaultConfig = {
				name : 'userfile',
				data : {},
				multiple : false,
				autoUpload : true,
				states : true,
				actionUrl : '',
				accept : config.accept,
				requestHeader : {},
				signRequestEnabled : false,
				signHeader : '',
				defaultSuccessCodes : [ 200, 201 ]
			};
			var self = this;
			$.extend(this, $.extend(defaultConfig, config));
			self.callParent();
			Observable.prototype.constructor.call(self);
			this.$rootElement = $(selector);
			self.buildTarget();
			self.buildLoadingElement();
			this.inputElement.addEventListener('change', function() {
				self.onChanged.apply(self, arguments);
			});
			/*
			 * this.$rootElement.on('click.uploader', function() {
			 * self.submit.apply(self, arguments); });
			 */
			self.enable = true;
			self.changeState('browse');
		}
	});

	Uploader.prototype.setEnable = function(enable) {
		if (enable == false) {
			this.enable = false;
			$(this.formElement()).css('visibility', 'hidden');
		} else if (enable == true) {
			this.enable = true;
			$(this.formElement()).css('visibility', 'visible');
		}
	};

	Uploader.prototype.addData = function(data) {
		$.extend(this.data, data);
	};

	Uploader.prototype.buildTarget = function() {
		if (this.$rootElement.css('position') != 'absolute') {
			this.$rootElement.css({
				position : 'relative'
			});
		}
		var mutiplyAttr = this.multiple ? 'multiple="multiple"' : "";
		if (justep.Browser.isWeChat) {
			this.accept = "image/*";
		}
		var formTpl = '<form style="position:absolute;top:-3px;right:-3px;bottom:-3px;left:-3px;"><input type="file" ' + mutiplyAttr + ' name="userfile" accept="' + this.accept
				+ '"  tabindex="-1" style="cursor: pointer;opacity:0;position: relative;z-index:999;width:100%;height:100%;overflow:hidden;"></form>';
		var $formEle = $(formTpl).appendTo(this.$rootElement);
		var self = this;
		$formEle.on('click', function(e) {
			var _data = {
				cancel : false,
				source : self
			};
			self.fireEvent('onFileSelect', _data);
			if (_data.cancel) {
				e.preventDefault();
			}
		});
		this.inputElement = $formEle.find('input').get(0);
		this.formElement = $formEle.get(0);

	};

	Uploader.prototype.dispose = function() {
		if (this.$loadingElement) {
			this.$loadingElement.remove();
		}
		if (this.inputElement) {
			$(this.formElement).remove();
			$(this.inputElement).remove();
		}
		if (this.$rootElement) {
			this.$rootElement.off('.uploader');
		}
	},

	Uploader.prototype.buildLoadingElement = function() {
		var loadingEleTpl = '<span style="display:none"></span>';
		this.$loadingElement = $(loadingEleTpl).appendTo(this.$rootElement);
	};

	Uploader.prototype.submit = function() {
		var self = this;
		if (self.currentState == 'ready') {
			var files = this.inputElement.files;
			$.each(files, function(index, file) {
				file.data = {};
				var data = {
					source : self,
					file : file,
					cancel : false
				}
				self.fireEvent('onStart', data);
				if (data.cancel === true) {
					self.changeState("browse");
					return;
				}
				self.doUpload(data.file);
			});

		}
	};

	Uploader.prototype.onChanged = function(e) {
		var self = this;
		if (e.target.files.length > 0) {
			var _event = {
				file : e.target.files[0],
				cancel : false
			};
			self.fireEvent('onFileSelected', _event);
			if (_event.cancel == true) {
				self.changeState("browse");
			} else {
				self.changeState('ready');
			}
		} else {
			// alert('File selected but not accessible');
			self.changeState('browse');
		}
	};

	Uploader.prototype.changeState = function(state) {
		var self = this;
		self.currentState = state;
		switch (state) {
		case 'browse':
			self.$loadingElement.hide();
			self.reset();
			break;
		case 'ready':
			self.$loadingElement.hide();
			if (self.autoUpload == true) {
				$(self.inputElement).hide();
				$(self.formElement).hide();
				self.submit();
			}
			break;
		case 'loading':
			self.$loadingElement.show();
		}
	};

	Uploader.prototype.parseResponse = function(_xmlHttpRequest) {
		if (_xmlHttpRequest.responseXML) {
			return _xmlHttpRequest.responseXML;
		} else {
			try {
				return JSON.parse(_xmlHttpRequest.response);
			} catch (e) {
				return _xmlHttpRequest.response;
			}
		}
	};

	Uploader.prototype.doUpload = function(file) {
		var self = this;
		self.changeState('uploading');
		var http = new XMLHttpRequest();
		if (http.upload && http.upload.addEventListener) {
			http.upload.onprogress = function(e) {
				if (e.lengthComputable) {
					var percentComplete = (e.loaded / e.total) * 100;
					self.fireEvent('onProgress', {
						percentComplete : percentComplete.toFixed(0) + '%'
					});
				}
			};
			http.onreadystatechange = function(e) {
				if (this.readyState === 4) {
					if (Array.prototype.indexOf.call(self.defaultSuccessCodes, parseInt(this.status)) != -1) {
						var response = self.parseResponse(this);
						self.fireEvent('onSuccess', {
							response : response,
							originalevent : e,
							data : file.data
						}, file.name);
					} else {
						self.fireEvent('onError', {
							status : this.status,
							originalevent : e,
							data : file.data
						});
					}
					self.changeState('browse');
				}
			};
			http.upload.onerror = function(e) {
				self.fireEvent('onError', {
					status : this.status,
					statusText : this.statusText,
					originalevent : e,
					data : file.data
				});
			};
		}
		http.open('POST', self.actionUrl);
		$.each(self.requestHeader, function(key, value) {
			http.setRequestHeader(key, value);
		});
		if (self.signRequestEnabled == true) {
			self.signRequest(http, function(http) {
				self.getForm(file).then(function(form) {
					http.send(form);
				},function(){
					self.reset();
					throw new Error("请选择图片类型文件！");
				});
			});
		} else {
			self.getForm(file).then(function(form) {
				http.send(form);
			},function(){
				self.reset();
				throw new Error("请选择图片类型文件！");
			});
		}
	};

	Uploader.prototype.isImage = function(fileName) {
		var rExt = /\.([^.]+)$/;
		var ext = rExt.exec(fileName) ? RegExp.$1.toLowerCase() : '';
		return 'jpg,jpeg,png,gif,bmp'.indexOf(ext) > -1;
	};

	Uploader.prototype.getForm = function(file) {
		var self = this;
		var dtd = $.Deferred();
		var promise=null;
		if (this.isImage(file.name) && file.compress != false && this.compress) {
			var eventData = {
				data : file,
				promise : promise
			}
			self.fireEvent("onBefore",eventData);
			promise = eventData.promise;
			if(promise && $.isFunction(promise.then)){
				promise.then(function(file){
					 localResizeImage(file, {
						 width: 800,
						 fieldName: self.name
					 }).then(function(result){
						 var formData = result.formData;
						 dtd.resolve(self._getForm(file,formData));
					 }).catch(function(){
						 dtd.resolve(self._getForm(file));
					 });
				});
			}
		} else {
			//dtd.resolve(this._getForm(file));
			dtd.reject();
		}
		return dtd.promise();
	};

	Uploader.prototype._getForm = function(file, formData) {
		if (!formData) {
			formData = new FormData();
			formData.append(this.name, file);
		}
		$.each(this.data, function(key, value) {
			formData.append(key, value);
		});
		if (file.data) {
			$.each(file.data, function(key, value) {
				formData.append(key, value);
			});
		}
		return formData;
	};

	Uploader.prototype.reset = function() {
		var self = this;
		$(self.formElement).show();
		$(self.inputElement).show();
		self.formElement.reset();
	};

	Uploader.prototype.signRequest = function(http, callback) {
		var self = this;
		var header = self.getSignHeader();
		self.signProvider(function(token) {
			http.setRequestHeader(header, token);
			callback(http);
		}, function(failureText) {
			self.fireEvent('onSignProviderError', {
				msg : 'Request signing is failed! ' + failureText
			});
		});
	};

	Uploader.prototype.signProvider = function(success, failure) {
		success('default-token');
	};

	return Uploader;
});