/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var ChinesePY = require("$UI/system/lib/base/chinesePY");
	var Util = require("../js/util");

	var Model = function() {
		this.callParent();

		this.mode = justep.Bind.observable("selectFunc");// runFunc,selectFunc
		
		this.queryText = justep.Bind.observable("");
		
		this.filterText = justep.Bind.observable("");
		this.filterExpr = null;
	};

	Model.prototype.clsQueryText = function(row) {
		this.queryText.set("");
	};

	Model.prototype.funcFilter = function(row) {
		var queryVal = this.queryText.get();
		var filterVal = this.filterText.get();
		if ((queryVal || filterVal) && row) {
			if(this.filterExpr instanceof justep.Express){//过滤表达式计算
				var model = this.owner && $.isFunction(this.owner.getModel) && this.owner.getModel(); 
				var ctx = {
						$model : model,
						$row : row
				};
				if (!justep.Express.eval(this.filterExpr, row, ctx)) return false;
			}
			var name = row.val('fTitle'), namePY = row.val('fTitlePY');
			return name && (name.indexOf(queryVal) > -1 || namePY.indexOf(queryVal) > -1);
		} else
			return true;
	};

	var funcTree2Data = function(funcTree, rows, x) {
		var funcCount = 0;
		$.each(funcTree, function(i, func) {
			var row = {
				ID : '',
				fIcon : func.iconClass || 'icon-social-buffer',
				fIconColor : func.color || '#2fa4e7',
				fTitle : func.label || '',
				fTitlePY : ChinesePY.makeFirstPY(func.label) || '',
				fIsFunc : true,
				fUrl : func.url || '',
				fProcess : func.process || '',
				fActivity : func.activity || ''
			};
			if ($.isArray(func.$children)) {
				if (x === 0 && func.$children.length > 0) {
					row.fIsFunc = false;
					rows.push(row);
				}
				var count = funcTree2Data(func.$children, rows, x + 1);
				if (x === 0 && count === 0)
					rows.pop();
				funcCount += count;
			} else {
				rows.push(row);
				funcCount++;
			}
		});
		return funcCount;
	};

	Model.prototype.funcsDataCustomRefresh = function(event) {
		var data = this.comp('funcsData');
		Util.getFuncTree().then(function(funcTree) {
			var funcList = [];
			funcTree2Data(funcTree.$children, funcList, 0);
			data.loadData(funcList);
		});
	};

	Model.prototype.rowClick = function(event) {
		var row = event.bindingContext.$object;
		if ('selectFunc' === this.mode.peek()) {
			var b = !row.val('selected');
			row.val('selected', b);
		} else {
			justep.Shell.showPage({
				url : require.toUrl(row.val('fUrl')),
				process : row.val('fProcess'),
				activity : row.val('fActivity')
			});
		}
	};

	Model.prototype.getSelect = function() {
		var ret = [];
		this.comp('funcsData').each(function(param) {
			var row = param.row;
			if (row.val('selected')) {
				ret.push({
					url : row.val('fUrl'),
					process : row.val('fProcess'),
					activity : row.val('fActivity'),
					label : row.val('fTitle'), 
					iconClass : row.val('fIcon'),
					iconColor : row.val('fIconColor')
				});
			}
		});
		return ret;
	};

	Model.prototype.btnOKClick = function(event) {
		this.owner.send(this.getSelect());
		this.owner.close();
	};

	Model.prototype.modelParamsReceive = function(event){
		if(this.params){
			this.params.title && this.comp('titleBar').set('title',this.params.title);
			this.params.mode && this.mode.set(this.params.mode);
			if(this.params.filter && this.params.filter!==this.filterText.peek()){
				//先创建expr,在设置filterText刺激bind计算
				this.filterExpr = new justep.Express(this.params.filter);
				this.filterText.set(this.params.filter);
			}
		}
	};

	return Model;
});