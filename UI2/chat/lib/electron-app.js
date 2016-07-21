define(function(require) {
	var $ = require("jquery");
	var getIsInElectron = function() {
		return navigator.userAgent.indexOf("Electron") !=-1;
	};
	var setIsInElectron = function(isInElectron) {
		//兼容性保留
	};
	
	var sendMessage = function(){};
	var sendSyncMessage = function(){};
	
	
	if(getIsInElectron()){
		var ipcRenderer = window.requireNode('electron').ipcRenderer;
		
		window.Notification = function(title,options){
			options = options || {};
			ipcRenderer.send('notification', JSON.stringify({
				title:title,
				body: options.body
			}));
		};
		
		Notification.permission = "granted";
		Notification.requestPermission = function(callback){
			if(callback){
				callback("granted");
			}else{
				var dfd = $.Deferred();	
				dfd.resolve("granted");
				return dfd.promise();
			}
		};
		
		sendMessage = function(type,args){
			ipcRenderer.send(type, JSON.stringify(args));
		};
		
		sendSyncMessage = function(type,args){
			return ipcRenderer.sendSync(type, JSON.stringify(args));
		};
		
		
		var remote = window.requireNode('electron').remote;
		var Menu = remote.Menu;
		var InputMenu = Menu.buildFromTemplate([{
		        label: '撤销',
		        role: 'undo',
		    }, {
		        label: '重做',
		        role: 'redo',
		    }, {
		        type: 'separator',
		    }, {
		        label: '剪切',
		        role: 'cut',
		    }, {
		        label: '复制',
		        role: 'copy',
		    }, {
		        label: '粘贴',
		        role: 'paste',
		    }, {
		        type: 'separator',
		    }, {
		        label: '全选',
		        role: 'selectall',
		    },
		]);
	
		document.body.addEventListener('contextmenu', function(e){
		    e.preventDefault();
		    e.stopPropagation();
		    var node = e.target;
		    while (node) {
		        if (node.nodeName.match(/^(input|textarea)$/i) || node.isContentEditable) {
		            InputMenu.popup(remote.getCurrentWindow());
		            break;
		        }
		        node = node.parentNode;
		    }
		});
	}
	
	return {
		sendMessage:sendMessage,
		sendSyncMessage:sendSyncMessage,
		getIsInElectron: getIsInElectron,
		setIsInElectron: setIsInElectron
	};
});