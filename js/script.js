$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(document).ready(function(){
  listen();

  $root = $('body, html');
  let $active;
  let $prev;
  let $next;

  $("#link1").addClass("primary-color");

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
    $("#link1").addClass("primary-color");
    $("#link2").removeClass("primary-color");
  }
  else if($("#home-wrapper").is(".active")) {
    $("#link2").addClass("primary-color");
    $("#link1").removeClass("primary-color");
  }
}

function listen() {
  if($(window).width() > 767){
    $("#home-wrapper").css("opacity", 1);
  }

  $("#link1").click(function() {
    scrollToHome();
  });

  $("#link2").click(function() {
    scrollToProjects();
  });

  $(".icon-down-open").click(function() {
    scrollToProjects();
  });

function scrollToProjects() {
  if ($("#home-wrapper").is(".active")) {
    slideChanged();
    $('.active').removeClass('active');
    $('#projects-wrapper').addClass('active');
    $.scrollTo($("#projects-wrapper"), 500);
  }
}

function scrollToHome() {
  if ($("#projects-wrapper").is(".active")) {
    slideChanged();
    $('.active').removeClass('active');
    $('#home-wrapper').addClass('active');
    $.scrollTo($("#home-wrapper"), 500);
  }
}

$(document).keydown(function(e) {
  if (e.keyCode === 40) {
    scrollToProjects();
  } else if (e.keyCode === 38) {
    scrollToHome();
  }
});
}
