/*定义导航处理方案*/
define(['backbone','jquery'],function(Backbone,$){
 	var navController = Backbone.Router.extend({
 		routes : {
 			'':'index',//首页设定
 			'nav/:path': 'gotoNav'
		},
		initialize:function(){
		},
		index:function(){
			this.gotoNav('doc');
		},
		gotoNav:function(path){
			path = 'text!../doc/sidebar/'+path+'.html'
			require([path],function(side){
				$('.west #z-side').html(side);
				//动画
				$('.west .panel-group').addClass('animated fadeIn')
				//支持选项卡标签的自定义样式
				$(".west .menu-items a").attr('data-toggle','navtab')
			})
		}
 	});
 	return navController;
})