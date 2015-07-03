jQuery(document).ready(function () {

    // Instantiate Fastclick for better mobile performance
    FastClick.attach(document.body);

    // Instantiate Meanmenu for mobile navigation
    $(".flexnav").flexNav({ hoverIntent: true, hoverIntentTimeout: 50, calcItemWidths: true });
});
