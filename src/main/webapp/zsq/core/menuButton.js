//按钮组,在设计上将按钮组和菜单导航分开,按钮组只是打开Menu导航的一种方式
define(['backbone','underscore','text!./template/menuButton.html'],function(Backbone,_,tpl){
	
	var defaults = {
		id:'zsq_button_menu',
		//JSON id|name*|cls|fn|
		/*
		 * ID: 		id
		 * NAME		button name
		 * cls		button class name
		 * fn 		button action | function or href
		 * menu		button menu view
		 * hasMenu	this button has menu, when menu has set,it will not be must define.
		 * split	this button is split TURE|FALSE DEFAULT false
		 */
		buttons:[{
			id:'1',
			name:'测试一号BUTTON',
			hasMenu:true
		},
		{
			id:'2',
			name:'测试二号BUTTON',
			hasMenu:true,
			split:true
		}]
	}
	
	var MenuButton = Backbone.View.extend({
		_template:_.template(tpl),
		initialize:function(config){
			this.context = _.extend({},defaults,config);
		},
		events:{
			'click.zsq.menubtn .dropdown-toggle':'dropdownMenuToggle',
			'click.zsq.menubtn .btn':'btnAction'
		},
		render:function(){
			this.$el.html(this._template(this.context));
		},
		dropdownMenuToggle:function(e){
			var current = $(e.target).siblings('.dropdown-menu');
			current.toggle();
			$(document).find('.dropdown-menu').not(current).hide();
		},
		btnAction:function(e){
		}
	});
	
	return MenuButton;
});