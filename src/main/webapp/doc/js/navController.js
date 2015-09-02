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
			})
		}
 	});
 	return navController;
})