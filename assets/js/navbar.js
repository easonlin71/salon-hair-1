$(function () {
    $(window).scroll(function () {
      var scrollVal = $(this).scrollTop();
      if (scrollVal > 400) {
        $(".header-desktop").css("background-color", "#dfd094");
      } else if (scrollVal < 400) {
        $(".header-desktop").css("background-color", "#dfd094ad");
      }
    });
  });