/*
 * 按钮组,在设计上将按钮组和菜单导航分开,按钮组只是打开Menu导航的一种方式
 * 注意：MENU的onhide和onshow没有开放
 */
define(['backbone','underscore','text!./template/menuButton.html'],function(Backbone,_,tpl){
	
	var defaults = {
		//menuButton template
		template:null,
		id:"zsq_menu_button",
		buttonCls:'btn-xs',
		mouseoverToggle:false,
		//JSON id|name*|cls|fn|
		/*
		 * NAME		button name
		 * cls		button class name
		 * fn 		button action | function or href
		 * menu		button menu view
		 * hasMenu	this button has menu, when menu has set,it will not be must define.
		 * split	this button is split TURE|FALSE DEFAULT false
		 * icon     icon class
		 */
		buttons:null
	}
	
	var MenuButton = Backbone.View.extend({
		_template:_.template(tpl),
		initialize:function(config){
			this.context = _.extend({},defaults,config);
			//this buttons is active.
			this.context.active = true;
			this.wapperMenu();
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
		//不存在重新渲染情况
		render:function(){
			this.$el.html(this._template(this.context));
			this.renderMenu();
		},
		dropdownMenuToggleAtActive:function(e){
			if(this.context.mouseoverToggle && this.context.active && MenuButton.globalActive && $(e.currentTarget).siblings('.dropdown-menu').is(':hidden')){
				this.dropdownMenuToggle(e);
			}
		},
		wapperMenu:function(menu){
			var that = this;
			if(menu){
				that._wapperMenu(menu);
			}else{
			_.each(that.context.buttons,function(button,index){
				menu = button.menu;
				if(menu){
					that._wapperMenu(menu);
				}
			})
			}
		},
		_wapperMenu:function(menu){
			menu.afterClick = function(){
				that.context.active = $('.dropdown-menu:visible',that.$el).size() != 0;
			}
		},
		dropdownMenuToggle:function(e){
			MenuButton.globalActive = true;
			var current = $(e.currentTarget).siblings('.dropdown-menu');
			var isShow = $(current).is(':visible');
			var index = $(e.currentTarget).data('index');
			if(isShow){
				this.context.buttons[index].menu.hide();
			}else{
				this.context.buttons[index].menu.show();
			}
			$('.dropdown-menu',this.$el).not(current).hide();
			
			this.context.active = $('.dropdown-menu:visible',this.$el).size() != 0;
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
			var that = this;
			_.each(this.context.buttons,function(btn,index){
				if(btn.menu){
					var content = $('.btn-action:eq('+index+')',that.$el).siblings('.dropdown-menu');
					btn.menu.setElement(content).render();
				}
			});
		},
		//销毁相关兑现
		distroy:function(){
			_.each(this.context.buttons,function(btn,index){
				if(btn.menu){
					btn.menu.exec('destroy');
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