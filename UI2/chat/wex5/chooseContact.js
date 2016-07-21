define(function(require) {
	var $ = require("jquery");
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
	Model.prototype.loadAllData = function() {
		var self = this;
		$.when(self.getDepts(), self.loadPerson()).done(function(depts, persons) {
			persons = orderBySequence(persons);
			persons = addType(persons);
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
					isTitle : true
				});
				ret = ret.concat(depts.psm);
			});
			self.loadData(ret);
		});
	};
	return Model;
});