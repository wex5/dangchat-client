/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	//var justep = require("$UI/system/lib/justep");
	//var biz = require('$UI/system/lib/biz');
	var getFuncTreeUrl = require.toUrl('$UI/system/service/common/getFunctionTree.j');
	
	var Util = {
			getFuncTree: function(){
				var deferred = $.Deferred();
				$.ajax({
					"type" : "post",
					"async" : false,
					"dataType" : "json",
					"contentType" : "application/json",
					"url" : getFuncTreeUrl,
					"success" : function(data, textStatus, jqXHR){
						deferred.resolve(data.menu);
					}
				});
				return deferred.promise();
			}			
	};
	
	return Util;
});