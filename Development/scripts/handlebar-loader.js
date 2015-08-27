;(function($, window, document, undefined) {
	var handlebarloader = function(el,options){
		var $el = $(el);
		var plugin = this;
		var settings = $.extend({
        	data: "data.json",
        	template: "#template",
		    onEnd: function(){}
    	}, options || {});	  
    	var data = {};
    	
    	/*************
	    INIT
	    *************/
    	this.init = function(){
	    	jsonReady(settings.data);
    	}
    	
    	/*************
	    DATA READY
	    *************/
    	function jsonReady(data){
	    	var source   = $(settings.template).html();
	    	var template = Handlebars.compile(source);
			var html = template(data);
			$el.html(html);
			
			settings.onEnd.call($el, $el.children(), data);
    	}
	}
    
    /******************
	CREATE EACH PLUGIN
	*******************/
	$.fn.handlebarloader = function(options){
		return this.each(function(){
			var $el = $(this);
			var plugin = new handlebarloader(this, options);
			plugin.init();
		});
	}
    
})(jQuery, window, document);

