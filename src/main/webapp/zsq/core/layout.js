//面板,设定响应的布局~,只支持border 其他布局方案采用css,减少javascript压力
//建议应用最外层使用border布局,内部无特殊需求不使用
//使用警告： 布局插件CSS如果自定义的话，原则 参与计算的对象和内容块 不能有边框,不能有滚动条
//see http://jqueryui.com/resizable/
define(['jquery','backbone','underscore',
        'text!./template/layout.html',
        'plugins/jlayout/jquery.sizes',
        'plugins/jlayout/jlayout.border',
        'plugins/jlayout/jquery.jlayout',
        'jquery-ui.min'
        ,'css!../css/jquery-ui.min'
 ],function($,Backbone,_,ftl) {
	
  var defaults = {
		resize : false,
		glbResize:true,
		type : 'border', // border | flow | flexgrid | grid
		vgap : 4,		 
		hgap : 4,	
		showNorth:true,
		showWest:true,
		showEast:true,
		showSouth:true,
		northHt:50,
		westWt:250,
		southHt:25,
		eastWt:250,
		//border
		resizable:{
			south:{
				resize:false
			},
			north:{
				resize:false
			},
			west:{
				resize:true,
				minWidth:150
			},
			east:{
				resize:true,
				minWidth:150
			}
		},
		resizeConfig:null, 	//JSON
		resizeWin:true		//support change window size
  };
    
   /*------BACKBONE-----*/
   var Layout = Backbone.View.extend({
	   $template:$(ftl),
	   initialize:function(config){
		   this.context = _.extend({},defaults,config);
		   if(config.resizable){
			   this.context.resizable.south = _.extend({},defaults.resizable.south,config.resizable.south);
			   this.context.resizable.north = _.extend({},defaults.resizable.north,config.resizable.north);
			   this.context.resizable.west = _.extend({},defaults.resizable.west,config.resizable.west);
			   this.context.resizable.east = _.extend({},defaults.resizable.east,config.resizable.east);
		   }
	   },
	   render:function(){
		   switch(this.context.type){
		   	  case 'border'  : this.borderLayout();	 break;
		   	  case 'flow'	 : this.flowLayout();  	 break;
		   	  case 'flexgrid': this.flexgridLayout();break;
		   	  case 'grid'    : this.gridLayout();	 break;
		   }
		   this.layout();
		   this.initPlugins();
		   this.$el.find('.center .m-layout-panel:last').append('<div style="width:100%;height:100%;overflow:auto">我是用来测试的</div>')
	   },
	   initPlugins:function(){
		   //window resize
		   var view = this,layout = this.context;
		   if(this.context.resizeWin){
			  var resizeTimer = null;
			  $(window).on('resize', function () {
		           if (resizeTimer) {clearTimeout(resizeTimer)}
		           resizeTimer = setTimeout(function(){
		        	   $(document).trigger('zsq.border.resize',new Date().getTime());
		           }, 150);
			   })
		   }
		   
		   if(this.context.type === 'border'){
			   $(document).on('zsq.border.resize',function(e,time){
				   var lastTime = view.$el.data('size-last');
				   if(lastTime != time){
					   view.$el.data('size-last',time);
					   view.layout();
				   }
				   e.preventDefault();
			   })
		   }
		   
		   //panel resize
		   var defConfig = {stop: function(){view.layout();view.$el.trigger('zsq.border.resize',new Date().getTime());}};
		   if(this.context.type === 'border' && this.context.glbResize){
			   if(layout.resizable.south.resize){
				   var config = _.extend(layout.resizable.south,{handles: 'n',helper:'ui-resizable-helper-south'},defConfig);
				   $('.south',this.$el).resizableR(config); 
			   }
			   if(layout.resizable.north.resize){
				   var config = _.extend(layout.resizable.north,{handles: 's',helper:'ui-resizable-helper-north'},defConfig);
				   $('.north',this.$el).resizableR(config); 
			   }
			   if(layout.resizable.east.resize){
				   var config = _.extend(layout.resizable.east,{handles: 'w',helper:'ui-resizable-helper-east'},defConfig);
				   $('.east',this.$el).resizableR(config); 
			   }
			   if(layout.resizable.west.resize){
				   var config = _.extend(layout.resizable.west,{handles: 'e',helper:'ui-resizable-helper-west'},defConfig);
				   $('.west',this.$el).resizableR(config); 
			   }
		   }
	   },
	   borderLayout:function(){
		   this.$el.append(this.$template.find('.m-border-layout').children().clone());
		   this.$el.find('.west:first').css('width',this.context.westWt+'px');
		   this.$el.find('.north:first').css('height',this.context.northHt+'px');
		   this.$el.find('.east:first').css('width',this.context.eastWt+'px');
		   this.$el.find('.south:first').css('height',this.context.southHt+'px');
		   if(!this.context.showNorth){this.$el.find('.north:first').css('display','none')}
		   if(!this.context.showEast) {this.$el.find('.east:first').css('display','none')}
		   if(!this.context.showSouth){this.$el.find('.south:first').css('display','none')}
		   if(!this.context.showWest) {this.$el.find('.west:first').css('display','none')}
	   },
	   flowLayout:function(){},
	   flexgridLayout:function(){},
	   gridLayout:function(){},
	   layout:function(e){
		   this.$el.layout(this.context);
	   },
	   addBorderComponent:function(place,component){
		   var target = null;
		   switch(place){
		   	  case 'west'  	: target = this.$el.children('.west');	 break;
		   	  case 'south'	: target = this.$el.children('.south');  break;
		   	  case 'north'	: target = this.$el.children('.north');  break;
		   	  case 'east'   : target = this.$el.children('.east');	 break;
		   	  case 'center' : target = this.$el.children('.center'); break;
		   }
		   component.setElement(target.find('.m-layout-panel:first')).render();
	   }
   });
    
   return Layout;
});
