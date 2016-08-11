define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IMImpl = require('../../base/js/im.impl');
	var Person = require("../../base/js/person");

	var Uploader = require('$UI/system/components/justep/uploader/uploader');

	var biz = require('$UI/system/lib/biz');
	var Org = require("$UI/system/components/justep/org/js/org");
	var OrgUtil = Org.Util;

	var loginAction = "../login/login.j";
	var logoutAction = '$UI/system/service/common/logout.j';
	var process = '/SA/OPM/system/systemProcess';
	var activity = 'mainActivity';

	var loginBiz = function(params) {
		params = params || {};
		justep.Util.deleteCookie("bsessionid", '/');
		params['url'] = require.toUrl(loginAction);
		var result = biz.Request.login(params);
		var ret;
		if (result.status === 0 || result.status === 500) {
			ret = {};
			if (params.personID && params.context) {// 如果有personID继续,支持断网下继续
				window.__justep.__portalContext = params.context;
				ret.personID = params.personID;
				ret.personName = params.personName;
				ret.flag = true;
			} else {
				ret.flag = false;
				ret.message = "网络有问题, 请与管理员联系!";
			}
			return ret;
		} else {
			var resp = JSON.parse(result.responseText);
			if (resp.flag === true) {
				// 设置orgVersion版本号
				var ctx = {
					data : {
						orgVersion : resp.data.orgVersion
					}
				};
				params.context = ctx;
				window.__justep.__portalContext = ctx;
				justep.Util.addCookie("bsessionid", resp.data.bsessionid, '/', null, true);
				// 刷新页面注销登录
				$(window).on('unload', function() {
					logoutBiz(true);
				});
				var pid = resp.data && resp.data.bizParams && resp.data.bizParams.value && resp.data.bizParams.value.currentPersonID;
				var pname = resp.data && resp.data.bizParams && resp.data.bizParams.value && resp.data.bizParams.value.currentPersonName;
				ret = {
					flag : resp.flag,
					personID : pid,
					personName : pname,
					message : resp.message
				};// 返回3个值，flag:是不是成功,personID:登录人id,message:登录失败消息
			} else {
				ret = {
					flag : resp.flag,
					message : resp.message
				};
			}
			return ret;
		}
	};

	var addBizLike = function(liker, peer, rid, option) {
		option = option || {};
		var deferred = $.Deferred();
		var params = new biz.Request.ActionParam();
		params.setInteger('likerID', liker.uid);
		params.setString('likerPID', liker.id);
		params.setString('msgID', rid);
		option.msgContent && params.setString('msgContent', option.msgContent);
		option.msgType && params.setString('msgType', option.msgType);
		option.msgFileUrl && params.setString('msgFileUrl', option.msgFileUrl);
		params.setInteger('dialogID', peer.id);
		params.setString('dialogType', peer.type);
		option.dialogName && params.setString('dialogName', option.dialogName);
		option.dialogPID && params.setInteger('dialogPID', option.dialogPID);
		option.senderID && params.setInteger('senderID', option.senderID);
		option.senderName && params.setString('senderName', option.senderName);
		option.senderPID && params.setString('senderPID', option.senderPID);
		biz.Request.sendAsyncBizRequest({
			contentType : "application/json",
			dataType : "application/json",
			process : "/chat/process/imProcess",
			activity : "imActivity",
			action : 'addLikeMessageAction',
			directExecute : true,
			parameters : params,
			callback : function(resultData) {
				if (resultData && resultData.state) {
					deferred.resolve();
				} else
					deferred.reject("关注失败!");
			}
		});
		return deferred.promise();
	};

	var queryBizLike = function(uid, filter, limit, offset) {
		var deferred = $.Deferred();
		filter = (filter ? ("(" + filter + ") and (") : "(") + "flikerid=" + uid + ")";
		var params = new biz.Request.ActionParam();
		params.setInteger('limit', limit);
		params.setInteger('offset', offset);
		params.setString('filter', filter);
		biz.Request.sendAsyncBizRequest({
			contentType : "application/json",
			dataType : "application/json",
			process : "/chat/process/imProcess",
			activity : "imActivity",
			action : 'queryLikeMessageAction',
			directExecute : true,
			parameters : params,
			callback : function(resultData) {
				if (resultData && resultData.state) {
					deferred.resolve(resultData.response);
				} else
					deferred.reject("查询关注失败!");
			}
		});
		return deferred.promise();
	};

	var removeBizLike = function(liker, peer, rid) {
		var deferred = $.Deferred();
		var params = new biz.Request.ActionParam();
		params.setInteger('likerID', liker.uid);
		params.setString('msgID', rid);
		params.setInteger('dialogID', peer.id);
		biz.Request.sendAsyncBizRequest({
			contentType : "application/json",
			dataType : "application/json",
			process : "/chat/process/imProcess",
			activity : "imActivity",
			action : 'removeLikeMessageAction',
			directExecute : true,
			parameters : params,
			callback : function(resultData) {
				if (resultData && resultData.state) {
					deferred.resolve();
				} else
					deferred.reject("取消关注失败!");
			}
		});
		return deferred.promise();
	};

	var logoutBiz = function(async) {
		var url = require.toUrl(logoutAction);
		try {
			$.ajax({
				type : "POST",
				processData : false,
				url : url,
				cache : false,
				async : !!async
			});
			justep.Util.deleteCookie("bsessionid", '/');
		} catch (err) {
		}
	};

	var getPersonAvatar = function(person) {
		var params = {
			process : process,
			activity : activity,
			action : 'blobDownloadAction',
			blobDataModel : '/system/data',
			blobConcept : 'SA_OPPerson',
			blobRelation : 'sPhoto',
			blobConceptValue : person.sPersonID,
			$lastModified : person.sPhotoLastModified
		};
		var url = new justep.URL(require.toUrl("$UI/system/components/justep/blob/server/download.j"));
		url.setParam(params);
		return url.toString();
	};

	var checkSessionUrl = require.toUrl("$UI/system/service/common/checkSession.j");
	var checkBizSession = function() {
		var deferred = $.Deferred();
		$.ajax({
			type : "GET",
			global : false,
			url : checkSessionUrl,
			dataType : 'json',
			async : true,
			cache : false,
			success : function(data) {
				if (data.flag && data.code !== biz.Request.SESSION_TIMEOUT)
					deferred.resolve();
				else
					deferred.reject();
			},
			error : function() {
				deferred.reject();
			}
		});
		return deferred.promise();
	};
	var getDeptMembers = function(model, sFID) {
		var deferred = $.Deferred();
		var rows = [];
		OrgUtil.getOrgData(model, 'psm').done(function(orgs) {
			$.each(orgs, function(i, v) {
				if (v.sFID.indexOf(sFID) === 0) {
					rows.push(v);
				}
			});
			deferred.resolve(rows);
		});
		return deferred.promise();
	};

	var IMBizImpl = IMImpl.extend({
		loginBiz : function() {
			var self = this;
			var deferred = $.Deferred();
			checkBizSession().then(function() {
				deferred.resolve();
			}, function() {
				var ret = loginBiz(self._loadLoginDataByStore());
				if (ret && ret.flag) {
					deferred.resolve();
				}
			});
			return deferred.promise();
		},
		loadPerson : function(persons) {
			var deferred = $.Deferred();
			OrgUtil.getPsmData(this.model).then(function(psms) {
				$.each(psms, function(i, psm) {
					var p = {
						id : psm.sPersonID,
						name : psm.sName,
						uid : psm.sNumb,
						avatar : getPersonAvatar(psm),
						nick : '',
						phones : [],
						about : ''
					};
					persons[psm.sPersonID] = new Person(p);
				});

				deferred.resolve(persons);
			}, function() {
				deferred.reject();
			});
			return deferred.promise();
		},
		doLogin : function(param) {
			return loginBiz(param);
		},
		doLoginAfter : function(result) {
			this.callParent(result);
		},
		doLogout : function() {
			logoutBiz();
		},
		updatePersonUid : function(uid, pid) {
			var self = this;
			var deferred = $.Deferred();
			var params = new biz.Request.ActionParam();
			params.setInteger('num', uid);
			params.setString('personID', pid);
			this.loginBiz().then(function() {
				biz.Request.sendAsyncBizRequest({
					contentType : "application/json",
					dataType : "application/json",
					process : process,
					activity : activity,
					action : 'updatePersonNumAction',
					directExecute : true,
					parameters : params,
					callback : function(resultData) {
						if (resultData && resultData.state) {
							var person = self._getPerson(pid);
							if (person) {
								person.uid = uid;
							}
							deferred.resolve();
						} else
							deferred.reject(resultData);
					}
				});
			}, function() {
				deferred.reject("同步UID失败!");
			});
			return deferred.promise();
		},
		bindChangeMyAvatar : function(url, name, domNode, params) {
			var uploader = new Uploader(domNode, {
				actionUrl : url,
				requestHeader : {
					Accept : 'application/json'
				},
				name : name,
				compress : true
			});
			// 需要修改原数据
			var person = this._getPerson(this.loginResult.personID);
			uploader.on('onStart', function() {
				var params = {
					process : process,
					activity : activity,
					blobDataModel : '/system/data',
					blobConcept : 'SA_OPPerson',
					blobRelation : 'sPhoto',
					action : 'blobUpdateAction',
					blobLastModifiedRelation : 'sPhotoLastModified',
					blobConceptValue : person.id
				};
				uploader.addData(params);
			});
			uploader.on('onSuccess', function(evt) {
				var lastModified = evt.response.data ? evt.response.data.value : evt.response;

				person.avatar = getPersonAvatar({
					sPersonID : person.id,
					sPhotoLastModified : lastModified
				});
			});
			return uploader;
		},
		addLike : function(peer, rid, option) {
			var api = this.getActorClient();
			return addBizLike(this.getCurrentPerson(), peer, rid, option).then(function() {
				api.addLike(peer, rid);
			});
		},
		removeLike : function(peer, rid) {
			var api = this.getActorClient();
			return removeBizLike(this.getCurrentPerson(), peer, rid).then(function() {
				api.removeLike(peer, rid);
			});
		},
		getLikeMsgs : function(filter, limit, offset) {
			return queryBizLike(this.getCurrentPerson().uid, filter, limit, offset);
		},
		getSearchText : function(val, option) {
			var deferred = $.Deferred();
			var params = new biz.Request.ActionParam();
			params.setString("keyword", val);
			params.setInteger("senderUserId", option.sId);
			params.setInteger("destUserId", option.destId);
			params.setInteger("groupId", option.groupId);
			params.setInteger("limit", 100);
			var options = {};
			// options.context = this.getContext();
			options.action = "searchTextAction";
			options.parameters = params;
			options.directExecute = true;
			options.contentType = biz.Request.JSON_TYPE;
			options.dataType = biz.Request.JSON_TYPE;
			options.process = "/chat/process/imProcess";
			options.activity = "searchActivity";
			options.callback = function(options) {
				if (options.state) {
					deferred.resolve(options.response);
				} else {
					options.ignoreError = false;
				}
			};
			biz.Request.sendBizRequest(options);
			return deferred.promise();
		},
		getSearchDoc : function(option) {
			var deferred = $.Deferred();
			var params = new biz.Request.ActionParam();
			params.setInteger("currentUserId", option.currentUserId);
			params.setInteger("senderUserId", option.senderUserId);
			params.setInteger("destUserId", option.destUserId);
			params.setInteger("groupId", option.groupId);
			params.setInteger("limit", 100);
			var options = {};
			options.action = "searchDocumentAction";
			options.parameters = params;
			options.directExecute = true;
			options.contentType = biz.Request.JSON_TYPE;
			options.dataType = biz.Request.JSON_TYPE;
			options.process = "/chat/process/imProcess";
			options.activity = "searchActivity";
			options.callback = function(options) {
				if (options.state) {
					deferred.resolve(options.response);
				} else {
					options.ignoreError = false;
				}
			};
			biz.Request.sendBizRequest(options);
			return deferred.promise();
		},
		createDeptDlg : function(sFID, sName) {
			var self = this, person, rows = [], api = this.getActorClient();
			var deferred = $.Deferred();
			getDeptMembers(this.model, sFID).done(function(deptMembers) {
				$.each(deptMembers, function(i, v) {
					person = self.getPerson(v.sPersonID);
					rows.push(self.regPerson(person));
				});
				$.when.apply($, rows).done(function() {
					api.createGroup(sName, null, arguments).then(function(peer) {
						deferred.resolve(peer);
					});
				});
			});
			return deferred.promise();
		},
		notification : function(context, cUid) {
			biz.Push.init(context, cUid);
		},
		pushNotification : function() {
			// hcr 点推送通知时，打开相应的会话
			biz.Push.on("onMessage", function(event) {
				if (event.message.e && event.message.e.peerId && event.message.e.peerType) {
					var id = event.message.e.peerId * 1;
					var type = (event.message.e.peerType == 1) ? "user" : "group";
					justep.Shell.fireEvent("onSendMessagePage", {
						id : id,
						type : type
					});
				}
			});
		}
	});

	return IMBizImpl;
});