;(function($, window, document, undefined) {
	var pageswitcher = function(el,options){
		var $el = $(el);
		var plugin = this;
		var settings = $.extend({
        	nav: $('.nav'),
        	pages: $('.pages'),
        	current: 0,
        	navattr: 'path',
        	pageid: 'section',
        	selected: 'selected',
        	ta: $('.ta'),
		    onChange: function(){}
    	}, options || {});	  
    	var data = {};
    	
    	/*************
	    INIT
	    *************/
    	this.init = function(){
	    	changeTo(settings.current);
	    	settings.nav.click(function (){
		    	var t = $(this);
		    	var n = Number( t.attr(settings.navattr) );
				if ( n!=settings.current ) changeTo(n);
	    	});
	    	
	    	settings.ta.click(function(){
		    	var t = $(this);
		    	var n = Number( t.attr(settings.navattr) );
				if ( n!=settings.current ) changeTo(n);
	    	});
    	}

		/*************
	    CHANGE TO
	    *************/
		function changeTo(n){
			settings.pages.hide();
			settings.nav.eq(settings.current).removeClass(settings.selected);
			
			settings.current = n;
			if( settings.current >= 0 ) settings.nav.eq(settings.current).addClass(settings.selected);
			
			var p = settings.pages.eq(settings.current);
			p.find('.animate').hide();
			
			p.fadeIn(500,function(){
				settings.onChange.call($el,p);
				
				p.find('.animate').each(function(){
					var t = $(this);
					var obj = {};
					
					var o = t.attr('options');
					o = o.split(',');
					
					for (var i in o) {
						var d = o[i].split(":");
						obj[ d[0] ] = d[1];
					}
					
					t.show();
					if ( t.attr('type')=="from" ){
						TweenMax.from(t, Number(t.attr('speed')), obj);
					} else if ( t.attr('type')=="to" ){
						TweenMax.to(t, Number(t.attr('speed')), obj);
					} else if ( t.attr('type')=="staggerFrom" ){
						var arr = [];
						t.children().each(function(){
							var e = $(this);
							arr.push(e);
						});
						TweenMax.staggerFrom(arr, Number(t.attr('speed')), obj, Number(t.attr('stagger')));
					}
				});
			});
		}
	}
    
    /******************
	CREATE EACH PLUGIN
	*******************/
	$.fn.pageswitcher = function(options){
		return this.each(function(){
			var $el = $(this);
			var plugin = new pageswitcher(this, options);
			plugin.init();
		});
	}
    
})(jQuery, window, document);

