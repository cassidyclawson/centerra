jQuery(document).ready(function () {

    // Instantiate Fastclick for better mobile performance
    FastClick.attach(document.body);

    // Instantiate Meanmenu for mobile navigation
    //$(".flexnav").flexNav({ hoverIntent: true, hoverIntentTimeout: 50, calcItemWidths: false });
    $('.headernav').slicknav({
      label: '',
	    duration: 500,
      prependTo:'#navigation'
    });

    // Instantiate secondary content navigation and setup classes.
    // Inserts before #cta
    $(".content-block").scrollNav({
                                insertTarget: "#cta",
                                sections: ".navigable h3",
                                subSections: ".navigable h4",
                                showHeadline: false,
                                showTopLink: false
                              });

    updateActiveState();
    $(window).on('scroll', function() { updateActiveState(); })

    function updateActiveState() {
      if ($('.scroll-nav__sub-item').hasClass('active')) {
        $('.is-parent-item').removeClass('active');
      }
    }


    // And setup fixed sidebar on scroll
    // Using this method to fix nav instead of the built in way so we can fix
    // the call to action in the sidebar, as well.

    // Set sidebar height to same height as content area (article)

    if ($(window).width() > 980 && $('aside').length > 0 ) {
        $('.sidebar-container').height( $('.content-block').height() )
        var length = $('.sidebar-container').height() - $('.sidebar').height() + $('.sidebar-container').offset().top;
    }

    // Consider refactoring this into classes and adding to css files.

    $(window).scroll(function () {

      if ($(window).width() > 980 && $('aside').length > 0 ) {
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
      }
    });

    //form validation
    var formspree = 'http://formspree.io/cassidyclawson@gmail.com';

    $("#cta-form").validate({
      submitHandler: function() {
            $('#submit_btn').addClass('btn_loading');
            $.post(formspree,
            $('form#cta-form').serialize() ,
            function(data){
                $('#submit_btn').delay(1000)
                                .removeClass('btn_loading')
                                .addClass('btn_success')
                                .val('Success')
                                .prop('disabled', true);
                $("#cta .msg").addClass('pulse');
                $('#cta-contact').prop('disabled', true);
                $('#cta-name').prop('disabled', true);
            }, "json");
        }
    });


    $("#contact-form").validate({
      submitHandler: function() {
            $('#submit_btn').addClass('btn_loading');
            $.post(formspree,
            $('form#contact-form').serialize() ,
            function(data){
                $('#submit_btn').delay(1000)
                                .removeClass('btn_loading')
                                .addClass('btn_success')
                                .val('Success')
                                .prop('disabled', true);
                $('#cf-name').prop('disabled', true);
                $('#cf-contact').prop('disabled', true);
                $('#cf-company').prop('disabled', true);
                $('#cf-message').prop('disabled', true);
            }, "json");
        }
    });


    $('.banner-wrap h1').textfill({
      maxFontPixels: 105
    });

    $('.banner-wrap h2').textfill({
      maxFontPixels: 90
    });
});
