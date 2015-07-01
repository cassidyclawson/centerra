jQuery(document).ready(function () {

    // Instantiate Fastclick for better mobile performance
    FastClick.attach(document.body);

    // Instantiate Meanmenu for mobile navigation
    jQuery('.nav-primary').meanmenu({ meanScreenWidth: "640" });
});