/*dialog*/
define(['./context','backbone','underscore','./window','./panel','./menuButton'
        ],function(ZSQ, Backbone,_,Window,Menubutton){
	var defaults = {
	};
	var Dialog = Window.extend({
		menubutton:null
		/*,
		_template:_.template(tpl)
		,initialize:function(config){
			this.context = _.extend({},defaults,config);
		}*/
	});
	ZSQ.dialog = Dialog;
	return Dialog;
});