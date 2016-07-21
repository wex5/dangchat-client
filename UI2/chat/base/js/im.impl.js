define(function(require) {
	var IM = require("./im");
	var SuperInput = require("../../lib/superInput/superInput");
	var store = require('$UI/system/lib/base/store');
	var justep = require("$UI/system/lib/justep");
	var Object = require("$UI/system/lib/base/object");
	var Observable = require("$UI/system/lib/base/observable");
	var Person = require("./person");
	var Uploader = require('$UI/system/components/justep/uploader/uploader');
	var loggedIn = false;
	var ActorClient;

	// 使用spersonid做索引
	var persons = {};
	var defaultPersonIcon = require.toUrl("../img/person.png");
	var defaultGroupIcon = require.toUrl("../img/org.png");
	var _msg_createPersonChatDialog = "现在可以开始聊天了";
	var msg_createPersonChatDialog = ":" + _msg_createPersonChatDialog;

	var password = [ 15, 52, 60, 73, 12, 11, 86, 35 ];
	var encrypt = function(str, key) {
		var ret = '', keyLen = key.length;
		for (var i = 0; i < str.length; i++) {
			ret += String.fromCharCode(str.charCodeAt(i) ^ key[i % keyLen]);
		}
		return ret;
	};

	var _loginData_;
	var loadLoginDataByStore = function() {
		if (_loginData_)
			return _loginData_;
		var data = store.get('chat_loginData');
		if (data) {
			data = encrypt(data, password);
			_loginData_ = JSON.parse(data);
			return _loginData_;
		}
	};

	var saveLoginDataToStore = function(data) {
		data = JSON.stringify(data);
		store.set('chat_loginData', encrypt(data, password));
	};

	var needLogin = function() {
		var data = loadLoginDataByStore();
		return !data || !data.username || !data.password;
	};

	var emojiParse = function(text, size) {
		return SuperInput.emojiParse(text, size);
	};

	var _api = function() {
		if (ActorClient) {
			return ActorClient.getClient();
		}
	};

	var _getMsgType = function(msg) {
		var type = msg.content.content;
		if (type === 'text' && msg.content.text === msg_createPersonChatDialog) {
			type = 'service';
		} else if (type === 'document') {
			var fileExt = msg.content.fileExtension;
			if ([ 'aac', 'wav', 'mp3' ].indexOf(fileExt) >= 0)
				type = 'audio';
			else if ([ 'mp4', 'ogg', 'webm','mov','MOV' ].indexOf(fileExt) >= 0)
				type = 'video';
		} else if (type === 'voice')
			type = 'audio';
		return type;
	};

	var _replaceLink = function(text, linkClass) {
		if(isHtml(text) && text.indexOf("<a") != -1){
			return text.replace(/<a/g,"<a target='_blank' class='" + linkClass + "'");
		}
		var reg = new RegExp("(http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_;/=<>]*)?", "gi");
		return text.replace(reg, function(str) {
			return "<a target='_blank' class='" + linkClass + "'>" + str + "</a>";
		});
	};
	
	var isHtml = function(text){
		var escapedText = $('<div>').text(text).html();
		if(escapedText === text){
			return false;
		}
		return true;
	};

	var _getMsgContent = function(msg, option) {
		option = option || {};
		var type = _getMsgType(msg);
		var content = '';
		if (type === 'service' && msg.content.text === msg_createPersonChatDialog) {
			content = _msg_createPersonChatDialog;
		} else if (type === 'text') {
			var text = _replaceLink(msg.content.text, option.linkClass || '');
			content = emojiParse(text, 16);
		} else if (type === 'photo') {
			content = justep.String.format("<img src='{0}' class='{1}'/>", msg.content.preview, option.photoClass || '');
		} else if (type === 'document') {
			content = justep.String.format("<a class='{0}'><i class='iconfont icon-wenjianjia x-fileIcon'/>{1}</a>", option.fileClass || '', msg.content.fileName);
		} else if (type === 'service') {
			content = msg.content.text;
		} else if (type === 'audio' || type === 'voice') {
			var fileUrl = msg.content.fileUrl || "";
			var aacFileUrl = fileUrl.replace("voice.opus", "voice.aac");
			var oggFileUrl = fileUrl.replace("voice.opus", "voice.ogg");
			content = justep.String
					.format("<audio class='hide' onerror = 'justep.Util.callModelFn({fn:\"updateVocText\",domNode:this},this,true);' oncanplay='justep.Util.callModelFn({fn:\"updateVocText\",domNode:this},this);'><source src='{0}'/><source src='{1}'/><source src='{2}'/></audio><i class='icon-loading-b {3}'/><label></label>",
							aacFileUrl, oggFileUrl, fileUrl, option.audioClass || '');// icon-android-volume
							
		} else if (type === 'video') {
			var fileUrl = msg.content.fileUrl || "";
			var oggFileUrl= fileUrl.replace(".mp4?",".ogg?").replace(".mov?",".ogg?").replace(".MOV?",".ogg?");
			content = justep.String.format("<video webkit-playsinline class='{0}'><source src='{1}'></source><source src='{2}'></source></video>",  option.videoClass || '' , fileUrl,oggFileUrl);
		}
		return content;
	};

	var _getMsgOption = function(msg) {
		var type = _getMsgType(msg);
		if (type === 'photo') {
			return {
				w : msg.content.w,
				h : msg.content.h,
				fileName : msg.content.fileName
			};
		}
	};

	var getUser = function(pid) {
		var deferred = $.Deferred();
		_api().findUsers(pid).then(function(users) {
			var ret = null;
			if ($.isArray(users)) {
				$.each(users, function(i, user) {
					if (user.nick === pid) {
						ret = user;
						return false;
					}
				});
			}
			deferred.resolve(ret);
		});
		return deferred.promise();
	};
	var loginOKdeferred = $.Deferred();
	var IMImpl = Object.extend({
		mixins : Observable,
		constructor : function(model) {
			this.callParent();
			Observable.prototype.constructor.call(this);
			if (IM.impl) {
				throw new Error('不能重复创建IM实例');
			} else {
				IM.impl = this;
			}
			this.model = model;
		},
		_loadLoginDataByStore : loadLoginDataByStore,
		_getPerson : function(pid) {
			return persons[pid];
		},
		loadPerson : function(persons) {
			// 返回promise
		},
		autoLogin : function() {
			var self = this;
			if (needLogin())
				justep.Shell.fireEvent('onShowLoginDialog', {});
			else {
				return this.login(loadLoginDataByStore()).fail(function(error) {
					self.logout();
				});
			}
		},
		doLogin : function(param) {
			// 继承后实现
			return {
				flag : true,
				personID : '',
				personName : '',
				message : ''
			};// 返回3个值，flag:是不是成功,personID:登录人id,,personName:登录人name,message:登录失败消息
		},
		doLoginAfter : function(result) {
			this.setReady(true);
			this.onLoggedIn();
			// loggedIn = true;
			// justep.Shell.fireEvent('onLoggedIn', {});
		},
		onLoggedIn : function() {
			loggedIn = true;
			justep.Shell.fireEvent('onLoggedIn', {});
		},
		updatePersonUid : function(uid, pid) {
			// 返回promise
		},
		login : function(param) {
			var self = this;
			var deferred = $.Deferred();
			var result = this.doLogin(param);
			if (result.flag === true) {
				var pid = result.personID;
				var pname = result.personName;
				param.personID = pid;
				param.personName = pname;
				saveLoginDataToStore(param);// 保存登录成功信息
				this.loginResult = result;
				self.doLoginAfter(result);
				deferred.resolve(result);
				/*
				 * // 加载成功后处理其他逻辑 ActorClient.promise.done(function(client) { if
				 * (ActorClient.isLoggedIn(pid)) {
				 * self.loadPerson(persons).done(function() {
				 * self.doLoginAfter(result);
				 *
				 * }); } else { client.validPerson(pid,
				 * pname).done(function(state) { if (state === "logged_in") {
				 * self.loadPerson(persons).done(function() { var uid =
				 * client.getUid(); if (uid) { self.updatePersonUid(uid,
				 * pid).done(function() { self.doLoginAfter(result);
				 * deferred.resolve(result); }).fail(function(error) {
				 * deferred.reject("同步UID失败!"); }); } else {
				 * deferred.reject("无法获取UID"); self.logout(); }
				 * }).fail(function(error) { deferred.reject("加载人员失败 ，" + (error ||
				 * '未知错误')); }); } else if (state === "signup") {
				 * deferred.reject("signUp unSupported"); } else {
				 * deferred.reject("Unsupported state: " + state); }
				 * }).fail(function(error) { deferred.reject("登录出错! 原因: " +
				 * error); }); } });
				 */
			} else {
				deferred.reject(result.message);
			}
			return deferred.promise();
		},
		setReady : function(ok, info) {
			if (ok)
				loginOKdeferred.resolve();
			else
				loginOKdeferred.reject(info);
		},
		loginActor : function() {
			var self = this;
			var deferred = $.Deferred();
			require([ '../../lib/actor/actorClient' ], function(actorClient) {
				ActorClient = actorClient;
				ActorClient.promise.done(function(client) {
					var result = self.loginResult;
					var pid = result.personID;
					var pname = result.personName;
					if (ActorClient.isLoggedIn(pid)) {
						loginOKdeferred.promise().then(function() {
							self.loadPerson(persons, pid).done(function() {
								deferred.resolve(result);
							});
						}, function(info) {
							self.logout();
							throw new Error(info);
						});
					} else {
						client.validPerson(pid, pname).done(function(state) {
							if (state === "logged_in") {
								loginOKdeferred.promise().then(function() {
									self.loadPerson(persons, pid).done(function() {
										var uid = client.getUid();
										if (uid) {
											self.updatePersonUid(uid, pid).done(function() {
												// self.doLoginAfter(result);
												deferred.resolve(result);
											}).fail(function(error) {
												deferred.reject("同步UID失败!");
											});
										} else {
											deferred.reject("无法获取UID");
											self.logout();
										}
									}).fail(function(error) {
										deferred.reject("加载人员失败 ，" + (error || '未知错误'));
									});
								}, function(info) {
									self.logout();
									throw new Error(info);
								});
							} else if (state === "signup") {
								deferred.reject("signUp unSupported");
							} else {
								deferred.reject("Unsupported state: " + state);
							}
						}).fail(function(error) {
							deferred.reject("登录出错! 原因: " + error);
						});
					}
				});
			});
			return deferred.promise();
		},
		// loginActor : function() {
		// var self = this;
		// var deferred = $.Deferred();
		// require([ '../actor/actorClient' ], function(actorClient) {
		// ActorClient = actorClient;
		// ActorClient.promise.done(function(client) {
		// var result = self.loginResult;
		// var pid = result.personID;
		// var pname = result.personName;
		// if (ActorClient.isLoggedIn(pid)) {
		// self.loadPerson(persons).done(function() {
		// deferred.resolve(result);
		// });
		// } else {
		// client.validPerson(pid, pname).done(function(state) {
		// if (state === "logged_in") {
		// self.loadPerson(persons).done(function() {
		// var uid = client.getUid();
		// if (uid) {
		// self.updatePersonUid(uid, pid).done(function() {
		// // self.doLoginAfter(result);
		// deferred.resolve(result);
		// }).fail(function(error) {
		// deferred.reject("同步UID失败!");
		// });
		// } else {
		// deferred.reject("无法获取UID");
		// self.logout();
		// }
		// }).fail(function(error) {
		// deferred.reject("加载人员失败 ，" + (error || '未知错误'));
		// });
		// } else if (state === "signup") {
		// deferred.reject("signUp unSupported");
		// } else {
		// deferred.reject("Unsupported state: " + state);
		// }
		// }).fail(function(error) {
		// deferred.reject("登录出错! 原因: " + error);
		// });
		// }
		// });
		// });
		// return deferred.promise();
		// },
		doLogout : function() {
		},
		logout : function() {
			this.doLogout();
			localStorage.clear();
			var url = location.href;
			var ipos = url.lastIndexOf(location.hash);
			if (ipos >= 0)
				location.href = url.substring(0, ipos);
			else
				location.reload();
		},
		getPersonByUID : function(uid) {
			var api = _api();
			var user;
			try {
				user = api.getUser(uid);// 暂时保留，逻辑不严格，有可能获取不到
			} catch (e) {
			}// 屏蔽错误
			if (user && persons[user.nick]) {
				if (persons[user.nick].uid !== uid) {
					persons[user.nick].uid = uid;
					this.updatePersonUid(uid, user.nick);
				}
				return this.getPerson(user.nick);
			} else
				return {};
		},
		getPerson : function(id) {
			var ret;
			var person = persons[id];
			if (person) {
				var api = _api();
				var user;
				try {
					user = api.getUser(ret.uid);// 暂时保留，逻辑不严格，有可能获取不到
				} catch (e) {
				}// 屏蔽错误
				if (user) {
					// if(user.nick) person.nick = user.nick;
					if (user.about)
						person.about = user.about;
					// if(user.phones && user.phones.length>0) person.phones =
					// user.phones;
				}
				ret = new Person(person);
			}
			return ret;
		},
		// {id:,name:,uid:,avatar:,nick:,phones:,about:}
		addPerson : function(p) {
			if (p && p.id) {
				var person = persons[p.id];
				if (!person)
					persons[p.id] = p;
				else
					throw new Error('增加人员失败，id=' + p.id + '已经存在');
			} else
				throw new Error('增加人员失败，id是必须的属性');
		},
		isLoggedIn : function() {
			return loggedIn;
		},
		getCurrentPerson : function() {
			return this.getPerson(this.loginResult.personID);
		},
		getCurrentPersonID : function() {
			return this.loginResult.personID;
		},
		regPerson : function(person) {
			var deferred = $.Deferred();
			var self = this;
			if (person) {
				getUser(person.id).done(function(user) {
					if (user) {
						if (person.uid === user.id)
							deferred.resolve(user.id);
						else {
							self.updatePersonUid(user.id, person.id).done(function() {
								deferred.resolve(user.id);
							}).fail(function(error) {
								deferred.reject(error);
							});
						}
					} else {
						_api().registerUser(person.id, person.name).then(function(result) {
							if (result && result.length > 0) {
								var user = result[0];
								if (user) {
									self.updatePersonUid(user.id, person.id).done(function() {
										deferred.resolve(user.id);
									}).fail(function(error) {
										deferred.reject(error);
									});
								}
							} else
								deferred.reject("register Person to actor server error");
						});
					}
				}).fail(function(error) {
					deferred.reject(error);
				});
			} else
				deferred.reject("regPerson person is null");
			return deferred.promise();
		},
		addFriend : function(person) {
			var self = this;
			var deferred = $.Deferred();
			if (person) {
				self.regPerson(person).done(function(uid) {
					self.existFriend(person).done(function(exist) {
						if (exist)
							deferred.resolve(uid);
						else {
							var api = _api();
							api.addContact(uid).then(function() {
								var peer = api.getUserPeer(uid);
								api.sendTextMessage(peer, msg_createPersonChatDialog);
								deferred.resolve(uid);
							});
						}
					}).fail(function(error) {
						deferred.reject(error);
					});
				}).fail(function(error) {
					deferred.reject(error);
				});
			} else
				deferred.reject("addFriend person is null");
			return deferred.promise();
		},
		existFriend : function(person) {
			var deferred = $.Deferred();
			var _existFriend = function(contacts) {
				_api().unbindContacts(_existFriend);
				if ($.isArray(contacts)) {
					for (var i = 0; i < contacts.length; i++) {
						if (person.id === contacts[i].nick || person.uid === contacts[i].uid) {
							deferred.resolve(true);
							return;
						}
					}
				}
				deferred.resolve(false);
			};
			_api().bindContacts(_existFriend);
			return deferred.promise();
		},
		getPersonDefaultIcon : function() {
			return defaultPersonIcon;
		},
		getGroupDefaultIcon : function() {
			return defaultGroupIcon;
		},
		messageParse : function(message, option) {
			if (message) {
				var person = this.getPersonByUID(message.sender.peer.id);
				var attentionNum = 0;
				var isOwnSet;
				if (message.reactions && message.reactions.length > 0) {
					attentionNum = message.reactions[0].uids.length;
					isOwnSet = message.reactions[0].isOwnSet;
				}
				return {
					mid : message.rid,
					content : _getMsgContent(message, option),
					sender : person,
					avatar : person.avatar || defaultPersonIcon,
					isOut : message.isOut,
					fileUrl : message.content.fileUrl,
					type : _getMsgType(message),
					state : message.state,
					senderPID : person.id,
					fullDate : message.fullDate,
					fileName : message.content.fileName,
					attentionNum : attentionNum,
					isOwnSet : isOwnSet,
					option : _getMsgOption(message),
					messageText : message.content.text
				};
			}
		},
		emojiParse : emojiParse,
		bindDialogs : function(callback) {
			return _api().bindDialogs(callback);
		},
		unbindDialogs : function(callback) {
			return _api().unbindDialogs(callback);
		},
		bindChat : function(peer, callback) {
			return _api().bindChat(peer, callback);
		},
		unbindChat : function(peer, callback) {
			return _api().unbindChat(peer, callback);
		},
		sendTextMessageToPerson : function(person, text) {
			if (typeof (person) === "string") {
				person = this._getPerson(person);
				if (!person)
					throw new Error("发送消息的人员:" + person + "不存在!");
			}
			var self = this;
			this.addFriend(person).then(function(uid) {
				var peer = _api().getUserPeer(uid);
				self.sendTextMessage(peer, text);
			});
		},
		sendTextMessage : function(peer, text) {
			return _api().sendTextMessage(peer, text);
		},
		sendPhotoMessage : function(peer, photo) {
			return _api().sendPhotoMessage(peer, photo);
		},
		sendVoiceMessage : function(peer, duration, voice) {// 目前使用发送fileMessage的实现，sendVoiceMessage目前使用opus格式
			return _api().sendVoiceMessage(peer, duration, voice);
		},
		sendFileMessage : function(peer, file) {
			return _api().sendFileMessage(peer, file);
		},
		sendClipboardPhotoMessage : function(peer, photo) {
			return _api().sendClipboardPhotoMessage(peer, photo);
		},
		deleteChat : function(peer) {
			return _api().deleteChat(peer);
		},
		clearChat : function(peer) {
			return _api().clearChat(peer);
		},
		deleteMessage : function(peer, rid) {
			return _api().deleteMessage(peer, rid);
		},
		bindUser : function(uid, callback) {
			return _api().bindUser(uid, callback);
		},
		unbindUser : function(uid, callback) {
			return _api().unbindUser(uid, callback);
		},
		getUser : function(uid) {
			return _api().getUser(uid);
		},
		getGroup : function(gid) {
			return _api().getGroup(gid);
		},
		findUsers : function(query) {
			return _api().findUsers(query);
		},
		onConversationOpen : function(peer) {
			return _api().onConversationOpen(peer);
		},
		onConversationClosed : function(peer) {
			return _api().onConversationClosed(peer);
		},
		onMessageShown : function(peer, message) {
			return _api().onMessageShown(peer, message);
		},
		onChatEnd : function(peer) {
			return _api().onChatEnd(peer);
		},
		onDialogsEnd : function() {
			return _api().onDialogsEnd();
		},
		bindUserOnline : function(uid, callback) {
			return _api().bindUserOnline(uid, callback);
		},
		unbindUserOnline : function(uid, callback) {
			return _api().unbindUserOnline(uid, callback);
		},
		bindGroupOnline : function(gid, callback) {
			return _api().bindGroupOnline(gid, callback);
		},
		bindTyping : function(peer, callback) {
			return _api().bindTyping(peer, callback);
		},
		unbindTyping : function(peer, callback) {
			return _api().unbindTyping(peer, callback);
		},
		getUid : function() {
			return _api().getUid();
		},
		editMyName : function(string) {
			return _api().editMyName(string);
		},
		editMyNick : function(string) {
			return _api().editMyNick(string);
		},
		editMyAbout : function(about) {
			return _api().editMyAbout(about);
		},
		getUserPeer : function(uid) {
			return _api().getUserPeer(uid);
		},
		createGroup : function(title, avatar, userIds) {
			return _api().createGroup(title, avatar, userIds);
		},
		bindGroupDialogs : function(callback) {
			return _api().bindGroupDialogs(callback);
		},
		unbindGroupDialogs : function(callback) {
			return _api().unbindGroupDialogs(callback);
		},
		getGroupPeer : function(gid) {
			return _api().getGroupPeer(gid);
		},
		leaveGroup : function(gid) {
			return _api().leaveGroup(gid);
		},
		inviteMember : function(gid, uid) {
			return _api().inviteMember(gid, uid);
		},
		kickMember : function(gid, uid) {
			return _api().kickMember(gid, uid);
		},
		bindGroup : function(gid, callback) {
			return _api().bindGroup(gid, callback);
		},
		unbindGroup : function(gid, callback) {
			return _api().unbindGroup(gid, callback);
		},
		bindConnectState : function(callback) {
			return _api().bindConnectState(callback);
		},
		unbindConnectState : function(callback) {
			return _api().unbindConnectState(callback);
		},
		changeNotificationsEnabled : function(peer, isEnabled) {
			return _api().changeNotificationsEnabled(peer, isEnabled);
		},
		isNotificationsEnabled : function(peer) {
			return _api().isNotificationsEnabled(peer);
		},
		isSendByEnterEnabled : function() {
			return _api().isSendByEnterEnabled();
		},
		changeSendByEnter : function(isEnabled) {
			return _api().changeSendByEnter(isEnabled);
		},
		editGroupTitle : function(gid, title) {
			return _api().editGroupTitle(gid, title);
		},
		editGroupAbout : function(gid, about) {
			return _api().editGroupAbout(gid, about);
		},
		bindMessages : function(peer, callback) {
			return _api().bindMessages(peer, callback);
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
			uploader.on('onStart', function() {
				uploader.addData(params);
			});
			uploader.on('onSuccess', function() {

			});
			return uploader;
		},
		bindGlobalCounter : function(callback) {
			return _api().bindGlobalCounter(callback);
		},
		unbindGlobalCounter : function(callback) {
			return _api().unbindGlobalCounter(callback);
		},
		addLike : function(peer, rid, option) {
			// var person = this.getCurrentPerson();
			// addLike(peer.id, rid, person.uid, option||{});
			return _api().addLike(peer, rid);
		},
		removeLike : function(peer, rid) {
			// var person = this.getCurrentPerson();
			// removeLike(peer.id, rid, person.uid);
			return _api().removeLike(peer, rid);
		},
		findAllText : function(peer, query) {
			return _api().findAllText(peer, query);
		},
		findAllDocs : function(peer) {
			return _api().findAllDocs(peer);
		},
		findAllLinks : function(peer) {
			return _api().findAllLinks(peer);
		},
		findAllPhotos : function(peer) {
			return _api().findAllPhotos(peer);
		},
		getPeer : function(id, type) {
			if (type === "user") {
				return _api().getUserPeer(id);
			} else {
				return _api().getGroupPeer(id);
			}
		},
		getActorClient : function() {
			return _api();
		},
		getLikeMsgs : function() {
			// return getLikeMsgs(this.getCurrentPerson().uid);
		},
		getSearchText : function(val, option) {
		},
		getSearchDoc : function(option) {

		},
		createDeptDlg : function(sFID, sName) {

		},
		findGroups : function(query) {
			return _api().findGroups(query);
		},
		notification : function(context, cUid) {

		},
		updateClientState : function(id) {
			return _api().requestCodeEmail(id);
		},
		updateGroupShared : function(gid, groupShared){
			return _api().editGroupAbout(gid, groupShared);
		}
	});

	return IMImpl;
});
