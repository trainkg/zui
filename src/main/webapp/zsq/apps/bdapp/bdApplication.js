/**
 * BORDER 布局application
 * 使用规范列表: 
 * 1.页面内容区 id为zsq-bd-app(不存在则没有头部)
 * 2.头部导航  id为zsq-app-top
 * 	 头部导航之导航按钮组id为zsq-app-top-nav(如果不存在则无按钮组导航)
 * 3.左侧导航  id为zsq-app-left(不存在则没有左侧导航)
 * 4.右侧导航  id为zsq-app-right(不存在则没有右侧导航)
 * 5.底部导航  id为zsq-app-buttom(不存在则没有底部)
 * 6.中间内容区选项卡模板 id为zsq-app-center
 */
define([
         'backbone',
         'underscore',
         'core/layout',
         'core/panel',
         'app/content',
         'core/accordion',
         'core/context'
     ],function(Backbone,_,Layout,Panel,Accordion,ZSQ){
	var controller  = Backbone.Router.extend({
		initialize:function(){
			this.initComponent();
		},
		/*
		 * 初始化页面组件 
		 */
		initComponent:function(footer){
			var config = {el:'#zsq-bd-app'};
			var panel =  new Layout(config);
			panel.render();
			var topNav = new TopNav();
			panel.addBorderComponent('north',topNav);
			panel.addBorderComponent('center',new Content());
			var acConfig = {template:actemplate};
			var ac = new Accordion(acConfig);
			var p3 = new Panel({title:'导航栏',cls:'panel-info',usePanel:true,view:ac});
			panel.addBorderComponent('west',p3);
			panel.addBorderComponent('east',new Panel({title:'我的附导航',cls:'panel-info'}));
			panel.addBorderComponent('south',new Panel({template:footer}));
		}
	});
	
	var Application = new controller();
	Backbone.history.start();
	return Application;
});