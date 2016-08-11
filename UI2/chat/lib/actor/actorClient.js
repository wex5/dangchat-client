define(function(require) {
	var $ = require("jquery");
	
	var config = require("../../config");
	require("./actor");

	var deferred = $.Deferred();

	var _client;

	var _starter = function() {
		_client = new ActorClient();
		if(!window.Promise){
			require(["./promise-pollfill"],function(){
				deferred.resolve(_client);
			});
		}else{
			deferred.resolve(_client);
		}
	};
	if(window.isJsAppLoaded) _starter();
	else window.jsAppLoaded = _starter; 

	var ActorClient = function() {
		this.messager = new window.actor.ActorApp();
		this.messager.init(config);
	};

	ActorClient.prototype.unbind = function(unbindname){
		var msg = this.messager;
		var args = $.makeArray(arguments).slice(1);
		return {unbind:function(){
			msg[unbindname].apply(msg,args);
		}};
	};
	
	ActorClient.prototype.requestSms = function(phone) {
		var result = $.Deferred();
		if (phone) {
			try {
				this.messager.requestSms(phone, function() {
					result.resolve();
				}, function(error) {
					result.reject(error);
				});
			} catch (e) {
				result.reject(e);
			}
		} else {
			result.reject("phone is empty");
		}

		return result.promise();
	};

	ActorClient.prototype.sendCode = function(code) {
		var result = $.Deferred();
		if (code) {
			try {
				this.messager.sendCode(code, function(state) {
					result.resolve(state);
				}, function(error) {
					result.reject(error);
				});
			} catch (e) {
				result.reject(e);
			}
		}
		return result.promise();
	};

	ActorClient.prototype.bindDialogs = function(callback) {
		this.messager.bindDialogs(callback);
		return this.unbind('unbindDialogs',callback);
	};

	ActorClient.prototype.unbindDialogs = function(callback) {
		this.messager.unbindDialogs(callback);
	};

	ActorClient.prototype.bindConnectState = function(callback) {
		this.messager.bindConnectState(callback);
		return this.unbind('unbindConnectState',callback);
	};

	ActorClient.prototype.unbindConnectState = function(callback) {
		this.messager.unbindConnectState(callback);
	};

	ActorClient.prototype.unbindChat = function(peer, callback) {
		this.messager.unbindChat(peer, callback);
	};

	ActorClient.prototype.bindChat = function(peer, callback) {
		this.messager.bindChat(peer, callback);
		return this.unbind('unbindChat',peer, callback);
	};

	ActorClient.prototype.bindMessages = function(peer, callback) {
		var ret = this.messager.bindMessages(peer, callback);
		ret.initAll();
		return ret;
	};

	ActorClient.prototype.bindContacts = function(peer, callback) {
		this.messager.bindContacts(peer, callback);
		return this.unbind('unbindContacts',peer,callback);
	};

	ActorClient.prototype.unbindContacts = function(peer, callback) {
		this.messager.unbindContacts(peer, callback);
	};

	ActorClient.prototype.sendTextMessage = function(peer, text) {
		this.messager.sendMessage(peer, text);
	};

	ActorClient.prototype.sendPhotoMessage = function(peer, photo) {
		this.messager.sendPhoto(peer, photo);
	};

	ActorClient.prototype.sendClipboardPhotoMessage = function(peer, photo) {
		this.messager.sendClipboardPhoto(peer, photo);
	};
	
	ActorClient.prototype.sendFileMessage = function(peer, file) {
		this.messager.sendFile(peer, file);
	};

	ActorClient.prototype.deleteChat = function(peer) {
		return this.messager.deleteChat(peer);
	};

	ActorClient.prototype.clearChat = function(peer) {
		return this.messager.clearChat(peer);
	};

	ActorClient.prototype.deleteMessage = function(peer, rid) {
		return this.messager.deleteMessage(peer, rid);
	};

	ActorClient.prototype.bindUser = function(uid, callback) {
		this.messager.bindUser(uid, callback);
		return this.unbind('unbindUser',uid,callback);
	};

	ActorClient.prototype.unbindUser = function(uid, callback) {
		this.messager.unbindUser(uid, callback);
	};

	ActorClient.prototype.getUser = function(uid) {
		return this.messager.getUser(uid);
	};

	ActorClient.prototype.getGroup = function(gid) {
		return this.messager.getGroup(gid);
	};

	ActorClient.prototype.findUsers = function(query) {
		var t = this.messager.findUsers(query.toString());
		return t;
	};

	ActorClient.prototype.onConversationOpen = function(peer) {
		this.messager.onConversationOpen(peer);
	};

	ActorClient.prototype.onConversationClosed = function(peer) {
		this.messager.onConversationClosed(peer);
	};

	ActorClient.prototype.onMessageShown = function(peer, message) {
		this.messager.onMessageShown(peer, message);
	};

	ActorClient.prototype.onChatEnd = function(peer) {
		this.messager.onChatEnd(peer);
	};

	ActorClient.prototype.bindUserOnline = function(uid, callback) {
		this.messager.bindUserOnline(uid, callback);
		return this.unbind('unbindUserOnline',uid, callback);
	};

	ActorClient.prototype.unbindUserOnline = function(uid, callback) {
		this.messager.unbindUserOnline(uid, callback);
	};

	ActorClient.prototype.bindGroupOnline = function(gid, callback) {
		this.messager.bindGroupOnline(gid, callback);
		return this.unbind('unbindGroupOnline',gid, callback);
	};

	ActorClient.prototype.bindTyping = function(peer, callback) {
		this.messager.bindTyping(peer, callback);
		return this.unbind('unbindTyping',peer,callback);
	};

	ActorClient.prototype.unbindTyping = function(peer, callback) {
		this.messager.unbindTyping(peer, callback);
	};

	ActorClient.prototype.getUid = function() {
		return this.messager.getUid();
	};

	ActorClient.prototype.editMyName = function(string) {
		this.messager.editMyName(string);
	};

	ActorClient.prototype.editMyNick = function(string) {
		this.messager.editMyNick(string);
	};

	ActorClient.prototype.editMyAbout = function(about) {
		return this.messager.editMyAbout(about);
	};

	ActorClient.prototype.getUserPeer = function(uid) {
		return this.messager.getUserPeer(uid);
	};

	ActorClient.prototype.createGroup = function(title, avatar, userIds) {
		return this.messager.createGroup(title, avatar, userIds);
	};

	ActorClient.prototype.addContact = function(uid) {
		return this.messager.addContact(uid);
	};

	ActorClient.prototype.removeContact = function(uid) {
		return this.messager.removeContact(uid);
	};

	ActorClient.prototype.bindGroupDialogs = function(callback) {
		this.messager.bindGroupDialogs(callback);
		return this.unbind('unbindGroupDialogs',callback);
	};

	ActorClient.prototype.unbindGroupDialogs = function(callback) {
		this.messager.unbindGroupDialogs(callback);
	};

	ActorClient.prototype.getGroupPeer = function(gid) {
		return this.messager.getGroupPeer(gid);
	};

	ActorClient.prototype.leaveGroup = function(gid) {
		return this.messager.leaveGroup(gid);
	};

	ActorClient.prototype.inviteMember = function(gid, uid) {
		return this.messager.inviteMember(gid, uid);
	};

	ActorClient.prototype.kickMember = function(gid, uid) {
		return this.messager.kickMember(gid, uid);
	};

	ActorClient.prototype.bindGroup = function(gid, callback) {
		this.messager.bindGroup(gid, callback);
		return this.unbind('unbindGroup',gid,callback);
	};

	ActorClient.prototype.unbindGroup = function(gid, callback) {
		this.messager.unbindGroup(gid, callback);
	};

	ActorClient.prototype.isLoggedIn = function() {
		return this.messager.isLoggedIn();
	};

	ActorClient.prototype.changeNotificationsEnabled = function(peer, isEnabled) {
		this.messager.changeNotificationsEnabled(peer, isEnabled);
	};

	ActorClient.prototype.isNotificationsEnabled = function(peer) {
		return this.messager.isNotificationsEnabled(peer);
	};

	ActorClient.prototype.isSendByEnterEnabled = function() {
		return this.messager.isSendByEnterEnabled();
	};

	ActorClient.prototype.changeSendByEnter = function(isEnabled) {
		this.messager.changeSendByEnter(isEnabled);
	};

	ActorClient.prototype.editGroupTitle = function(gid, title) {
		return this.messager.editGroupTitle(gid, title);
	};

	ActorClient.prototype.editGroupAbout = function(gid, about) {
		return this.messager.editGroupAbout(gid, about);
	};
	
	ActorClient.prototype.addLike = function(peer, rid) {
		return this.messager.addLike(peer, rid);
	};
	ActorClient.prototype.removeLike = function(peer, rid) {
		return this.messager.removeLike(peer, rid);
	};
	
	ActorClient.prototype.findAllText = function(peer, query) {
		return this.messager.findAllText(peer, query);
	};
	ActorClient.prototype.findAllDocs = function(peer) {
		return this.messager.findAllDocs(peer);
	};
	ActorClient.prototype.findAllLinks = function(peer) {
		return this.messager.findAllDocs(peer);
	};
	ActorClient.prototype.findAllPhotos = function(peer) {
		return this.messager.findAllDocs(peer);
	};
	ActorClient.prototype.renderMarkdown = function(markdownText) {
		return this.messager.renderMarkdown(markdownText);
	};
	ActorClient.prototype.rndNum = function(length) {
		var rnd = "";
		for (var i = 0; i < length; i++) {
			rnd += Math.floor(Math.random() * 10);
		}
		return rnd;
	};

	var toUserString = function(pid, name) {
		return '&' + name + '&' + pid;
	};

	ActorClient.prototype.sendVoiceMessage = function(peer, duration, voice) {
		return this.messager.sendVoiceMessage(peer, duration, voice);
	};

	ActorClient.prototype.validPerson = function(personId, name) {
		var result = $.Deferred();
		var self = this;
		if (personId) {
			try {
				this.messager.requestSms("66" + this.rndNum(11), function() {
					self.messager.sendCode(toUserString(personId, name), function(state) {
						result.resolve(state);
					}, function(error) {
						result.reject(error);
					});
				}, function(error) {
					result.reject(error);
				});
			} catch (e) {
				result.reject(e);
			}
		} else
			result.reject('人员ID不能为空');
		return result.promise();
	};

	ActorClient.prototype.registerUser = function(personId, name) {
		return this.messager.findUsers(toUserString(personId, name));
	};
	
	ActorClient.prototype.bindGlobalCounter = function(callback) {
		this.messager.bindGlobalCounter(callback);
	};

	ActorClient.prototype.unbindGlobalCounter = function(callback) {
		this.messager.unbindGlobalCounter(callback);
	};	
	ActorClient.prototype.onDialogsEnd = function() {
		this.messager.onDialogsEnd();
	};
	ActorClient.prototype.findGroups = function(query) {
		return this.messager.findGroups(query);
	};
	ActorClient.prototype.requestCodeEmail = function(email) {
		return new Promise(function(resolve, reject){
			this.messager.requestCodeEmail(email.trim(), resolve, reject);
		});
	};	
	return {
		promise : deferred.promise(),
		getClient : function() {
			return _client;
		},
		isLoggedIn : function(pid) {
			if (_client && _client.isLoggedIn()) {
				var uid = _client.getUid();
				if (uid) {
					var user = _client.getUser(uid);
					return user && user.nick == pid;
				}
			}
			return false;
		}
	};
});
