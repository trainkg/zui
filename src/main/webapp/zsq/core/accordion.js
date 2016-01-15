/*
 * according layout
 * see http://www.jeasyui.com/documentation/index.php#accordion
 */
define(['./context','backbone','underscore','jqaccordion','css!./css/accordion'],function(ZSQ,Backbone,_,tpl){

	var DEFAULTS = {
		template:null,
		fit:true,
		animate:true,
		//[view,null,view2]
		views:null		//ZSQ views | array
	};
	var Accordion = Backbone.View.extend({
		_accordion:null,
		initialize:function(props){
			this.context = _.extend({},DEFAULTS,props)
		},
		render:function(){
			this.$el.append(this.context.template);
			this._accordion = $('> :first',this.$el).accordion(this.context);
			this.renderSubViews();
		},
		renderSubViews:function(){
			var that = this;
			_.each(this.context.views,function(view,index){
				if(view){
					var panelby = that.exec('getPanel',index).panel('body');
					view.setElement(panelby).render();
				}
			});
		},
		exec:function(){
			return this._accordion.accordion.apply(this._accordion,arguments);
		}
	});
	
	return Accordion;
});