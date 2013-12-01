/*   
 * Template Name: Unify - Responsive Bootstrap Template
 * Description: Business, Corporate, Portfolio and Blog Theme.
 * Version: 1.3
 * Author: Html Stream
 * Website: http://htmlstream.com/preview/unify
*/
var App = function ($,_) {

    var _data = {
        site: {
            sitePage: "www.flextheplaybook.com",
            description: "the art of switching leadership styles to more effectively work with people who are different from you",
            keywords: "flex,playbook,cultural diversity,management,leadership,global,cultural fluency,diversity",
            author: "Audrey S. Lee and Jane Hyun",
            about: "This is the website for the book, <i>Flex: the New Playbook for Managing Across Differences</i>.",
            email : "flex.the.playbook@gmail.com"
        },
        copyright : {
            date: "2013",
            description: "2013 &copy; Audrey S. Lee &amp; Jane Hyun ALL Rights Reserved"
        },
        book: {
            title: "Flex: the Playbook for Managing Across Differences",
            sitePage: "www.flextheplaybook.com/flex.html",
            isbn10: "0062248529",
            isbn13: "978-0062248527",
            asin: "B00BATKYXI",
            printLength: "336 pages",
            publisher: "HarperBusiness",
            publishDate: "March 18, 2014",
            distributionChannels: {
                amazon: "http://www.amazon.com/Flex-Playbook-Managing-Across-Differences-ebook/dp/B00BATKYXI",
                barnesNoble: "http://www.barnesandnoble.com/w/flex-jane-hyun/1114591076"
            }
        },
        authors: {
            jane: {
                name: "Jane Hyun",
                sitePage: "www.flextheplaybook.com/meet_jane_hyun.html",
                linkedIn: "http:///www.linkedin.com/pub/jane-hyun/2/116/628/",
                twitter: "http://twitter.com/JaneHyun"
            },
            audrey : {
                name: "Audrey S. Lee",
                sitePage: "www.flextheplaybook.com/meet_audrey_lee.html",
                linkedIn: "http://www.linkedin.com/in/audreyslee",
                twitter: "http://twitter.com/Audrey_S_Lee"
            }
        }
    };
    
    function handleIEFixes() {
        //fix html5 placeholder attribute for ie7 & ie8
        if ($.browser.msie && $.browser.version.substr(0, 1) < 9) { // ie7&ie8
            $('input[placeholder], textarea[placeholder]').each(function () {
                var input = $(this);

                $(input).val(input.attr('placeholder'));

                $(input).focus(function () {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

                $(input).blur(function () {
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    }

    function handleBootstrap() {
        $('.carousel').carousel({
            interval: 15000,
            pause: 'hover'
        });
        $('.tooltips').tooltip();
        $('.popovers').popover();
    }

    function handleSearch() {    
        $('.search').click(function () {
            if($('.search-btn').hasClass('icon-search')){
                $('.search-open').fadeIn(500);
                $('.search-btn').removeClass('icon-search');
                $('.search-btn').addClass('icon-remove');
            } else {
                $('.search-open').fadeOut(500);
                $('.search-btn').addClass('icon-search');
                $('.search-btn').removeClass('icon-remove');
            }   
        }); 
    }

    function handleSwitcher() {    
        var panel = $('.style-switcher');

        $('.style-switcher-btn').click(function () {
            $('.style-switcher').show();
        });

        $('.theme-close').click(function () {
            $('.style-switcher').hide();
        });
        
        $('li', panel).click(function () {
            var color = jQuery(this).attr("data-style");
            var data_header = jQuery(this).attr("data-header");
            setColor(color, data_header);
            $('.list-unstyled li', panel).removeClass("theme-active");
            $(this).addClass("theme-active");
        });

        var setColor = function (color, data_header) {
            $('#style_color').attr("href", "assets/css/themes/" + color + ".css");
            if(data_header == 'light'){
                $('#style_color-header-1').attr("href", "assets/css/themes/headers/header1-" + color + ".css");
                $('#logo-header').attr("src", "assets/img/logo1-" + color + ".png");
                $('#logo-footer').attr("src", "assets/img/logo2-" + color + ".png");
            } else if(data_header == 'dark'){
                $('#style_color-header-2').attr("href", "assets/css/themes/headers/header2-" + color + ".css");
                $('#logo-header').attr("src", "assets/img/logo1-" + color + ".png");
                $('#logo-footer').attr("src", "assets/img/logo2-" + color + ".png");
            } else if(data_header == 'book') {
                $('#style_color-header-1').attr("href", "assets/css/themes/headers/header1-" + color + ".css");
                $('#logo-header').addClass('color-red');
            }
        }
    }

    function handleBoxed() {
        $('.boxed-layout-btn').click(function(){
            $(this).addClass("active-switcher-btn");
            $(".wide-layout-btn").removeClass("active-switcher-btn");
            $("body").addClass("boxed-layout container");
        });
        $('.wide-layout-btn').click(function(){
            $(this).addClass("active-switcher-btn");
            $(".boxed-layout-btn").removeClass("active-switcher-btn");
            $("body").removeClass("boxed-layout container");
        });
    }

    return {
        data: _data,
        init: function () {
            handleBootstrap();
            handleIEFixes();
            handleSearch();
            handleSwitcher();
            handleBoxed();
            $('#book_theme', '.style-switcher').click();
        },

        initSliders: function () {
            $('#clients-flexslider').flexslider({
                animation: "slide",
                easing: "swing",
                animationLoop: true,
                itemWidth: 1,
                itemMargin: 1,
                minItems: 2,
                maxItems: 9,
                controlNav: false,
                directionNav: false,
                move: 2
            });
            
            $('#clients-flexslider1').flexslider({
                animation: "slide",
                easing: "swing",
                animationLoop: true,
                itemWidth: 1,
                itemMargin: 1,
                minItems: 2,
                maxItems: 5,
                controlNav: false,
                directionNav: false,
                move: 2
            });
            
            $('#photo-flexslider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                itemWidth: 80,
                itemMargin: 0
            }); 
            
            $('#testimonal_carousel').collapse({
                toggle: false
            });
        },

        initFancybox: function () {
            $(".fancybox-button").fancybox({
                groupAttr: 'data-rel',
                prevEffect: 'none',
                nextEffect: 'none',
                closeBtn: true,
                helpers: {
                    title: {
                        type: 'inside'
                    }
                }
            });
        },

        initBxSlider: function () {
            $('.bxslider').bxSlider({
                minSlides: 4,
                maxSlides: 4,
                slideWidth: 360,
                slideMargin: 10
            });

            $('.bxslider1').bxSlider({
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 360,
                slideMargin: 10,
            });

            $('.bxslider2').bxSlider({
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 360,
                slideMargin: 10
            });
        },
    };

}(jQuery,_);