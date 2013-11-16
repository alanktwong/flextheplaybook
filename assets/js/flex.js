/**
 * This is a controller that uses pub/sub plugin to use a single page
 * to trigger chains of events.
 */
var FlexController = FlexController || {};
FlexController = (function (FlexController, $, _) {

	var _navbar = {
		$root : $('#site-navbar'),
		$items : $('#navigationItems'),
		deactivate : function() {
			var self = _navbar;
			var $navItems = $('.navItem',self.$items);
			$navItems.each(function(i,el) {
				var $el = $(this);
				if ($el.hasClass('active')) {
					$el.removeClass('active');
				}
			});
			return $navItems;
		}
	};
	
	var _carousel = {
		$root : $('#homePageCarousel'),
		show : function() {
			if (_carousel.$root.hasClass('hidden')) {
				_carousel.$root.removeClass('hidden');
			}
		},
		hide : function() {
			if (_carousel.$root.hasClass('hidden') !== true) {
				_carousel.$root.addClass('hidden');
			}
		}
	};
	
	var _homePage = {
		$elements : $('.homePage'),
		show : function() {
			_homePage.$elements.each(function(i,el){
				var $el = $(this);
				if ($el.hasClass('hidden')) {
					$(this).removeClass('hidden');
				}
			});
		},
		hide : function() {
			_homePage.$elements.each(function(i,el){
				var $el = $(this);
				if ($el.hasClass('hidden') !== true) {
					$(this).addClass('hidden');
				}
			});
		}
	};
	
	var _book = {
		$root : $('#book_details'),
		show : function() {
			if (_book.$root.hasClass('hidden')) {
				_book.$root.removeClass('hidden');
			}
			_homePage.hide();
			_navbar.deactivate();
			_author.hideJane();
			_author.hideAudrey();
			$('#book-nav-item').addClass('active');
		},
		hide : function() {
			if (_book.$root.hasClass('hidden') !== true) {
				_book.$root.addClass('hidden');
			}
		}
	};
	var _author = {
		$jane : $('#jane_bio'),
		$audrey : $('#audrey_bio'),
		showAudrey : function() {
			var self = _author;
			if (self.$audrey.hasClass('hidden')) {
				self.$audrey.removeClass('hidden');
			}
			_homePage.hide();
			_book.hide();
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
			if (self.$jane.hasClass('hidden')) {
				self.$jane.removeClass('hidden');
			}
			_homePage.hide();
			_book.hide();
			self.hideAudrey();
		},
		hideJane : function() {
			var self = _author;
			if (self.$jane.hasClass('hidden') !== true) {
				self.$jane.addClass('hidden');
			}
		}
	};
	
	var _assessment = {
		show : function() {
			
		},
		hide : function() {
			
		}
	};
	var _events = {
		show : function() {
			
		},
		hide : function() {
			
		}
	};
	var _blogs = {
		show : function() {
			
		},
		hide : function() {
			
		}
	};
	var _privacy = {
		show : function() {
			
		},
		hide : function() {
			
		}
	};
	var _terms = {
		show : function() {
			
		},
		hide : function() {
			
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
		bindEvents : function() {
			$.subscribe("/book/show", _book.show);
			$('.showBook').click(function(evt){
				$.publish("/book/show");
			});
			$.subscribe("/jane/show", _author.showJane);
			$('.showJane').click(function(evt){
				$.publish("/jane/show");
			});
			$.subscribe("/audrey/show", _author.showAudrey);
			$('.showAudrey').click(function(evt){
				$.publish("/audrey/show");
			});
			$.subscribe("/assessment/show", _assessment.show);
			$('.showAssessment').click(function(evt){
				$.publish("/assessment/show");
			});
			$.subscribe("/privacy/show", _privacy.show);
			$('.showPrivacy').click(function(evt){
				$.publish("/privacy/show");
			});
			$.subscribe("/terms/show", _terms.show);
			$('.showTerms').click(function(evt){
				$.publish("/terms/show");
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

