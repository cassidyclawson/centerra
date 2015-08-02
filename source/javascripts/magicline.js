$(function() {

    var $el, leftPos, newWidth,
        $mainNav = $(".headernav");

    $mainNav.append("<li id='magic-line'></li>");
    var $magicLine = $("#magic-line");

    if ($('.active').length > 0) {
      $magicLine
          .width($(".active").width())
          .css("left", $(".active a").position().left)
          .data("origLeft", $magicLine.position().left)
          .data("origWidth", $magicLine.width());
    } else {
      var temp = $(".headernav > li:first-child a");
      $magicLine
          .width('0px')
          .css("left", $(temp).position().left)
          .data("origLeft", $magicLine.position().left)
          .data("origWidth", $magicLine.width());
    }

    $(".headernav > li").hover(function() {
        $el = $(this).children('a');
        leftPos = $el.position().left;
        newWidth = $el.parent().width();
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });
    });
});
