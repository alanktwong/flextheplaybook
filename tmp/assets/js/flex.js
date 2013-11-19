/**
 * This is a controller that uses pub/sub plugin to use a single page
 * to trigger chains of events.
 */
var FlexController = FlexController || {};
FlexController = (function (FlexController, $, _) {

	var _navbar = {
		id : "navbar",
		$root : $('#site-navbar'),
		$items : $('#navigationItems'),
		deactivate : function() {
			var self = _navbar;
			var $navItems = $('.navItem',self.$items);
			$navItems.each(function(i,el) {
				var $el = $(this);
				if ($el.hasClass('active') === true) {
					$el.removeClass('active');
				}
			});
			return $navItems;
		}
	};
	
	var _carousel = {
		id : "carousel",
		$root : $('#homePageCarousel'),
		show : function() {
			var self = _carousel;
			if (self.$root.hasClass('hidden') === true) {
				self.$root.removeClass('hidden');
			}
		},
		hide : function() {
			if (self.$root.hasClass('hidden') !== true) {
				self.$root.addClass('hidden');
			}
		}
	};
	
	var _homePage = {
		id : "homePage",
		$elements : $('.homePage'),
		show : function() {
			var self = _homePage;
			self.$elements.each(function(i,el){
				var $el = $(this);
				if ($el.hasClass('hidden') === true) {
					$(this).removeClass('hidden');
				}
			});
		},
		hide : function() {
			var self = _homePage;
			self.$elements.each(function(i,el){
				var $el = $(this);
				if ($el.hasClass('hidden') !== true) {
					$(this).addClass('hidden');
				}
			});
		}
	};
	
	var _hideOthers = function(keep) {
		var all = [_homePage, _book, _author, _assessment, _events, _blogs, _privacy, _terms];
		var others = _.filter(all, function(each) {
			var result = false;
			if (each.id && keep.id) {
				result = (each.id !== keep.id);
			}
			return result;
		});
		_.each(others, function(element, index, list) {
			if (element.hide) {
				element.hide();
			}
		});
	};
	
	var _book = {
		id : "book",
		$root : $('#book_details'),
		show : function() {
			var self = _book;
			_hideOthers(self);
			if (self.$root.hasClass('hidden') === true) {
				self.$root.removeClass('hidden');
			}
			_navbar.deactivate();
			$('#book-nav-item').addClass('active');
		},
		hide : function() {
			var self = _book;
			if (self.$root.hasClass('hidden') !== true) {
				self.$root.addClass('hidden');
			}
		}
	};
	var _author = {
		id : "author",
		$jane : $('#jane_bio'),
		$audrey : $('#audrey_bio'),
		showAudrey : function() {
			var self = _author;
			_hideOthers(self);
			if (self.$audrey.hasClass('hidden') === true) {
				self.$audrey.removeClass('hidden');
			}
			self.hideJane();
		},
		hideAudrey : function() {
			var self = _author;
			if (self.$audrey.hasClass('hidden') !== true) {
				self.$audrey.addClass('hidden');
			}
		},
		showJane : function() {
			var self = _author;
			_hideOthers(self);
			if (self.$jane.hasClass('hidden') === true) {
				self.$jane.removeClass('hidden');
			}
			self.hideAudrey();
		},
		hideJane : function() {
			var self = _author;
			if (self.$jane.hasClass('hidden') !== true) {
				self.$jane.addClass('hidden');
			}
		},
		hide : function() {
			var self = _author;
			self.hideAudrey();
			self.hideJane();
		}
	};
	
	var _assessment = {
		id : "assessment",
		$root : $('#assessment_lp'),
		show : function() {
			var self = _assessment;
			if (self.$root.hasClass('hidden') === true) {
				self.$root.removeClass('hidden');
			}
			_hideOthers(self);
		},
		hide : function() {
			var self = _assessment;
			if (self.$root.hasClass('hidden') !== true) {
				self.$root.addClass('hidden');
			}
		}
	};
	var _events = {
		id : "events",
		$root : $('#events_lp'),
		show : function() {
			var self = _events;
			_hideOthers(self);
			if (self.$root.hasClass('hidden') === true) {
				self.$root.removeClass('hidden');
			}
		},
		hide : function() {
			var self = _events;
			if (self.$root.hasClass('hidden') !== true) {
				self.$root.addClass('hidden');
			}
		}
	};
	var _blogs = {
		id : "blogs",
		$root : $('#blog_lp'),
		show : function() {
			var self = _blogs;
			_hideOthers(self);
			if (self.$root.hasClass('hidden') === true) {
				self.$root.removeClass('hidden');
			}
		},
		hide : function() {
			var self = _blogs;
			if (self.$root.hasClass('hidden') !== true) {
				self.$root.addClass('hidden');
			}
		}
	};
	var _privacy = {
		id : "privacy",
		$root : $('#privacy_lp'),
		show : function() {
			var self = _privacy;
			_hideOthers(self);
			if (self.$root.hasClass('hidden') === true) {
				self.$root.removeClass('hidden');
			}
		},
		hide : function() {
			var self = _privacy;
			if (self.$root.hasClass('hidden') !== true) {
				self.$root.addClass('hidden');
			}
		}
	};
	var _terms = {
		id : "terms",
		$root : $('#terms_lp'),
		show : function() {
			var self = _terms;
			_hideOthers(self);
			if (self.$root.hasClass('hidden') === true) {
				self.$root.removeClass('hidden');
			}
		},
		hide : function() {
			var self = _terms;
			if (self.$root.hasClass('hidden') !== true) {
				self.$root.addClass('hidden');
			}
		}
	};
	
	
	var _initializer = {
		configureLog4jq : function() {
			var self = _initializer;
			self.logger = $.configureLog4jq({
				enabled: true,
				level : "debug",
				targets : [
					{
						name: "console",
						enabled: true
					}
				]
			});
		},
		callbacks : {
			progress : function( n ) {
				var msg = (n.isSynchronous() ? "sync" : "async") + " progress: " + n.publishTopic() + " -> " + n.currentTopic();
				$.info(msg);
			},
			done : function( n ) {
				var msg = (n.isSynchronous() ? "sync" : "async") + " done: " + n.publishTopic() + " -> " + n.currentTopic();
				$.info(msg);
			},
			fail : function( n ) {
				var msg = (n.isSynchronous() ? "sync" : "async") + " fail: " + n.publishTopic() + " -> " + n.currentTopic();
				$.error(msg);
			},
			always : function( n ) {
				var msg = (n.isSynchronous() ? "sync" : "async") + " always: " + n.publishTopic() + " -> " + n.currentTopic();
				$.info(msg);
			}
		},
		bindEvents : function() {
			$.subscribe("/book/show", _book.show);
			$('.showBook').click(function(evt){
				$.publish("/book/show", _initializer.callbacks);
			});
			
			$.subscribe("/jane/show", _author.showJane);
			$('.showJane').click(function(evt){
				$.publish("/jane/show", _initializer.callbacks);
			});
			
			$.subscribe("/audrey/show", _author.showAudrey);
			$('.showAudrey').click(function(evt){
				$.publish("/audrey/show", _initializer.callbacks);
			});
			
			$.subscribe("/assessment/show", _assessment.show);
			$('.showAssessment').click(function(evt){
				$.publish("/assessment/show", _initializer.callbacks);
			});
			
			$.subscribe("/events/show", _events.show);
			$('.showEvents').click(function(evt){
				$.publish("/events/show", _initializer.callbacks);
			});
			
			$.subscribe("/blog/show", _blogs.show);
			$('.showBlog').click(function(evt){
				$.publish("/blog/show", _initializer.callbacks);
			});
			
			$.subscribe("/privacy/show", _privacy.show);
			$('.showPrivacy').click(function(evt){
				$.publish("/privacy/show", _initializer.callbacks);
			});
			
			$.subscribe("/terms/show", _terms.show);
			$('.showTerms').click(function(evt){
				$.publish("/terms/show", _initializer.callbacks);
			});
		},
		init : function() {
			var self = _initializer;
			self.configureLog4jq();
			self.bindEvents();
		}
	};
	var _overridenController = $.extend(FlexController, {
		init : _initializer.init
	});
	return _overridenController;
	
}(FlexController, jQuery, _));

$(document).ready (function() {
	FlexController.init();
});

