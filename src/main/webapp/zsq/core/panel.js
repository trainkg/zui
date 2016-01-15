//面板,设定响应的布局~,只支持border 其他布局方案采用css,减少javascript压力
//see http://www.jeasyui.com/documentation/index.php#
define(['./context','jquery','backbone','underscore','jqpanel'],function(ZSQ,$,Backbone,_) {
	var DEFAULTS = {
		template:null,				//panel-parse-temlate
		fit:true,
		border:true,
		view:null,					//sub view
		usePanel:true,				//jq panel
		cls:'panel-default',		//bt
		headerCls:'panel-heading', 	//bootstrap3
		/*
		 * {
			template:null,   string | function
			contentSelect:null,
		    }
		 */
		decorate:null
		
	};
	var Panel = Backbone.View.extend({
		initialize:function(props){
			var view = this;
			this.context = _.extend({},DEFAULTS,props);
			var _t =  this.context.template;
			if(_t){
				this._template = _.template(_t);
			}
		    //resize
		    $(document).on('zsq.border.resize',function(e){
			   if(view._panel) view._panel.panel('resize');
		    })
		},
		render:function(){
			var dc = this.renderDecorate();
			var content = this.content = dc?dc:this.$el;
			if(this.context.usePanel){
				if(this._template){
					content.html(this._template(this.context));
					this._panel = content.children(':first').panel();
				}else{
					content.append($('<div></div>'));
					var _panel = this._panel = $('> div:first',content);
					_panel.panel(this.context); 
				}
				//bootstrap css
				this.content = this._panel.panel('body');
				this.content.css('border-color',this._panel.panel('header').css('border-color'));
			}
			if(this.context.view) this.addCompnent(this.context.view);
		},
		renderDecorate:function(){
			var dcorate = this.context.decorate;
			if(dcorate){
				var dctemplate = dcorate.template;
				var cSelect	   = dcorate.contentSelect;
				if(!(dctemplate && cSelect)){
					ZSQ.log('decorate info is not correct');
				}
				if(_.isString(dctemplate)){
					this.$el.append(dctemplate);
				}else if(_.isFunction(dctemplate)){
					this.$el.append(dctemplate.call(this));
				}
				return $(cSelect,this.$el);
			}
		},
		exec:function(){
			return this._panel.panel.apply(this._panel,arguments);
		},
		addCompnent:function(view){
			this.context.view = view;
			console.log(this.content);
			view.setElement(this.content).render();
		}
	})
	return Panel;
});

