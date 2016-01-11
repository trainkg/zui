//按钮组,在设计上将按钮组和菜单导航分开,按钮组只是打开Menu导航的一种方式
define(['backbone','underscore','text!./template/menuButton.html'],function(Backbone,_,tpl){
	
	var defaults = {
		id:"zsq_menu_button",
		//JSON id|name*|cls|fn|
		/*
		 * NAME		button name
		 * cls		button class name
		 * fn 		button action | function or href
		 * menu		button menu view
		 * hasMenu	this button has menu, when menu has set,it will not be must define.
		 * split	this button is split TURE|FALSE DEFAULT false
		 */
		buttons:null
	}
	
	var MenuButton = Backbone.View.extend({
		_template:_.template(tpl),
		initialize:function(config){
			this.context = _.extend({},defaults,config);
			this.context.active = true;
		},
		events:{
			'click.zsq.menubtn .dropdown-toggle':'dropdownMenuToggle'
			,'click.zsq.menubtn .btn-action':'btnAction'
			,'mouseover.zsq.menubt .dropdown-toggle':'dropdownMenuToggleAtActive'
			,'click.zsq.api':'stop'
		},
		stop:function(e){
			e.stopPropagation();
		},
		render:function(){
			this.$el.html(this._template(this.context));
			this.renderMenu();
		},
		dropdownMenuToggleAtActive:function(e){
			if(this.context.active && MenuButton.globalActive && $(e.currentTarget).siblings('.dropdown-menu').is(':hidden')){
				this.dropdownMenuToggle(e);
			}
		},
		dropdownMenuToggle:function(e){
			MenuButton.globalActive = true;
			var current = $(e.currentTarget).siblings('.dropdown-menu');
			current.toggle();
			this.context.active = $(current).is(':visible');
			$(document).find('.dropdown-menu').not(current).hide();
		},
		btnAction:function(e){
			var index = $(e.currentTarget).data('index');
			var fcn = this.context.buttons[index].fn;
			if(fcn && _.isFunction(fcn)){
				fcn.call(this,e);
			}
		},
		//support dynamic define the button action.
		addAction:function(index,fcn){
			this.context.buttons[index].fn = fcn;
		},
		renderMenu:function(){
			_.each(this.context.buttons,function(btn,index){
				if(btn.menu){
					var content = $('.btn-action:eq('+index+')',this.$el).siblings('.dropdown-menu');
					btn.menu.setElement(content).render();
				}
			});
		}
	},{
		globalActive:false
	});
	
	
	$(document).on('click.zsq.menubtn',function(){
		$(document).find('.dropdown-menu').hide();
		MenuButton.globalActive = false;
	})
	
	return MenuButton;
});