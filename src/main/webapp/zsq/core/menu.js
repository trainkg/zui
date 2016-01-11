/*
 * 导航菜单 
 * 核心采用jquery easy ui 相应的插件制作
 */
define(['backbone','underscore','css!./css/menu.css','jquery.menu'],function(Backbone,_,ftl){
	var defaults = {
		template:null	//通过模板解析整个MENU
		,itemHeight:30
		,fit:true
		,inline:true
	}
	var Menu = Backbone.View.extend({
		initialize:function(config){
			var context = _.extend({},defaults,config);
			this.context = context;
			this._template = _.template(this.context.template);
		},
		render:function(){
			this.$el.html(this._template(this.context));
			this.$el.show();//plugin need exec size.
			$('> :first',this.$el).menu(this.context);
			this.$el.hide();
		}
	});
	return Menu;
});