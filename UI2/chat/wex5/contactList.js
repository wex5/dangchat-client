define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var ChinesePY = require("$UI/system/lib/base/chinesePY");
	var IM = require("../base/js/im");

	var Model = function() {
		this.callParent();
		this.isFromDlg = justep.Bind.observable(false);
		this.isCreateGroup = justep.Bind.observable(false);
		this.filterVal = justep.Bind.observable();
		this.transmit = {};
		this.transmitNum = 0;
		this.currentPersonID = justep.Bind.observable();
	};

	Model.prototype.contactListFilter = function(row) {
		var filterVal = this.filterVal.get();
		if (filterVal && row) {
			var name = row.val('fsName'), namePY = row.val('sChineseFirstPY') ? row.val('sChineseFirstPY').toLocaleLowerCase() : '';
			return (name && (name.indexOf(filterVal) > -1)) || (namePY && (namePY.indexOf(filterVal) > -1));
		} else
			return true;
	};

	Model.prototype.modelModelConstructDone = function(event) {
		var isFromDlg = this.params.fromDialog;
		var isCreateGroup = this.params.createGroup;
		this.isFromDlg.set(isFromDlg);
		this.isCreateGroup.set(isCreateGroup);
		this.currentPersonID.set(IM.getCurrentPerson().id);
		this.loadAllData();
	};
	Model.prototype.loadAllData = function() {
		var self = this;
		IM.bindGroupDialogs(function(groups) {
			self.groupData = [];
			if (groups.length > 0) {
				for (var i = 0; i < groups[0].shorts.length; i++) {
					var id = groups[0].shorts[i].peer.peer.id;
					var group = IM.getGroup(id);
					self.groupData.push({
						sID : id,
						sName : group.name + '(' + group.members.length + '人)',
						sAbout : group.about || group.name,
						fImg : group.aratar ? group.aratar : IM.getGroupDefaultIcon(),
						sChineseFirstPY : ChinesePY.makeFirstPY(group.name).toLocaleUpperCase(),
						checkRow : "0",
						type : "group"
					});
				}
			}
			$.when(IM.getOrgDepts(self.currentPersonID.get()), IM.getOrgPersons(self.currentPersonID.get())).done(function(depts, persons) {
				persons = ChineseFirstPY(persons);
				persons = addCheckRow(persons);
				persons = orderBySequence(persons);
				persons = addType(persons);
				depts = ChineseFirstPY(depts);
				depts = orderBySequence(depts);
				var map = {};
				for (var i = 0; i < persons.length; i++) {
					for (var j = 0; j < depts.length; j++) {
						if (persons[i].sFID.indexOf(depts[j].sFID) === 0) {
							if (depts[j].sFID.slice(-3) === 'ogn') {
								if (persons[i].sFID.indexOf('dpt') === -1) {
									if (!map[depts[j].sFID])
										map[depts[j].sFID] = {
											name : depts[j].sFName.substring(1, depts[j].sFName.length),
											psm : [],
										};
									map[depts[j].sFID].psm.push(persons[i]);
								}
							} else {
								if (!map[depts[j].sFID])
									map[depts[j].sFID] = {
										name : depts[j].sFName.substring(1, depts[j].sFName.length),
										psm : [],
										psms : []
									};
								if(map[depts[j].sFID].psms.indexOf(persons[i].sID)===-1){
									map[depts[j].sFID].psm.push(persons[i]);
									map[depts[j].sFID].psms.push(persons[i].sID);
								}
							}
						}
					}
				}
				var ret = [];
				$.each(map, function(n, depts) {
					ret.push({
						sName : depts.name,
						sFID : n,
						isTitle : true
					});
					ret = ret.concat(depts.psm);
				});
				if (self.groupData.length !== 0) {
					var group = [ {
						sName : "群组",
						isTitle : true
					} ];
					group = group.concat(self.groupData);
					ret = group.concat(ret);
				}
				self.loadData(ret);
			});
		});
	};
	Model.prototype.loadData = function(ret) {
		var rows = [];
		if (ret) {
			for (var i = 0; i < ret.length; i++) {
				rows.push({
					fID : ret[i].sID ? ret[i].sID : 0,
					fSpersonID : ret[i].sPersonID,
					fIsGroup : ret[i].isTitle,
					fsfName : ret[i].sFName || ret[i].sName,
					fsName : ret[i].sName,
					fSabout : ret[i].sAbout,
					fCheckRow : ret[i].checkRow,
					fsFID : ret[i].sFID,
					sChineseFirstPY : ret[i].sChineseFirstPY,
					type : ret[i].type,
					fImg : ret[i].type === "person" ? this.personAvatar(ret[i].sPhoto) : ret[i].type === "group" ? ret[i].fImg : ""
				});
			}
		}
		this.comp("contactListData").loadData(rows);
	};
	var addType = function(rows) {
		$.each(rows, function(i, v) {
			if (!v.type) {
				v.type = "person";
			}
		});
		return rows;
	};
	Model.prototype.personAvatar = function(imgFile) {
		if (imgFile) {
			return justep.Baas.BASE_URL + "/org/personAvatar/getPersonAvatar?imgFile=" + imgFile;
		} else {
			return null;
		}
	};

	var ChineseFirstPY = function(rows) {
		$.each(rows, function(i, v) {
			v.sChineseFirstPY = ChinesePY.makeFirstPY(v.sChineseFirstPY).toLocaleUpperCase();
		});
		return rows;
	};
	var addCheckRow = function(rows) {
		$.each(rows, function(i, v) {
			if (!v.checkRow) {
				v.checkRow = "0";
			}
		});
		return rows;
	};

	var orderBySequence = function(row) {
		var rowComp = function(a, b) {
			if (a.sSequence && b.sSequence)
				return a.sSequence > b.sSequence ? 1 : -1;
		};
		return row.sort(rowComp);
	};

	Model.prototype.contactInfoClick = function(event) {
		var gid;
		if (this.isFromDlg.get()) {
			var row = event.bindingContext.$object;
			if(row.val("fCheckRow") === "0"){
				row.val("fCheckRow","1");
			}else{
				row.val("fCheckRow","0");
			}
			this.getDataArray(row);
		} else {
			if (event.bindingContext.$object.val("type") === 'group') {
				gid = event.bindingContext.$object.val("fID");
				var peer = IM.getGroupPeer(gid);
				justep.Shell.fireEvent('onGroupInfoPage', {
					id : peer.id,
					type : peer.type
				});
			} else {
				justep.Shell.fireEvent('onContactInfoPage', {
					"contactId" : event.bindingContext.$object.val('fSpersonID'),
					"name" : event.bindingContext.$object.val("fsName")
				});
			}
		}
		if (!justep.Browser.isIOS) {
			return false;
		}
	};

	Model.prototype.deptNameClick = function(event) {
		var sFID = event.bindingContext.$object.val("fsFID");
		var sName = event.bindingContext.$object.val("fsfName");
		if (!this.isFromDlg.get() && sFID) {
			if (justep.Browser.isPC) {
				justep.Shell.fireEvent('createDeptDlg', {
					sFID : sFID,
					sName : sName
				});
			} else {
				justep.Shell.showPage("createDlgByDept", {
					sFID : sFID,
					sName : sName
				});
			}
		}
	};

	Model.prototype.clsfilterText = function(event) {
		this.filterVal.set("");
	};

	Model.prototype.sendBtnClick = function(event) {
		if (this.params.data && $.isFunction(this.params.data.callback)) {
			var callback = this.params.data.callback;
			var index = 0, count = this.transmitNum;
			if (count > 0) {
				$.each(this.transmit, function(i, v) {
					if (v.type === "group") {
						index++;
						callback({
							peer : v.peer,
							count : count,
							index : index
						});
					} else {
						v.promise.then(function(uid) {
							var peer = IM.getUserPeer(uid);
							index++;
							callback({
								peer : peer,
								count : count,
								index : index
							});
						});
					}
				});
			}
		} else {
			var rows = [];
			this.comp('contactListData').each(function(params) {
				var row = params.row;
				if (row.val('fCheckRow') === "1") {
					rows.push(row);
				}
			});
			this.owner.send(rows);
		}
		this.owner.close();
	};

	Model.prototype.checkboxChange = function(event) {
		var self = this;
		var row = event.bindingContext.$object;
		setTimeout(function(){
			self.getDataArray(row);
		}, 1);
	};
	
	Model.prototype.getDataArray = function(row) {
		var gid,index;
		if (row.val("type") === 'group') {
			 gid = row.val("fID");
			index = "group_" + gid;
			if (!this.transmit[index]&&row.val("fCheckRow")==="1") {
				this.transmit[index] = {
					peer : IM.getGroupPeer(gid),
					type : 'group'
				};
				this.transmitNum++;
			} else {
				delete this.transmit[index];
				this.transmitNum--;
			}
		} else {
			var pid = row.val("fSpersonID");
			var person = IM.getPerson(pid);
			index = "person_" + pid;
			if (!this.transmit[index]&&row.val("fCheckRow")==="1") {
				this.transmit[index] = {
					promise : IM.addFriend(person),
					type : 'user'
				};
				this.transmitNum++;
			} else {
				delete this.transmit[index];
				this.transmitNum--;
			}
		}
	};

	return Model;
});