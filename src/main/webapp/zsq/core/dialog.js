/*
 * dialog
 */
define(['./context','backbone','underscore','./window','./panel','./menuButton','./menu'
        ,'text!app/ftl/tmenu.html'],function(ZSQ, Backbone,_,Window,Panel,Menubutton,Menu,template){
	
	var $temples = $(template);
	var defaults = {
		menubutton:{
			buttons:[{
				name:'测试一号BUTTON',
				menu:new Menu({
					template:$('#mm',$temples)[0].outerHTML,
					onClick:function(item){
						
					}
				})
				,split:true
			},
			{
				name:'测试二号BUTTON',
				menu:new Menu({
					template:$('#mm1',$temples)[0].outerHTML
				})
				,split:true
			}]
		}
	};
	var Dialog = Window.extend({
		menubutton:null
		/*_template:_.template(tpl)*/
		,initialize:function(config){
			var that = this;
			//[].shift.apply(arguments)
			var nomodify = {
				onResize:function(width, height){
					config.onResize.call(that._window, width, height);
				}
			}
			Window.prototype.initialize.call(this,_.extend(nomodify,defaults,config));
			this.context.mbConfig = _.extend({},defaults.menubutton,config.menubutton)
			this.menubutton = new Menubutton(this.context.mbConfig);
		},
		render:function(){
			Window.prototype.render.apply(this,arguments);
		}
	});
	ZSQ.dialog = Dialog;
	return Dialog;
});