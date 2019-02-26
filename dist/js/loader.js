(function ($, window, document, undefined) {
    'use strict';

    /*=================================*/
    /* PRELOAD */
    /*=================================*/
    $(window).on('load', function () {
        if ($('.preloader-text').length) {
            $('.preloader-text').fadeOut(500);
        }
    });

})(jQuery, window, document);