/**
 * jquery 面板插件 
 */
!function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery','backbone','text!./template/panel.html','underscore'], factory);
  } else {
    factory(root.jQuery);
  }
}(window, function($,Backbone,tpl,_) {
  'use strict';
 
  var defaults = {
	  title:null,
	  width:null,
	  height:null,
	  panelCls:'panel-default'
  };
 
  var process = function(element, options) {
    this.element = element;
    this.options = options;
  };

  process.DEFAULT = defaults;
 
  process.prototype = {
    constructor: process,
    init: function() {},
    complete:function(){}
  }
 
  function Plugin(options) {
    var property = options;
    var options = $.extend(true, {}, defaults, options);
    
    return this.each(function() {
      var $this = $(this);
      var data = process.prototype;

      if (typeof property == 'string' && $.isFunction(data[property])) {
         data[property].apply($this.data('zsq.panel'));
      } else {
         data = new process($this, options);
         $this.data('zsq.panel',data)
         data.init();
      }
    });
  };
 
  /*JQUERY PLUGIN*/
  var old = $.fn.panel;

  $.fn.panel = Plugin;
  $.fn.panel.Constructor = process;

	// LOOKUP NO CONFLICT
	// =================
	
	$.fn.panel.noConflict = function () {
	    $.fn.panel = old
	    return this
	}
    
    
   /*------BACKBONE-----*/
   var panel = Backbone.View.extend({
	   _template:_.template(tpl),
	   initialize:function(config){
		   this.context = _.extend({},defaults,config);
	   },
	   render:function(){
		   this.$el.html(this._template(this.context));
		   this.renderPanel();
	   },
	   getContent:function(){
		 return this.$el.find('.panel-body');  
	   },
	   /**
	    * 开放子类实现
	    */
	   renderPanel:function(){}
   });
    
   return panel;
});
 
