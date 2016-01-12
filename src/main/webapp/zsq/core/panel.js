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
   var panel = Backbone.View.extend({});
    
   return panel;
});

