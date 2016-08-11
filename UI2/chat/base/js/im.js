define(function(require) {
	var checkImpl = function() {
		return !!IM.impl;
	};

	var call = function(name) {
		if (checkImpl()) {
			if (typeof name === 'string') {
				var fn = IM.impl[name];
				if (!fn) {
					throw ("IM - 没有函数: " + name);
				}
				var args = [];
				for (var i = 1; i < arguments.length; i++) {
					args.push(arguments[i]);
				}
				return fn.apply(IM.impl, args);
			} else
				throw ("IM - call必须有需要调用函数名参数");
		}
	};

	var IM = {
		fileSize : 1024 * 1024 * 50,
		impl : null,
		on : function() {
		},
		off : function() {
			if (checkImpl()) {
				return IM.impl.off.apply(IM.impl, arguments);
			}
		},
		fireEvent : function() {
			if (checkImpl()) {
				return IM.impl.fireEvent.apply(IM.impl, arguments);
			}
		},
		autoLogin : function() {
			if (checkImpl()) {
				return IM.impl.autoLogin.apply(IM.impl, arguments);
			}
		},
		login : function() {
			if (checkImpl()) {
				return IM.impl.login.apply(IM.impl, arguments);
			}
		},
		loginActor : function() {
			if (checkImpl()) {
				return IM.impl.loginActor.apply(IM.impl, arguments);
			}
		},
		logout : function() {
			if (checkImpl()) {
				return IM.impl.logout.apply(IM.impl, arguments);
			}
		},
		getPersonByUID : function() {
			if (checkImpl()) {
				return IM.impl.getPersonByUID.apply(IM.impl, arguments);
			}
		},
		getPerson : function() {
			if (checkImpl()) {
				return IM.impl.getPerson.apply(IM.impl, arguments);
			}
		},
		addPerson : function() {
			if (checkImpl()) {
				return IM.impl.addPerson.apply(IM.impl, arguments);
			}
		},
		isLoggedIn : function() {
			if (checkImpl()) {
				return IM.impl.isLoggedIn.apply(IM.impl, arguments);
			}
		},
		getCurrentPerson : function() {
			if (checkImpl()) {
				return IM.impl.getCurrentPerson.apply(IM.impl, arguments);
			}
		},
		getCurrentPersonID : function() {
			if (checkImpl()) {
				return IM.impl.getCurrentPersonID.apply(IM.impl, arguments);
			}
		},
		regPerson : function() {
			if (checkImpl()) {
				return IM.impl.regPerson.apply(IM.impl, arguments);
			}
		},
		addFriend : function() {
			if (checkImpl()) {
				return IM.impl.addFriend.apply(IM.impl, arguments);
			}
		},
		existFriend : function() {
			if (checkImpl()) {
				return IM.impl.existFriend.apply(IM.impl, arguments);
			}
		},
		getPersonDefaultIcon : function() {
			if (checkImpl()) {
				return IM.impl.getPersonDefaultIcon.apply(IM.impl, arguments);
			}
		},
		getGroupDefaultIcon : function() {
			if (checkImpl()) {
				return IM.impl.getGroupDefaultIcon.apply(IM.impl, arguments);
			}
		},
		messageParse : function() {
			if (checkImpl()) {
				return IM.impl.messageParse.apply(IM.impl, arguments);
			}
		},
		emojiParse : function() {
			if (checkImpl()) {
				return IM.impl.emojiParse.apply(IM.impl, arguments);
			}
		},
		bindDialogs : function(callback) {
			if (checkImpl()) {
				return IM.impl.bindDialogs.apply(IM.impl, arguments);
			}
		},
		unbindDialogs : function(callback) {
			if (checkImpl()) {
				return IM.impl.unbindDialogs.apply(IM.impl, arguments);
			}
		},
		bindChat : function(peer, callback) {
			if (checkImpl()) {
				return IM.impl.bindChat.apply(IM.impl, arguments);
			}
		},
		unbindChat : function(peer, callback) {
			if (checkImpl()) {
				return IM.impl.unbindChat.apply(IM.impl, arguments);
			}
		},
		sendTextMessageToPerson : function(person, text) {
			if (checkImpl()) {
				return IM.impl.sendTextMessageToPerson.apply(IM.impl, arguments);
			}
		},
		sendTextMessage : function(peer, text) {
			if (checkImpl()) {
				return IM.impl.sendTextMessage.apply(IM.impl, arguments);
			}
		},
		sendPhotoMessage : function(peer, photo) {
			if (checkImpl()) {
				return IM.impl.sendPhotoMessage.apply(IM.impl, arguments);
			}
		},
		sendClipboardPhotoMessage : function(peer, photo) {
			if (checkImpl()) {
				return IM.impl.sendClipboardPhotoMessage.apply(IM.impl, arguments);
			}
		},
		sendFileMessage : function(peer, file) {
			if (checkImpl()) {
				return IM.impl.sendFileMessage.apply(IM.impl, arguments);
			}
		},
		sendVoiceMessage : function(peer, duration, voice) {
			if (checkImpl()) {
				return IM.impl.sendVoiceMessage.apply(IM.impl, arguments);
			}
		},
		deleteChat : function(peer) {
			if (checkImpl()) {
				return IM.impl.deleteChat.apply(IM.impl, arguments);
			}
		},
		clearChat : function(peer) {
			if (checkImpl()) {
				return IM.impl.clearChat.apply(IM.impl, arguments);
			}
		},
		deleteMessage : function(peer, rid) {
			if (checkImpl()) {
				return IM.impl.deleteMessage.apply(IM.impl, arguments);
			}
		},
		bindUser : function(uid, callback) {
			if (checkImpl()) {
				return IM.impl.bindUser.apply(IM.impl, arguments);
			}
		},
		unbindUser : function(uid, callback) {
			if (checkImpl()) {
				return IM.impl.unbindUser.apply(IM.impl, arguments);
			}
		},
		getUser : function(uid) {
			if (checkImpl()) {
				return IM.impl.getUser.apply(IM.impl, arguments);
			}
		},
		getGroup : function(gid) {
			if (checkImpl()) {
				return IM.impl.getGroup.apply(IM.impl, arguments);
			}
		},
		findUsers : function(query) {
			if (checkImpl()) {
				return IM.impl.findUsers.apply(IM.impl, arguments);
			}
		},
		onConversationOpen : function(peer) {
			if (checkImpl()) {
				return IM.impl.onConversationOpen.apply(IM.impl, arguments);
			}
		},
		onConversationClosed : function(peer) {
			if (checkImpl()) {
				return IM.impl.onConversationClosed.apply(IM.impl, arguments);
			}
		},
		onMessageShown : function(peer, message) {
			if (checkImpl()) {
				return IM.impl.onMessageShown.apply(IM.impl, arguments);
			}
		},
		onChatEnd : function(peer) {
			if (checkImpl()) {
				return IM.impl.onChatEnd.apply(IM.impl, arguments);
			}
		},
		bindUserOnline : function(uid, callback) {
			if (checkImpl()) {
				return IM.impl.bindUserOnline.apply(IM.impl, arguments);
			}
		},
		unbindUserOnline : function(uid, callback) {
			if (checkImpl()) {
				return IM.impl.unbindUserOnline.apply(IM.impl, arguments);
			}
		},
		bindGroupOnline : function(gid, callback) {
			if (checkImpl()) {
				return IM.impl.bindGroupOnline.apply(IM.impl, arguments);
			}
		},
		bindTyping : function(peer, callback) {
			if (checkImpl()) {
				return IM.impl.bindTyping.apply(IM.impl, arguments);
			}
		},
		unbindTyping : function(peer, callback) {
			if (checkImpl()) {
				return IM.impl.unbindTyping.apply(IM.impl, arguments);
			}
		},
		getUid : function() {
			if (checkImpl()) {
				return IM.impl.getUid.apply(IM.impl, arguments);
			}
		},
		editMyName : function(string) {
			if (checkImpl()) {
				return IM.impl.editMyName.apply(IM.impl, arguments);
			}
		},
		editMyNick : function(string) {
			if (checkImpl()) {
				return IM.impl.editMyNick.apply(IM.impl, arguments);
			}
		},
		editMyAbout : function(about) {
			if (checkImpl()) {
				return IM.impl.editMyAbout.apply(IM.impl, arguments);
			}
		},
		getUserPeer : function(uid) {
			if (checkImpl()) {
				return IM.impl.getUserPeer.apply(IM.impl, arguments);
			}
		},
		createGroup : function(title, avatar, userIds) {
			if (checkImpl()) {
				return IM.impl.createGroup.apply(IM.impl, arguments);
			}
		},
		bindGroupDialogs : function(callback) {
			if (checkImpl()) {
				return IM.impl.bindGroupDialogs.apply(IM.impl, arguments);
			}
		},
		unbindGroupDialogs : function(callback) {
			if (checkImpl()) {
				return IM.impl.unbindGroupDialogs.apply(IM.impl, arguments);
			}
		},
		getGroupPeer : function(gid) {
			if (checkImpl()) {
				return IM.impl.getGroupPeer.apply(IM.impl, arguments);
			}
		},
		leaveGroup : function(gid) {
			if (checkImpl()) {
				return IM.impl.leaveGroup.apply(IM.impl, arguments);
			}
		},
		inviteMember : function(gid, uid) {
			if (checkImpl()) {
				return IM.impl.inviteMember.apply(IM.impl, arguments);
			}
		},
		kickMember : function(gid, uid) {
			if (checkImpl()) {
				return IM.impl.kickMember.apply(IM.impl, arguments);
			}
		},
		bindGroup : function(gid, callback) {
			if (checkImpl()) {
				return IM.impl.bindGroup.apply(IM.impl, arguments);
			}
		},
		unbindGroup : function(gid, callback) {
			if (checkImpl()) {
				return IM.impl.unbindGroup.apply(IM.impl, arguments);
			}
		},
		bindConnectState : function(callback) {
			if (checkImpl()) {
				return IM.impl.bindConnectState.apply(IM.impl, arguments);
			}
		},
		unbindConnectState : function(callback) {
			if (checkImpl()) {
				return IM.impl.unbindConnectState.apply(IM.impl, arguments);
			}
		},
		changeNotificationsEnabled : function(peer, isEnabled) {
			if (checkImpl()) {
				return IM.impl.changeNotificationsEnabled.apply(IM.impl, arguments);
			}
		},
		isNotificationsEnabled : function(peer) {
			if (checkImpl()) {
				return IM.impl.isNotificationsEnabled.apply(IM.impl, arguments);
			}
		},
		isSendByEnterEnabled : function() {
			if (checkImpl()) {
				return IM.impl.isSendByEnterEnabled.apply(IM.impl, arguments);
			}
		},
		changeSendByEnter : function(isEnabled) {
			if (checkImpl()) {
				return IM.impl.changeSendByEnter.apply(IM.impl, arguments);
			}
		},
		editGroupTitle : function(gid, title) {
			if (checkImpl()) {
				return IM.impl.editGroupTitle.apply(IM.impl, arguments);
			}
		},
		editGroupAbout : function(gid, about) {
			if (checkImpl()) {
				return IM.impl.editGroupAbout.apply(IM.impl, arguments);
			}
		},
		bindMessages : function(peer, callback) {
			if (checkImpl()) {
				return IM.impl.bindMessages.apply(IM.impl, arguments);
			}
		},
		bindChangeMyAvatar : function(url, name, domNode, params) {
			if (checkImpl()) {
				return IM.impl.bindChangeMyAvatar.apply(IM.impl, arguments);
			}
		},
		bindGlobalCounter : function(callback) {
			if (checkImpl()) {
				return IM.impl.bindGlobalCounter.apply(IM.impl, arguments);
			}
		},
		unbindGlobalCounter : function(callback) {
			if (checkImpl()) {
				return IM.impl.unbindGlobalCounter.apply(IM.impl, arguments);
			}
		},
		addLike : function(peer, rid) {
			if (checkImpl()) {
				return IM.impl.addLike.apply(IM.impl, arguments);
			}
		},
		removeLike : function(peer, rid) {
			if (checkImpl()) {
				return IM.impl.removeLike.apply(IM.impl, arguments);
			}
		},
		findAllText : function(peer, query) {
			if (checkImpl()) {
				return IM.impl.findAllText.apply(IM.impl, arguments);
			}
		},
		findAllDocs : function(peer, query) {
			if (checkImpl()) {
				return IM.impl.findAllDocs.apply(IM.impl, arguments);
			}
		},
		findAllLinks : function(peer, query) {
			if (checkImpl()) {
				return IM.impl.findAllLinks.apply(IM.impl, arguments);
			}
		},
		findAllPhotos : function(peer, query) {
			if (checkImpl()) {
				return IM.impl.findAllPhotos.apply(IM.impl, arguments);
			}
		},
		getPeer : function(id, type) {
			if (checkImpl()) {
				return IM.impl.getPeer.apply(IM.impl, arguments);
			}
		},
		getLikeMsgs : function() {
			if (checkImpl()) {
				return IM.impl.getLikeMsgs.apply(IM.impl, arguments);
			}
		},
		getSearchText : function() {
			if (checkImpl()) {
				return IM.impl.getSearchText.apply(IM.impl, arguments);
			}
		},
		getSearchDoc : function() {
			if (checkImpl()) {
				return IM.impl.getSearchDoc.apply(IM.impl, arguments);
			}
		},
		createDeptDlg : function() {
			if (checkImpl()) {
				return IM.impl.createDeptDlg.apply(IM.impl, arguments);
			}
		},
		onDialogsEnd : function() {
			if (checkImpl()) {
				return IM.impl.onDialogsEnd.apply(IM.impl, arguments);
			}
		},
		findGroups : function() {
			if (checkImpl()) {
				return IM.impl.findGroups.apply(IM.impl, arguments);
			}
		},
		notification : function() {
			if (checkImpl()) {
				return IM.impl.notification.apply(IM.impl, arguments);
			}
		},
		setReady : function() {
			if (checkImpl()) {
				return IM.impl.setReady.apply(IM.impl, arguments);
			}
		},
		onLoggedIn : function() {
			if (checkImpl()) {
				return IM.impl.onLoggedIn.apply(IM.impl, arguments);
			}
		},
		updateClientState : function(id) {
			if (checkImpl()) {
				return IM.impl.updateClientState.apply(IM.impl, arguments);
			}
		},
		getCurrentInfo : function() {
			if (checkImpl()) {
				return IM.impl.loadLoginDataByStore.apply(IM.impl, arguments);
			}
		},
		updateGroupShared :function(){
			if (checkImpl()) {
				return IM.impl.updateGroupShared.apply(IM.impl, arguments);
			}
		},
		getOrgPersons : function(){
			if (checkImpl()) {
				return IM.impl.getOrgPersons.apply(IM.impl, arguments);
			}
		},
		getOrgDepts : function(){
			if (checkImpl()) {
				return IM.impl.getOrgDepts.apply(IM.impl, arguments);
			}
		},
		pushNotification : function(){
			if (checkImpl()) {
				return IM.impl.pushNotification.apply(IM.impl, arguments);
			}
		},
		call : call
	};

	return IM;
});