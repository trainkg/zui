/*
 * 导航菜单 
 * 核心采用jquery easy ui 相应的插件制作
 * see http://www.jeasyui.com/documentation/index.php#
 */
define(['backbone','underscore','css!./css/menu.css','jquery.menu'],function(Backbone,_,ftl){
	var defaults = {
		template:null	//通过模板解析整个MENU
		,itemHeight:25
		,fit:true
		,inline:true
	}
	var Menu = Backbone.View.extend({
		_menu:null,
		initialize:function(config){
			var context = _.extend({},defaults,config);
			this.context = context;
			this._template = _.template(this.context.template);
		},
		render:function(){
			this.$el.html(this._template(this.context));
			this.$el.show();//plugin need exec size.
			this._menu = $('> :first',this.$el).menu(this.context);
			this.$el.hide();
		},
		hide:function(){
			this._menu.hide();
		},
		show:function(){
			this._menu.show();
		},
		exec:function(){
			return this._menu.menu.apply(this._menu,arguments);
		}
	});
	return Menu;
});