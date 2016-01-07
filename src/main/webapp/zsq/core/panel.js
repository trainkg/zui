/**
 * 面板,设定响应的布局~
 */
define(['jquery','backbone','underscore',
        'text!./template/layout.html',
        'plugins/jlayout/jquery.sizes',
        'plugins/jlayout/jlayout.border',
        'plugins/jlayout/jlayout.flexgrid',
        'plugins/jlayout/jlayout.flow',
        'plugins/jlayout/jlayout.grid',
        'plugins/jlayout/jquery.jlayout',
        'css!./css/layout'
 ],function($,Backbone,_,ftl) {
	
  var defaults = {
	  layout:{
		resize : false,
		type : 'border', //布局方案   border | flow | flexgrid | grid
		vgap : 6,		 //垂直间距
		hgap : 6		 //水平间距
	  } 	//面板内容布局方案
  };
    
   /*------BACKBONE-----*/
   var panel = Backbone.View.extend({
	   $template:$(ftl),
	   initialize:function(config){
		   this.context = _.extend({},defaults,config);
	   },
	   render:function(){
		   switch(this.context.layout.type){
		   	  case 'border'  : this.borderLayout();	 break;
		   	  case 'flow'	 : this.flowLayout();  	 break;
		   	  case 'flexgrid': this.flexgridLayout();break;
		   	  case 'grid'    : this.gridLayout();	 break;
		   }
		   this.$el.layout(this.context.layout);
	   },
	   borderLayout:function(){
		   this.$el.append(this.$template.find('.m-border-layout').children());
	   },
	   flowLayout:function(){},
	   flexgridLayout:function(){},
	   gridLayout:function(){}
   });
    
   return panel;
});

