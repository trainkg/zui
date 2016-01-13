//面板,设定响应的布局~,只支持border 其他布局方案采用css,减少javascript压力
//建议应用最外层使用border布局,内部无特殊需求不使用
define(['jquery','backbone','underscore'],function($,Backbone,_) {
	var panelTemplate = '<div class="panel <%=panelCls%>">'+
		  '<div class="panel-heading"><%=title%></div>'+
		  '<div class="panel-body">'+
		  '</div>'+
		  '</div>';
	var DEFAULTS = {
		panelCls:'success',
		title:'我的面板'
	};
	var Panel = Backbone.View.extend({
		template:_.template(panelTemplate),
		initialize:function(props){
			this.context = _.extend({},DEFAULTS,props);
		},
		render:function(){
			this.$el.html(this.template(this.context));
		}
	})
	return Panel;
});

