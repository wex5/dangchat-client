/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IM = require("../base/js/im");

	var mapping = require("$UI/system/lib/bind/bind.mapping");
	var Org = require("$UI/system/components/justep/org/js/org");
	var ChinesePY = require("$UI/system/lib/base/chinesePY");
	var OrgUtil = Org.Util;
	var OrgRow = Org.Row;

	var Model = function() {
		this.callParent();
		this.limit = 12;
		this.includeOrgKind = "psm";
		this.includeDisabled = false;
		this.commonGroupOrg = false;
		this.cascade = false;
		this.list = [];
		this.viewList = [];
		this.loadOrgOK = $.Deferred();
		this.loaded = justep.Bind.observable(-1);
		this.groupData = justep.Bind.observableArray([]);
		this.filterText = justep.Bind.observable("").extend({
			rateLimit : 1000
		});
		this.filterListSize = justep.Bind.observable(this.limit);
		this.multiSelection = justep.Bind.observable(false);
		this.currentRow = justep.Bind.observable();
		this.showFilter = "";
		this.selectFilter = "";
		this.offset = justep.Bind.observable({
			start : 0,
			end : this.limit
		});

		// 挂接scrollView的下拉和上划事件
		this.on("onPullDown", function(evt) {
			if (this.filterText.get()) {
				evt.noMoreLoad = true;
				return;
			}
			var offset = this.offset.get(), v = offset.start - this.limit;
			this.offset.set({
				start : v > 0 ? v : 0,
				end : offset.end
			});
			evt.noMoreLoad = !this.hasMore();
		}, this);

		this.on("onPullUp", function(evt) {
			if (!this.filterText.get()) {
				var offset = this.offset.get(), v = offset.end + this.limit, size = this.list.length;
				this.offset.set({
					start : offset.start,
					end : v < size ? v : size
				});
			} else {
				this.filterListSize.set(this.limit + this.filterListSize.get());
			}
			evt.noMoreLoad = !this.hasMore();
		}, this);

		this.bindGroupData();
		this.isFromDlg = justep.Bind.observable(false);
		this.transmit = {};
		this.transmitNum = 0;
		this.row_click = justep.Bind.observable();
	};

	Model.prototype.bindGroupData = function() {
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
						checkRow : 0
					});
				}
			}
			self.loadOrgOK = $.Deferred();
			self.processOrgData();
			self.load();
		});
	};

	Model.prototype.clsfilterText = function() {
		var me = this;
		setTimeout(function() {
			me.filterText.set('');
			me.filterListSize.set(me.limit);
		}, 50);
	};

	Model.prototype.load = function() {
		var me = this;
		this.loadOrgOK.done(function() {
			me.loaded.set(1 + me.loaded.get());
		});
	};

	// 获取组织机构的数据，来自缓存，返回数据按拼音首字母排序处理
	Model.prototype.getOrgData = function() {
		return OrgUtil.getOrgData(this, this.includeOrgKind, this.showFilter, this.includeDisabled, this.commonGroupOrg);
	};

	var orderbyDept = function(orgs, dept) {
		orgs = orderBySequence(orgs);
		dept = orderBySequence(dept);
		var map = {};
		for (var i = 0; i < orgs.length; i++) {
			for (var j = 0; j < dept.length; j++) {
				if (orgs[i].sFID.indexOf(dept[j].sFID) === 0) {
					if (!map[dept[j].sFID])
						map[dept[j].sFID] = {
							name : dept[j].sFName.substring(1, dept[j].sFName.length),
							psm : []
						};
					map[dept[j].sFID].psm.push(orgs[i]);
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
		return ret;
	};
	// 目前忽略建在组织下的人
	var deptFilter = function(dept) {
		var row = [];
		$.each(dept, function(i, v) {
			var index = v.sFID.lastIndexOf('/');
			if (v.sFID.substring(index - 3, index) === 'ogn') {
				row.push(v);
			}
		});
		return row;
	};
	var orderBySequence = function(row) {
		var rowComp = function(a, b) {
			if (a.sSequence && b.sSequence)
				return a.sSequence > b.sSequence ? 1 : -1;
		};
		return row.sort(rowComp);
	};
	var addCheckRow = function(orgs) {
		$.each(orgs, function(i, v) {
			if (!v.checkRow) {
				v.checkRow = 0;
			}
		});
		return orgs;
	};
	// 处理组织机构数据增加key数据
	Model.prototype.processOrgData = function() {
		var me = this;
		$.when(this.getOrgData(), OrgUtil.getOrgData(this, 'dpt,pos', null, this.includeDisabled, this.commonGroupOrg)).done(function(orgs, dept) {
			var group = me.groupData;
			dept = deptFilter(dept);
			orgs = addCheckRow(orgs);
			var list = orderbyDept(orgs, dept);
			if ($.isArray(group) && group.length > 0) {
				$.each(group, function(i, v) {
					v.isGroup = true;
					list.splice(i, 0, v);
				});
				list.splice(0, 0, {
					sName : '群聊',
					isTitle : true
				// isGroup : true
				});
			}
			me.list = list;
			me.loadOrgOK.resolve();
		});
	};

	Model.prototype.getFilterList = function(filterText) {
		var ret = [];
		if (!filterText)
			return ret;
		filterText = filterText.toUpperCase();
		var len = this.list.length, count = 0, size = this.filterListSize.get();
		for (var i = 0; i < len; i++) {
			var row = this.list[i], v = this.getRowValue(row, 'sName'), v1 = this.getRowValue(row, 'sChineseFirstPY'), isTitle = this.getRowValue(row, 'isTitle');
			if (!isTitle && (v.indexOf(filterText) > -1 || (v1 && (v1.indexOf(filterText) > -1)))) {
				if (!mapping.isMapped(row)) {
					row['selected'] = false;
					row = mapping.fromJS(row);
					this.list[i] = row;
				}
				ret.push(row);
				count++;
				if (count >= size)
					break;
			}
		}

		this.oldList1 = this.oldList2;
		this.oldList2 = ret;
		return ret;
	};

	// foreach提供数据的方法
	Model.prototype.getList = function() {
		// this.b = new Date();
		if (this.loaded.get() < 0)
			return [];
		var filterText = this.filterText.get();
		if (filterText)
			return this.getFilterList(filterText);
		var offset = this.offset.get();
		var max = offset.end, min = offset.start, size = max - min + 1, len = this.list.length;
		var ret = [];
		for (var i = min, j = 0; j < size && i < len; i++) {
			var row = this.list[i];
			if (!mapping.isMapped(row)) {
				row['selected'] = false;
				row = mapping.fromJS(row);
				this.list[i] = row;
			}
			ret.push(row);
			j++;
		}
		this.viewList = ret;
		this.oldList1 = this.oldList2;
		this.oldList2 = ret;
		return ret;
	};

	Model.prototype.hasMore = function() {
		return !($.isArray(this.oldList1) && $.isArray(this.oldList2) && this.oldList1.length === this.oldList2.length);
	};

	Model.prototype.indexOf = function(value, name, array) {
		array = array || this.list;
		var len = array.length;
		for (var i = 0; i < len; i++) {
			var v = this.getRowValue(array[i], name);
			if (value == v)
				return i;
		}
		return -1;
	};

	Model.prototype.getRowValue = function(row, name) {
		return OrgUtil.getRowValue(row, name);
	};

	Model.prototype.setRowValue = function(row, name, value) {
		OrgUtil.setRowValue(row, name, value);
	};

	// foreach渲染后通知scrollView重新计算高度
	Model.prototype.afterRender = function() {
		// var e = new Date();
		// $('.info').text(e.getTime()-this.b.getTime());
		var me = this;
		setTimeout(function() {
			me.comp('scrollView').refresh();
		}, 50);
	};

	Model.prototype.doSelectFilter = function(row) {
		if (this.selectFilter) {
			if ('string' == typeof (this.selectFilter))
				this.selectFilter = new justep.Express(this.selectFilter);
			if (this.selectFilter instanceof justep.Express) {
				var orgRow = new OrgRow(row);
				var ctx = {
					$model : this,
					$row : orgRow
				};
				return justep.Express.eval(this.selectFilter, ctx.$row, ctx);
			}
		}
		return true;
	};

	Model.prototype.doRowClick = function($object, evt) {
		var isTitle = this.getRowValue($object, 'isTitle');
		if (isTitle)
			return;
		if (this.multiSelection.get()) {
			var b = !$object.selected.get();
			$object.selected.set(b && this.doSelectFilter($object));
			if (this.cascade) {
				var len = this.list.length;
				var csid = this.getRowValue($object, 'sFID');
				for (var i = 0; i < len; i++) {
					var row = this.list[i];
					isTitle = this.getRowValue(row, 'isTitle');
					if (!isTitle) {
						var sid = this.getRowValue(row, 'sFID');
						if (0 === sid.indexOf(csid))
							this.setRowValue(row, 'selected', b && this.doSelectFilter(row));
					}
				}
			}
		} else {
			if (this.doSelectFilter($object))
				this.currentRow.set($object);
		}
	};

	// 接管url生成，主要赋值blobLastModified，使用缓存
	Model.prototype.orgImage1CreateURL = function(event) {
		event.blobLastModified = this.getRowValue(event.bindingContext.$object, 'sPhotoLastModified');
	};

	Model.prototype.modelLoad = function(event) {
		var isFromDlg = this.params.fromDialog;
		this.isFromDlg.set(isFromDlg);
		this.processOrgData();
		this.load();
	};

	Model.prototype.groupListClick = function(event) {
		var gid;
		if (this.isFromDlg.get()) {
			this.currentRow.set(event.bindingContext.$object);
			gid = this.getRowValue(event.bindingContext.$object, "sID");
			var index = "group_" + gid;
			if (!this.transmit[index]) {
				this.transmit[index] = {
					peer : IM.getGroupPeer(gid),
					type : 'group'
				};
				this.setRowValue(event.bindingContext.$object, "checkRow", 1);
				this.transmitNum++;
			} else {
				delete this.transmit[index];
				this.setRowValue(event.bindingContext.$object, "checkRow", 0);
				this.transmitNum--;
			}

		} else {
			this.currentRow.set(event.bindingContext.$object);
			gid = this.getRowValue(event.bindingContext.$object, "sID");
			var peer = IM.getGroupPeer(gid);
			justep.Shell.fireEvent('onGroupInfoPage', {
				id : peer.id,
				type : peer.type
			});
		}
	};

	Model.prototype.contactInfoClick = function(event) {
		if (this.isFromDlg.get()) {
			this.currentRow.set(event.bindingContext.$object);
			var pid = this.getRowValue(event.bindingContext.$object, "sPersonID");
			var person = IM.getPerson(pid);
			var index = "person_" + pid;
			if (!this.transmit[index]) {
				this.transmit[index] = {
					promise : IM.addFriend(person),
					type : 'user'
				};
				this.setRowValue(event.bindingContext.$object, "checkRow", 1);
				this.transmitNum++;
			} else {
				delete this.transmit[index];
				this.setRowValue(event.bindingContext.$object, "checkRow", 0);
				this.transmitNum--;
			}
		} else {
			this.currentRow.set(event.bindingContext.$object);
			justep.Shell.fireEvent('onContactInfoPage', {
				"contactId" : this.getRowValue(event.bindingContext.$object, "sPersonID")
			});
		}
	};

	Model.prototype.sendBtnClick = function(event) {
		if (this.params.data && $.isFunction(this.params.data.callback)) {
			var callback = this.params.data.callback;
			var index = 0, count = this.transmitNum;
			if (this.transmitNum > 0) {
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
		}
		this.owner.close();
	};

	Model.prototype.deptNameClick = function(event) {
		var sFID = this.getRowValue(event.bindingContext.$object, "sFID");
		var sName = this.getRowValue(event.bindingContext.$object, "sName");
		if (!this.isFromDlg.get()&&sFID) {
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

	return Model;
});