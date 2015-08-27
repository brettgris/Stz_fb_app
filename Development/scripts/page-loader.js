;(function($, window, document, undefined) {
	var pageloader = function(el,options){
		var $el = $(el);
		var plugin = this;
		var settings = $.extend({
        	data: {},
        	template: "#template",
        	pathattr: "path",
		    onEnd: function(){}
    	}, options || {});	  
    	var data = {};
    	
    	/*************
	    INIT
	    *************/
    	this.init = function(){
	    	var source   = $(settings.template).html();
			var template = Handlebars.compile(source);
			var html = template(settings.data);
			$el.html(html);
			
			var l = $el.children().length - 1;
			$el.children().each(function(i){
				var t = $(this);
				var html = t.load( t.attr(settings.pathattr), function(){
					t.attr(settings.pathattr, '');
					
					if (l==i) settings.onEnd.call($el, $el.children());
				});
			});
    	}
	}
    
    /******************
	CREATE EACH PLUGIN
	*******************/
	$.fn.pageloader = function(options){
		return this.each(function(){
			var $el = $(this);
			var plugin = new pageloader(this, options);
			plugin.init();
		});
	}
    
})(jQuery, window, document);

