jQuery(document).ready(function () {

    // Instantiate Fastclick for better mobile performance
    FastClick.attach(document.body);

    // Instantiate Meanmenu for mobile navigation
    $(".flexnav").flexNav({ hoverIntent: true, hoverIntentTimeout: 50, calcItemWidths: false });

    // Instantiate secondary content navigation and setup classes.
    // Inserts before #cta
    /*$(".navigable").scrollNav({ insertTarget: "#cta",
                                sections: "h3",
                                subSections: "h4",
                                showHeadline: false });*/

    // And setup fixed sidebar on scroll
    // Using this method to fix nav instead of the built in way so we can fix
    // the call to action in the sidebar, as well.

    // Set sidebar height to same height as content area (article)

    /*$('.sidebar-container').height( $('article').height() )
    var length = $('.sidebar-container').height() - $('.sidebar').height() + $('.sidebar-container').offset().top;*/

    // Consider refactoring this into classes and adding to css files.

    /*$(window).scroll(function () {

        var scroll = $(this).scrollTop();
        var height = $('.sidebar').height() + 'px';

        if (scroll < $('.sidebar-container').offset().top) {
            $('.sidebar').css({
                'position': 'absolute',
                'top': '0'
            });

        } else if (scroll > length) {
            $('.sidebar').css({
                'position': 'absolute',
                'bottom': '0',
                'top': 'auto'
            });

        } else {
            $('.sidebar').css({
                'position': 'fixed',
                'top': '0',
                'height': height,
                'width': $('.sidebar-container').width()
            });
        }
    });*/
});
