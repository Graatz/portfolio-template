$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(document).ready(function(){
  listen();

  $root = $('body, html');
  let $active;
  let $prev;
  let $next;

  $("#link1 > button").css("color", "#F22F41");

  $(window).on('mousewheel DOMMouseScroll', function(e) {
    if($(window).width() > 767)
    {
      e.preventDefault();
      var delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;
      $active = $('#slider > .active');

      if(delta < 0) {
        $next = $active.next();

        if($next.length) {
          slideChanged();
          $root.stop(true).animate({scrollTop:$next.offset().top}, 'slow', 'swing');
          $next.addClass('active').siblings().removeClass('active');
        }
      }
      else {
        $prev = $active.prev();
        if($prev.length){
          slideChanged();
          $root.stop(true).animate({scrollTop:$prev.offset().top}, 'slow', 'swing');
          $prev.addClass('active').siblings().removeClass('active');
        }
      }
    }
  });
});

function slideChanged() {
  if($("#projects-wrapper").is(".active")) {
    console.log("changed projects");
    $("#link1 > button").css("color", "#F22F41");
    $("#link2 > button").css("color", "#fff");
  }
  else if($("#home-wrapper").is(".active")) {
    console.log("changed home");
    $("#link2 > button").css("color", "#F22F41");
    $("#link1 > button").css("color", "#fff");
  }
}

function listen() {
  if($(window).width() > 767){
    $("#home-wrapper").css("opacity", 1);
  }

  $(".image").css("transform", "scale(1.5)");

  $("#link1").click(function() {
    if ($("#projects-wrapper").is(".active")) {
      slideChanged();
      $('.active').removeClass('active');
      $('#home-wrapper').addClass('active');
      $.scrollTo($("#home-wrapper"), 500);
    }
  });

  $("#link2").click(function() {
    if ($("#home-wrapper").is(".active")) {
      slideChanged();
      $('.active').removeClass('active');
      $('#projects-wrapper').addClass('active');
      $.scrollTo($("#projects-wrapper"), 500);
    }
  });

  $(".icon-down-open").click(function() {
    slideChanged();
    $('.active').removeClass('active');
    $('#projects-wrapper').addClass('active');
    $.scrollTo($("#projects-wrapper"), 500);
  });

  $(".img-container").mouseenter(function () {
    $(this).children(".overlay").css("transform", "scale(1)");
    $(this).children(".overlay").css("opacity", 1);
    $(this).children(".img").css("opacity", 0.1);
    $(this).children(".img").css("transform", "scale(1.1)");
  });

  $(".img-container").mouseleave(function () {
    $(this).children(".overlay").css("transform", "scale(0.5)");
    $(this).children(".overlay").css("opacity", 0);
    $(this).children(".img").css("opacity", 1);
    $(this).children(".img").css("transform", "scale(1.0)");
  });
}
