define(function(require) {
	var LogLevel = {
		ALL:10,
		DEBUG:9,
		INFO:8,
		WARN:7,
		ERROR:6, 
		OFF:5
	};
	
	var Log = {
		'default':{method:'log',level:LogLevel.ALL},
		d:{method:'log',level:LogLevel.DEBUG},
		i:{method:'info',level:LogLevel.INFO},
		w:{method:'warn',level:LogLevel.WARN},
		e:{method:'error',level:LogLevel.ERROR}
	};
	
	var getLog = function(type){
		var ret = Log[type];
		return ret?ret:Log['default'];
	};
	
	var logHandler = function(tag, type, message) {
		var logLevel = LogLevel.INFO;//设置日志级别
		var log = getLog(type);
		if(logLevel>=log.level)	console[log.method](tag + ': ' + message);
	};
	
	return {
		endpoints :/*[ 'ws://im.wex5.com:29080' ]*/ 
			[ 'ws://192.168.0.28:9080' ],//配置im服务器地址wss://192.168.1.28:8443
		logHandler : logHandler
	};
});