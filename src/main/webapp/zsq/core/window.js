/*
 * 采用JQUERY EASYUI WINDOW 核心制作
 * see http://www.jeasyui.com/documentation/index.php#window
 */
define(['./context','backbone','underscore','css!./css/window','jqwindow'],function(ZSQ,Backbone,_){
	
	var DEFAULTS = {
		template:null,
		width:600,
	    height:400,
	    modal:true,
	    //inline:true,
	    shadow:true,
	    collapsible:false,
	    minimizable:false,
	    maximizable:false
	};
	
	var Z_Window = Backbone.View.extend({
		//_template:_.template(tpl),
		initialize:function(config){
			this.context = _.extend({id:"zsq-win-"+Z_Window._id++},DEFAULTS,config);
			if(!(this.context.$el && config.el)){
				$('body').append('<div id="'+this.context.id+'"></div>');
				this.$el = $('#'+this.context.id,$('body'));
			};
		},
		render:function(){
			if(!this._window){
				var content = this.$el;
				if(this._template){
					content.html(this._template(this.context));
					this.contentDom = content.children(':first');
					this._window = this.contentDom.window();
				}else{
					this.contentDom = content;
					this._window = this.contentDom.window(this.context); 
				}
			}else{
				this._window.window('open');
			}
		},
		exec:function(){
			return this._window.window.apply(this._window,arguments);
		}
	},{_id:1});
	return Z_Window;
});