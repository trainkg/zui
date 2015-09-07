/**
 * 响应式dialog和模板引擎结合实例
 */
define(['backbone','underscore','text!./tpl/t-1.html'],function(Backbone,_,temp){
	
	var t = {
		_temp:_.template(temp),
		initialize:function(config){
			this.config = _.extend(config);
			this.render();
		},
		render:function(){
			this.$el.html(this._temp(this.config));
		}
	}
	return Backbone.View.extend(t);
})