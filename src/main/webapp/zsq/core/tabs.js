/*
 * 选项卡插件
 */
define(['backbone','underscore','core/bjui-navtab','text!./template/nav-tab-content.html'],function(Backbone,_,Navtab,template){
	
	var DEFAULTS = {
		welcome:undefined //welcome page html
	   ,fullSize:true 	  //是否填充满父标签
	}
	
	var Tabs = Backbone.View.extend({
		_template:_.template(template),
		initialize:function(options){
		   this.context = _.extend({},DEFAULTS,options);
		},
		render:function(){
			this.$el.html(this._template(this.context));
			this.$el.navtab();
		},
		/*
		 * 在指定的坐标中,添加VIEW
		 */
		addComponent:function(index,view){
		},
		autoParser:function(){
		    $(document).on('click.bjui.navtab.data-api', '[data-toggle="navtab"]', function(e) {
		        var $this   = $(this), href = $this.attr('href'), data = $this.data(), options = data.options
		        if (options) {
		            if (typeof options == 'string') options = options.toObj()
		            if (typeof options == 'object')
		                $.extend(data, options)
		        }
		        if (!data.title) data.title = $this.text()
		        if(!data.id){data.id = data.title}
		        if (href && !data.url) data.url = href
		        $this.navtab(data)
		        e.preventDefault()
		    })
		}
	});
	
	return Tabs;
});