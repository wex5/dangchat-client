define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IMImpl = require('../../base/js/im.impl');
	var Person = require("../../base/js/person");
	var store = require('$UI/system/lib/base/store');
	var Uploader = require('$UI/system/components/justep/uploader/uploader');
	
	var loginByWex5 = function(params) {
		var ret;
		var userParams = {};
		userParams.CurrentPersonID = "";
		userParams.CurrentPersonName = "";
		userParams.CurrentPersonFID = "";
		userParams.CurrentPersonFName = "";
		userParams.CurrentOgnID = "";
		userParams.CurrentOgnName = "";
		userParams.CurrentDeptID = "";
		userParams.CurrentDeptName = "";
		userParams.CurrentDeptFID = "";
		userParams.CurrentDeptFName = "";
		userParams.CurrentOgnFID = "";
		userParams.CurrentOgnFName = "";
		userParams.CurrentFunRole = "3";// 默认为3：普通员工。（1:公司领导；2:部门主管；3:普通员工）
		justep.Baas.sendRequest({
			"url" : "/org/login",
			"action" : "loginAction",
			"async" : false,
			"params" : {
				"userName" : params.username,
				"password" : params.password
			},
			"success" : function(data) {
				ret = data;
				if (ret.flag) {
					userParams.CurrentPersonID = ret.personID;
					userParams.CurrentPersonName = ret.personName;
					userParams.CurrentPersonFID = ret.CurrentFID;
					userParams.CurrentPersonFName = ret.CurrentFName;
					userParams.CurrentOgnID = ret.CurrentOgnID;
					userParams.CurrentOgnName = ret.CurrentOgnName;
					userParams.CurrentFunRole = ret.CurrentFunRole;

					userParams.CurrentOgnFID = "/" + ret.CurrentFID.split("/")[1];
					userParams.CurrentOgnFName = "/" + ret.CurrentFName.split("/")[1];
					if (ret.CurrentFID.indexOf("dpt") > 0) {
						userParams.CurrentDeptID = ret.CurrentDeptID;
						userParams.CurrentDeptName = ret.CurrentDeptName;
						userParams.CurrentDeptFID = ret.CurrentFID.substring(0, ret.CurrentFID.indexOf("dpt") + 3);
						userParams.CurrentDeptFName = ret.CurrentFName.substring(0, ret.CurrentFName.indexOf("/", ret.CurrentFName.indexOf("/", 2) + 1));
					}
					saveLoginDataToStore(userParams);
				}
			}
		});
		return ret;
	};

	var password = [ 15, 52, 60, 73, 12, 11, 86, 35 ];
	var encrypt = function(str, key) {
		var ret = '', keyLen = key.length;
		for (var i = 0; i < str.length; i++) {
			ret += String.fromCharCode(str.charCodeAt(i) ^ key[i % keyLen]);
		}
		return ret;
	};

	var saveLoginDataToStore = function(data) {
		data = JSON.stringify(data);
		store.set('work_loginData', encrypt(data, password));
	};

	var IMWex5Impl = IMImpl.extend({
		loadPerson : function(persons, pid) {
			var deferred = $.Deferred();
			justep.Baas.sendRequest({
				"url" : "/org/loadPerson",
				"action" : "loadPerson",
				"async" : false,
				"params" : {
					"sPersonID" : pid
				},
				"success" : function(data) {
					$.each(data.persons, function(i, v) {
						var p = {
							id : v.sPersonID,
							name : v.sName,
							uid : v.sNumb,
							avatar : getPersonAvatar(v.sPhoto),
							nick : '',
							phones : [],
							about : ''
						};
						persons[v.sPersonID] = new Person(p);
					});
					deferred.resolve(persons);
				}
			});
			return deferred.promise();
		},
		doLogin : function(param) {
			return loginByWex5(param);
		},
		doLoginAfter : function(result) {
			if (!result.isInOrg) {
				justep.Shell.fireEvent('toChooseOrg', {
					personID : result.personID
				});
			} else
				this.callParent(result);
		},
		doLogout : function() {

		},
		updatePersonUid : function(uid, pid) {
			var self = this;
			var deferred = $.Deferred();
			justep.Baas.sendRequest({
				"url" : "/org/updatePersonUid",
				"action" : "updatePersonUid",
				"async" : false,
				"params" : {
					"uid" : uid,
					"pid" : pid
				},
				"success" : function(data) {
					if (data.state) {
						var person = self._getPerson(pid);
						if (person) {
							person.uid = uid;
						}
					}
					deferred.resolve();
				}
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
					id : person.id
				};
				uploader.addData(params);
			});
			uploader.on('onSuccess', function(evt) {
				person.avatar = getPersonAvatar(evt.response.imgFile);
			});
			return uploader;
		},
		loadLoginDataByStore : function() {
			var _loginData_;
			if (_loginData_)
				return _loginData_;
			var data = store.get('work_loginData');
			if (data) {
				data = encrypt(data, password);
				_loginData_ = JSON.parse(data);
				return _loginData_;
			}
		},
	});

	var getPersonAvatar = function(imgFile){
		if(imgFile){
			return justep.Baas.BASE_URL+"/org/personAvatar/getPersonAvatar?imgFile="+imgFile;
		}else{
			return null;
		}
		
	};
	
	return IMWex5Impl;
});