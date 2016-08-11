define(function(require) {
	var $ = require("jquery");
	var IM = require("../base/js/im");
	var ChinesePY = require("$UI/system/lib/base/chinesePY");
	var Model = function() {
		this.callParent();
	};
	var orderBySequence = function(row) {
		var rowComp = function(a, b) {
			if (a.sSequence && b.sSequence)
				return a.sSequence > b.sSequence ? 1 : -1;
		};
		return row.sort(rowComp);
	};
	var addType = function(rows) {
		$.each(rows, function(i, v) {
			if (!v.type) {
				v.type = "person";
			}
		});
		return rows;
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
	Model.prototype.loadAllData = function() {
		var self = this;
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
								};
							map[depts[j].sFID].psm.push(persons[i]);
						}
					}
				}
			}
			var ret = [];
			$.each(map, function(n, depts) {
				ret.push({
					sName : depts.name,
					sFID : n,
					checkRow : "0",
					isTitle : true
				});
				ret = ret.concat(depts.psm);
			});
			self.loadData(ret);
		});
	};

	Model.prototype.deptNameClick = function(event) {
		var sFID = event.bindingContext.$object.val("fsFID");
		var data = this.comp('contactListData');
		var row = event.bindingContext.$object;
		if(row.val("fCheckRow") === "0"){
			row.val("fCheckRow","1");
		}else{
			row.val("fCheckRow","0");
		}
		this.selectPerson(sFID, row, data);
	};
	Model.prototype.deptNameCheckBoxChange = function(event) {
		var sFID = event.bindingContext.$object.val("fsFID");
		var data = this.comp('contactListData');
		var row = event.bindingContext.$object;
		var self = this;
		setTimeout(function(){
			self.selectPerson(sFID, row, data);
		}, 1);
	};
	Model.prototype.selectPerson = function(sFID,checkRow,data){
		var row;
		var persons = [];
		if (checkRow.val("fCheckRow") === "1") {
			data.each(function(params) {
				row = params.row;
				if (row.val("type") === "person" && row.val("fsFID").indexOf(sFID) === 0){
					if(sFID.slice(-3) === 'ogn'){
						if(row.val("fsFID").indexOf('dpt') === -1){
							row.val("fCheckRow", "1");
						}
					}else{
						if(persons.indexOf(row.val("fID"))===-1){
							persons.push(row.val("fID"));
							row.val("fCheckRow", "1");
						}
					}
				}
			});
		} else {
			data.each(function(params) {
				row = params.row;
				if (row.val("type") === "person" && row.val("fsFID").indexOf(sFID) === 0){
					if(sFID.slice(-3) === 'ogn'){
						if(row.val("fsFID").indexOf('dpt') === -1){
							row.val("fCheckRow", "0");
						}
					}else{
						if(persons.indexOf(row.val("fID"))===-1){
							persons.push(row.val("fID"));
							row.val("fCheckRow", "0");
						}
					}
				}
			});
		}
	};
	return Model;
});