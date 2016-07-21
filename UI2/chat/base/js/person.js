define(function(require) {
	//var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	
	/*
	 * {
	 * name:显示名称
	 * nick:别名
	 * phones:[]电话
	 * about:关于
	 * avatar:头像
	 * smallAvatar:小头像
	 * id:人员id
	 * uid:actor系统id
	 * }
	 */
	var Person = justep.Object.extend({
		constructor: function(props) {
			if(props){
				this.name = props.name;
				this.nick = props.nick;
				this.phones = props.phones;
				this.about = props.about;
				this.avatar = props.avatar;
				this.smallAvatar = props.smallAvatar||props.avatar;
				this.id = props.id;
				this.uid = props.uid;
			}
		}
	});
	
	return Person;
});