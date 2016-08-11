define(function(require) {
	var getLatestChat = function(dialog) {
		var text = "";
		if (dialog.showSender) {
			text = dialog.sender + "：" + dialog.text;
		} else {
			text = dialog.text === "Photo" ?"图片" : (dialog.text==="Audio" ? "语音" : dialog.text);
		}
		return (getCharLength(text) > 32 ? subCharString(text, 32) + "..." : text);
	};

	// 把双字节的替换成两个单字节的然后再获得长度
	var getCharLength = function(str) {
		if (str === null)
			return 0;
		if (typeof str != "string") {
			str += "";
		}
		return str.replace(/[^\x00-\xff]/g, "01").length;
	};

	// 按单字节长度截取字符
	var subCharString = function(str, len) {
		if (!str || !len) {
			return '';
		}
		// 预期计数：中文2字节，英文1字节
		var a = 0;
		// 循环计数
		var i = 0;
		// 临时字串
		var temp = '';
		for (i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 255) {
				// 按照预期计数增加2
				a += 2;
			} else {
				a++;
			}
			// 如果增加计数后长度大于限定长度，就直接返回临时字符串
			if (a > len) {
				return temp;
			}
			// 将当前内容加到临时字符串
			temp += str.charAt(i);
		}
		// 如果全部是单字节字符，就直接返回源字符串
		return str;
	};

	// 得到最后发送消息的时间（XX分钟前、XX小时前或X月Y日）
	var getDate = function(str) {
		if (str == "Now") {
			return "刚刚";
		}
		if (str == "Yest") {
			return "昨天";
		}
		if (str.substr(str.length - 3, 3) == "min") {
			return str.replace("min", "分钟前").replace(" ", "");
		}
		if (str.substr(str.length - 3, 3) == "hrs") {
			return str.replace("hrs", "小时前").replace(" ", "");
		}
		var m = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SPT", "OCT", "NOV", "DEC");
		for (var i = 0; i < m.length; i++) {
			if (str.substr(str.length - 3, 3) == m[i]) {
				var result = (i + 1) + "月";
				for (var j = 0; j < str.length; j++) {
					if (str.substr(j, 1) == " ") {
						break;
					}
					result += str.substr(j, 1);
				}
				return result + "日";
			}
		}
		return str;
	};
	
	
	var loadData = function(dataComp,newData,getRowCallback) {
		var oldDataCount = dataComp.getCount();
		if(oldDataCount === 0){
			var rows = [];
			for(var index = 0;index < newData.length ;index++){
				var row = getRowCallback.call(this,newData[index]);
				rows.push(row);
			}
			dataComp.loadData({
				rows : rows
			});
			return;
		}else if(newData.length === 0){
			return;
		}
		
		for(var index = 0;index < newData.length ;index++){
			var item = newData[index];
			var rows = dataComp.find([ "fID" ], [item.peer.peer.id]);
			if(rows.length > 0){
				var currentIndex = dataComp.getRowIndex(rows[0]);
				if(currentIndex != index){
					dataComp.moveRowTo((dataComp.datas.get())[currentIndex],(dataComp.datas.get())[index]);
				}
				getRowCallback.call(this,item,(dataComp.datas.get())[index]);
			}else{
				var row = getRowCallback.call(this,item);
				dataComp.loadData([row], true,null,index);
			}
		}
		for(var removeIndex = newData.length -1;removeIndex < dataComp.getCount(); removeIndex ++){
			dataComp.datas.splice(newData.length);
		}
	};
	
	return {
		loadData: loadData,
		getDate: getDate,
		subCharString: subCharString,
		getCharLength: getCharLength,
		getLatestChat: getLatestChat
	};
});