/*
 * 选项卡插件
 * see http://www.jeasyui.com/documentation/index.php#
 */
define(['backbone','underscore','jqtabs','jqpanel','css!./css/panel','css!./css/linkbutton','css!./css/tabs'],function(Backbone,_,Navtab){
	
	var DEFAULTS = {
		welcome:undefined //welcome page html
	   ,fullSize:true 	  //是否填充满父标签
	   ,template:null	  //模板
	   ,fit:true
	   ,height:'auto'
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
			this.internTab = $('> div:first',this.$el).tabs(this.context);
		},
		exec:function(){
			return this.internTab.tabs.apply(this.internTab,arguments);
		},
		/*
		 * 在指定的坐标中,添加VIEW
		 */
		addComponent:function(index,view){
		},
		removePanel:function(){
			var tab = this.internTab.tabs('getSelected');
	        if (tab){
	            var index = this.internTab.tabs('getTabIndex', tab);
	            this.internTab.tabs('close', index);
	        }
		},
		addComponent:function(props,view){
			this.exec('add',props);
			var panel = this.internTab.tabs('getTab',props.title);
			if(view){view.setElement(panel.panel('body')).render();}
		}
	},{
		index:1
	});
	
	return Tabs;
});