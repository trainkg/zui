/*
 * 定义公共的window, 模态框
 * 
 * 
 * 模态框的动画采用CSS3定制
 */
define(['./context','backbone','underscore','text!./template/window.html'],function(ZSQ,Backbone,_,tpl){
	
	var defaults = {
		id:'zsq_window',
		zIndex: 9000,					
		draggable: true,				
		resizable: true,				
		//shadow: true,
		//modal: false,						
		inline: false,						//不能拖动超出上层容器
		title:null,
		width       : 800,
        height      : 450,
        minW        : 500,
        minH        : 300,
		// window's property which difference from panel
		collapsible: false,					//暂不支持
		maxminable:true,
		closable:true,
		closed: false,
		events:{
			onMax	:'zsq.maxWin',
			onMin	:'zsq.minMin',
			onColl	:'zsq.collapWin',
			onClose	:'zsq.closeWin',
			onOpen	:'zsq.openWindow',
			onSize  :'zsq.sizeChange'
		},
		/**
		 * [{id:1,cls:'ss',name:cc,action:function(){...}}]
		 */
		buttons:[],
		animate:{
			show:null,			//定制显示动画  function(window) || string
			close:null		    //定制消失动画  function(window) || string (目前不支持支持string,css3没有回调)
		}
	};
	
	var ZSQ_Window = Backbone.View.extend({
		_template:_.template(tpl),
		initialize:function(config){
			this.context = _.extend({max:false,id:"zsq-win-"+ZSQ_Window._id},defaults,config);
			this.context.animate = _.extend([],defaults.animate,config.animate);
			if(!(this.context.$el && config.el)){
				$('body').append('<div id="'+this.context.id+'"></div>');
				this.$el = $('#'+this.context.id,$('body'));
			};
			this.initButtons();
			this.renderState = false;
		},
		events:{
			'click .close':		'close',
			'click .min':		'min',
			'click .max':		'maxminToggle',
			'click .action-btn':'btnAtion'
		},
		render:function(){
			this.$el.html(this._template(this.context));
			this.show();
			this.$el.trigger(this.context.events.onOpen);
			this._initPosition();
			this.initPlugins();
			this.addComponent();
			this.renderState = true;
		},
		_getModel:function(){
			return this.$el.find('.modal');
		},
		_getContent:function(){
			return this.$el.find('.modal .modal-content');
		},
		show:function(){
			if(_.isFunction(this.context.animate.show)){
				this.context.animate.show.call(this);
			}else{
				this._getModel().show();
			}
		},
		close:function(){
			var closeConfig = this.context.animate.close;
			if(_.isFunction(closeConfig)){
				closeConfig.call(this);
			}
			this._getModel().hide();
			this.$el.trigger(this.context.events.onClose,this);
		},
		initButtons:function(){
			if(this.context.closable){
				var closeBtn = {name:'关闭',action:function(){
					this.close();
				}};
				this.context.buttons.push(closeBtn);
			}
		},
		/**
		 * action
		 */
		btnAtion:function(event){
			var bname = $(event.target).data('spi');
			var btn = _.findWhere(this.context.buttons,{name:bname});
			btn.action.call(this);
		},
		initPlugins:function(){
			this._initResize();
			this._initDragger();
		},
		_initResize:function(){
			var view = this;
			if(this.context.resizable){
			   require(['jquery.resizable'],function(){
				   view._getContent().resizable({
					   minWidth:view.context.minW,
					   minHeight:view.context.minH,
					   onResize:function(e){
						   e.stopPropagation();
						   view._evalBodySize();
					   }
				   }); 
			   });
			}
		},
		_initDragger:function(){
			var view = this;
			if(this.context.draggable){
			   require(['jquery.draggable'],function(){
				   view.$el.find('.u-action').on('mousedown.zsq.win',function(e){
					   e.stopPropagation()
				   })
				   view._getContent().draggable({
					   handle:'.modal-header'
				   }); 
			   });
			}
		},
		_initPosition: function() {
			var $dialog = this._getContent();
            var width  = this.context.width > this.context.minW ? this.context.width : this.context.minW;
            var height = this.context.height > this.context.minH ? this.context.height : this.context.minH;
            var wW     = $(window).width(),
                wH     = $(window).height(),
                iTop   = this.context.max ? 0 : ((wH - height) / 2)
            
            if (width > wW)  width  = wW
            if (height > wH) height = wH
            
            var fheight = $('> .modal-footer', $dialog).outerHeight(),
            	hheight = $('> .modal-header', $dialog).outerHeight();
            $dialog
                .css('height',height+'px')
                .css('width',width+'px')
                .css({left:(wW - width) / 2, top:0, opacity:0.1})
                .animate({top:iTop > 0 ? iTop : 0, opacity:1})
                .find('> .modal-body').css('height',height - fheight -hheight+'px')
             
        },
        _evalBodySize:function(){
        	var $dialog = this._getContent();
        	var height  = $dialog.outerHeight();
        		fheight = $('> .modal-footer', $dialog).outerHeight(),
        		hheight = $('> .modal-header', $dialog).outerHeight();
        	$dialog.find('> .modal-body').css('height',height - fheight -hheight+'px')
        	this.$el.trigger(this.context.events.onSize,this);
        },
        /*
         * 最大化最小化切换
         */
        maxminToggle:function(){
        	var $dialog = this._getContent();
        	 if(this.context.max){
        		 this._restore($dialog);
        	 }else{
        		 this._maxSize($dialog);
        	 }
        },
        _restore:function($dialog){
        	var original = $dialog.data('original')
            var dwidth   = parseInt(original.width)
            var dheight  = parseInt(original.height)
            
            $dialog.css({
                top: original.top,
                left: original.left,
                width: dwidth,
                height: dheight
            })
            this._evalBodySize()
            $dialog.find('> .modal-header > .maximize').show()
            $dialog.find('> .modal-header > .restore').hide()
            this.context.max = false;
        },
        _maxSize:function($dialog){
        	
       	 	$dialog.data('original', {
                top: $dialog.css('top'),
                left: $dialog.css('left'),
                width: $dialog.css('width'),
                height: $dialog.css('height')
            })
            
            this.context.max = true;
       	 
            $dialog.find('> .modal-header > .maximize').hide()
            $dialog.find('> .modal-header > .restore').show()
            
            var iContentW = $(window).width()
            var iContentH = $(window).height()
            
            $dialog.css({ top:0, left:0, width:iContentW, height:iContentH })
            this._evalBodySize()
        },
        /**
         * 子类覆盖~, 添加window子元素
         */
        addComponent:function(){}
	},{_id:1});
	
	return ZSQ_Window;
});