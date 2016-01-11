//面板,设定响应的布局~,只支持border 其他布局方案采用css,减少javascript压力
//建议应用最外层使用border布局,内部无特殊需求不使用
define(['jquery','backbone','underscore',
        'text!./template/layout.html',
        'plugins/jlayout/jquery.sizes',
        'plugins/jlayout/jlayout.border',
        //'plugins/jlayout/jlayout.flexgrid',
        //'plugins/jlayout/jlayout.flow',
        //'plugins/jlayout/jlayout.grid',
        'plugins/jlayout/jquery.jlayout',
        'jquery-ui.min'
        //'jquery.resizable'
        //,'css!./css/layout'
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
		southHt:50,
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
				resize:true
			},
			east:{
				resize:true
			}
		},
		resizeConfig:null, 	//JSON
		resizeWin:true		//support change window size
  };
    
   /*------BACKBONE-----*/
   var panel = Backbone.View.extend({
	   $template:$(ftl),
	   initialize:function(config){
		   this.context = _.extend({},defaults,config);
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
	   },
	   initPlugins:function(){
		   //window resize
		   var view = this,layout = this.context;
		   if(this.context.resizeWin){
			   $(window).resize(function(){
				   view.layout();
			   });
		   }
		   
		   $(document).on('zsq.border.resize',function(){
			   view.layout();
		   })
		   
		   //panel resize
		   var defConfig = {stop: function(){view.layout();view.$el.trigger('zsq.border.resize');}};
		   if(this.context.type === 'border' && this.context.glbResize){
			   if(layout.resizable.south.resize){
				   var config = _.extend(layout.resizable.south,{handles: 'n',helper:'ui-resizable-helper-south'},defConfig);
				   $('.south',this.$el).resizable(config); 
			   }
			   if(layout.resizable.north.resize){
				   var config = _.extend(layout.resizable.north,{handles: 's',helper:'ui-resizable-helper-north'},defConfig);
				   $('.north',this.$el).resizable(config); 
			   }
			   if(layout.resizable.east.resize){
				   var config = _.extend(layout.resizable.east,{handles: 'w',helper:'ui-resizable-helper-east'},defConfig);
				   $('.east',this.$el).resizable(config); 
			   }
			   if(layout.resizable.west.resize){
				   var config = _.extend(layout.resizable.west,{handles: 'e',helper:'ui-resizable-helper-west'},defConfig);
				   $('.west',this.$el).resizable(config); 
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
		   component.setElement(target.find(' .m-layout-panel:first')).render();
	   }
   });
    
   return panel;
});

