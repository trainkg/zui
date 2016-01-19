/*
 * dialog
 */
define(['./context','backbone','underscore','./window','./panel','./menuButton','./menu'
        ,'text!app/ftl/tmenu.html','css!./css/dialog'],function(ZSQ, Backbone,_,Window,Panel,Menubutton,Menu,template){
	
	var $temples = $(template);
	var defaults = {
		menubutton:{
			buttonCls:'btn-xs',
			buttons:[{
				name:'测试一号BUTTON',
				cls:'btn-primary',
				menu:new Menu({
					template:$('#mm',$temples)[0].outerHTML,
					onClick:function(item){
						
					}
				})
			},
			{
				name:'测试二号BUTTON',
				menu:new Menu({
					template:$('#mm1',$temples)[0].outerHTML
				})
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
					that._resize(width,height);
					if(config.onResize){
						config.onResize.call(that._window, width, height);	
					}
				}
			}
			Window.prototype.initialize.call(this,_.extend(nomodify,defaults,config));
			this.context.mbConfig = _.extend({},defaults.menubutton,config.menubutton)
			//hasMenu
			if(this.context.mbConfig){
				this.menubutton = new Menubutton(this.context.mbConfig);
			}
		},
		render:function(){
			Window.prototype.render.apply(this,arguments);
			//dialog-toolbar
			if(this.menubutton){
				var $header = this.exec('header');
				$header.after('<div class="dialog-toolbar"></div>');
				var $tools = $('.dialog-toolbar',this.exec('window'));
				var $body =  this.exec('body');
				this.menubutton.setElement($tools).render();
				this._resize();
			}
		},
		//panel resize hander
		_resize:function(width,height){
			if(this.menubutton && this._window){
				var $header = this.exec('header');
				var $tools = $('.dialog-toolbar',this.exec('window'));
				var $body =  this.exec('body');
				console.log($body._outerHeight());
				$body._outerHeight($body._outerHeight() - $tools._outerHeight());
				console.log($body._outerHeight());
			}
		}
	});
	ZSQ.dialog = Dialog;
	return Dialog;
});