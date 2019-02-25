(function ($, window, document, undefined) {
    'use strict';
    $( "#datepicker" ).datepicker({dateFormat: "yy-mm-dd"});
    $( ".gender" ).checkboxradio();
    /*=================================*/
    /* PRELOAD */
    /*=================================*/
    $(window).on('load', function () {
        if ($('.preloader-text').length) {
            $('.preloader-text').fadeOut(500);
        }
    });
    /*=================================*/
    /* MOBILE MENU */
    /*=================================*/
    $('.mob-nav').on('click', function (e) {
        e.preventDefault();
        $('html').addClass('no-scroll sidebar-open').height(window.innerHeight + 'px');
        if ($('#wpadminbar').length) {
            $('.sidebar-open #topmenu').css('top', '46px');
        } else {
            $('.sidebar-open #topmenu').css('top', '0');
        }
    });
    $('.mob-nav-close').on('click', function (e) {
        e.preventDefault();
        $('html').removeClass('no-scroll sidebar-open').height('auto');
    });

    function fixedMobileMenu() {
        var headerHeight = $('.header_top_bg').not('.header_trans-fixed').outerHeight();
        var offsetTop;
        var dataTop = 1025;
        var adminbarHeight = $('#wpadminbar').outerHeight();
        if ($('#wpadminbar').length) {
            offsetTop = adminbarHeight + headerHeight;
            $('.header_top_bg').css('margin-top', adminbarHeight);
        } else {
            offsetTop = headerHeight;
        }
        if ($(window).width() < dataTop) {
            $('.main-wrapper').css('padding-top', offsetTop + 'px');
        } else {
            $('.main-wrapper').css('padding-top', '0');
        }
        if ($('#wpadminbar').length && $(window).width() < 768) {
            $('#wpadminbar').css({
                'position': 'fixed',
                'top': '0'
            })
        }
    }

    function menuArrows() {
        var mobW = 1025;
        if (($(window).width() < mobW)) {
            if (!$('.menu-item-has-children i').length) {
                $('header .menu-item-has-children').append('<i class="fa fa-angle-down"></i>');
                $('header .menu-item-has-children i').addClass('hide-drop');
            }
            
            $('header .menu-item i').on('click', function () {
                
                if ($(this).parent().hasClass('menu-item-has-children') && !$(this).hasClass('animation')) {
                    $(this).addClass('animation');
                    if ($(this).hasClass('hide-drop')) {
                        if ($(this).closest('.sub-menu').length) {
                            $(this).removeClass('hide-drop').prev('.sub-menu').slideToggle(400);
                        } else {
                            $('.menu-item-has-children i').addClass('hide-drop').next('.sub-menu').hide(100);
                            $(this).removeClass('hide-drop').prev('.sub-menu').slideToggle(400);
                        }
                    } else {
                        $(this).addClass('hide-drop').prev('.sub-menu').hide(100).find('.menu-item-has-children a').addClass('hide-drop').prev('.sub-menu').hide(100);
                    }
                }
                setTimeout(removeClass, 400);

                function removeClass() {
                    $('header .menu-item i').removeClass('animation');
                }
            });
        } else {
            $('header .menu-item-has-children i').remove();
        }
    }

    function calcPaddingMainWrapper() {
        var footer = $('#footer');
        var paddValue = footer.outerHeight();
        footer.bind('heightChange', function () {
            $('.main-wrapper').css('padding-bottom', paddValue);
        });

        footer.trigger('heightChange');
    }

    $(window).on('load resize', function () {
        fixedMobileMenu();
        calcPaddingMainWrapper();
        menuArrows();
    });
    window.addEventListener("orientationchange", function () {
        fixedMobileMenu();
        calcPaddingMainWrapper();
        menuArrows();
    });

})(jQuery, window, document);