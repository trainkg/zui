/**
 * 导航菜单
 */
define(['backbone','underscore','jquery.menu'],function(Backbone,_){
	var defaults = {
		template:null	//通过模板解析整个MENU
	}
	
	var Menu = Bakbone.View.extend({
		initialize:function(config){
			var context = _.extend({},defaults,config);
			
			this.context = context;
		},
		render:function(){
			this.$el.html(this._template(this.context));
		}
	});
});