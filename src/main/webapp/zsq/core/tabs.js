''/*
 * 选项卡插件
 */
define(['backbone','underscore','tabs','panel','css!./css/panel','css!./css/linkbutton','css!./css/tabs'],function(Backbone,_,Navtab){
	
	var DEFAULTS = {
		welcome:undefined //welcome page html
	   ,fullSize:true 	  //是否填充满父标签
	   ,template:null	  //模板
	}
	
	var Tabs = Backbone.View.extend({
		initialize:function(options){
		   var view = this;
		   this.context = _.extend({},DEFAULTS,options);
		   this._template = _.template(this.context.template);
		   
		   //resize
		   $(document).on('zsq.border.resize',function(e){
			   view.internTab.tabs('resize');
		   })
		},
		render:function(){
			this.$el.html(this._template(this.context));
			this.$el.append('<div></div>')
			this.internTab = $('> div:first',this.$el).tabs({
				fit:true,
				tools:[{
					iconCls:'icon-add',
					handler:function(){
						alert('add')
					}
				},{
					iconCls:'icon-save',
					handler:function(){
						alert('save')
					}
				}],
				height: "auto"
			});
			window.a = this.internTab;
		},
		exec:function(name){
			arguments.shift()
			var fn = this.internTab[name];
			return fn.apply(this.internTab,arguments);
		},
		/*
		 * 在指定的坐标中,添加VIEW
		 */
		addComponent:function(index,view){
		}
	});
	
	return Tabs;
});