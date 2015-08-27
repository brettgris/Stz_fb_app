var FacebookTab = FacebookTab || {};

(function ($, FacebookTab) {
	/***************
	MENU
	****************/
	FacebookTab.Controller = (function(){
		var to;
		
		/***************
		INIT
		****************/
		function init(){
			$('.nav').handlebarloader({
				data: Pages,
				template: '#nav-item',
				onEnd: loadPages
			});
			
			$('.share').click( sharewithfacebook );
			$('.invite').click( inviteFriends );
			$('.tweet').click( tweettotwitter );
		}
		
		/***************
		LOAD PAGES
		****************/
		function loadPages(navitems, data){
			$('.content').pageloader({
				data: data,
				template: '#section-item',
				pathattr: 'path',
				onEnd: function(pages){
					setupNavigation(navitems, pages);
					setupCast();
				}
			});
		}
		
		/***************
		SET UP NAVIGATION
		****************/
		function setupNavigation(navitems, pages){
			$('.content').pageswitcher({
				nav: navitems.find('a'),
				navattr: 'path', 
				pages: pages,
				pageid: 'section',
				ta: $('.showta'),
				current: 0
			});
		}
		
		/***************
		SET UP CAST
		****************/
		function setupCast(){
			$('.Cast').handlebarloader({
				data: Cast,
				template: '#cast-template',
				onEnd: function(){
					$('.Cast').presskitSlideShow({
						thumbs:'.cast-thumb',
						items:'.cast-bio',
						next: '.next-btn',
						prev: '.prev-btn',
						speed: .5,
						selected: 'selected',
						directional: true
					});
				}
			});
		}
		
		/***************
		SHARE
		****************/
		function sharewithfacebook(){
			FB.ui({
				method:"share",
				name:"Blunt Talk",
				href:"https://www.facebook.com/BluntTalk.Starz",
				picture:"http://www.starz.com/sc/features/outlander/facebook/affiliates/generic/img/ols_fb_128x128.jpg",
				caption:"Blunt Talk premieres Aug 22 only on STARZ",
				message:'Blunt Talk premieres Aug 22 only on STARZ.'
			})
		}
		
		/***************
		INVITE
		****************/
		function inviteFriends(){
			FB.ui({
				method:"apprequests",
				message:"Blunt Talk premieres Aug 22 only on STARZ."
			})
		}
		
		/***************
		TWITTER
		****************/
		function tweettotwitter(){
			var loc = "http://www.starz.com/orginals/blunttalk";
			var desc = "Blunt Talk premieres Aug 22 only on STARZ.";
			window.open('http://twitter.com/share?url=' + loc + '&text=' + desc + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 100) +', left='+($(window).width()/2) +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
		}	
				
		/***************
		Public
		****************/
		return {
			init:init
		}
	})();
})(jQuery,FacebookTab);