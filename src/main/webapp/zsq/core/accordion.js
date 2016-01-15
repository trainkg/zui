/*
 * according layout
 * see http://www.jeasyui.com/documentation/index.php#accordion
 */
define(['./context','backbone','underscore','jqaccordion'],function(ZSQ,Backbone,_,tpl){

	var DEFAULTS = {
		template:null,
		fit:true,
		animate:true
	};
	var Accordion = Backbone.View.extend({
		_accordion:null,
		initialize:function(props){
			this.context = _.extend({},DEFAULTS,props)
		},
		render:function(){
			this.$el.append(this.context.template);
			$('> :first',this.$el).accordion(this.context);
		}
	});
	
	return Accordion;
});