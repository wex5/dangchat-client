/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
/**
 *  properties type: string, number, boolean, array, object
 *  binds: key是DOM上的属性名称, value是收集到component中的名称
 */
define(function(require){
	return {
		properties: {
			title : "string",
			mode : "string",
			filter : "string",
			process: "string",
			activity: "string",
			forceRefreshOnOpen: "boolean",
			status: "string",
			width: "string",
			height: "string",
			top: "string",
			left: "string",
			routable:"boolean"
		},
		events:["onLoad", "onSend", "onOpen", "onClose", "onReceive", "onLoadError", "onReceived"],
		binds:{}
	};
});