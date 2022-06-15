// Viewport
$.fn.isInViewport = function() {
  let elementTop = $(this).offset().top;
  let elementBottom = elementTop + $(this).outerHeight();

  let viewportTop = $(window).scrollTop();
  let viewportBottom = viewportTop + window.innerHeight;

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

var carouselStarted = 0;
var currSelected = 0;
var selectedBreadcrumb = 0;
var courselInterval;

$(window).on("scroll resize", function() {
  // Carousel Loop Start

  if ($(".info").isInViewport()) {
    if (!carouselStarted) {
      carouselInterval = setInterval(() => {
        carouselLoop(currSelected + 1);
      }, 3500);
    }
    carouselStarted = 1;
  }
});

function startCarouselLoop() {
  carouselInterval = setInterval(() => {
    carouselLoop(currSelected + 1);
  }, 3500);
}

// Carousel Loop
var carouselLoop = function(selected, reboot) {
  var carouselLength = $(".carousel-text ul li").length;
  $(".carousel-text li:eq(" + currSelected + ")").removeClass("selected");
  $(".breadcrumb:eq(" + currSelected + ")").removeClass("selected");
  if (selected >= carouselLength) {
    currSelected = 0;
  } else {
    currSelected = selected;
  }
  $(".carousel-text li:eq(" + currSelected + ")").addClass("selected");
  $(".breadcrumb:eq(" + currSelected + ")").addClass("selected");
  if (reboot) {
    startCarouselLoop();
  }
};

$(document).ready(function() {
  $(".info ul li:first-of-type").addClass("selected");
  var carouselLength = $(".info ul li").length;
  $(".info ul")
    .parent()
    .append("<div class='carousel-breadcrumb'></div>");
  for (i = 0; i < carouselLength; i++) {
    $(".carousel-breadcrumb").append("<div class='breadcrumb'></div>");
  }
  $(".breadcrumb:eq(0)").addClass("selected");

  $(".breadcrumb").each(function(ind, obj) {
    $(obj).click(function() {
      clearInterval(carouselInterval);
      carouselLoop(ind, 1);
    });
  });
});
