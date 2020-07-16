$(function() {
  $('#slides').superslides({
     play: 10000
  });

  var resize = function() {
    var w = $(window).width();
    var h = $(window).height();
    $('#container').width(w);
    $('#container').height(h);
    var narrow = $('.narrow').is(':visible');
    if (!narrow) {
      $('h1, .buy').css('top', (h - 150) / 2);
    } else {
      $('h1, .buy').css('top', '');
    }
  };
  $(window).resize(resize);
  resize();

  $('a.buy').hover(function() {
    $('#slides').addClass('blur');
  }, function() {
    $('#slides').removeClass('blur');
  });

});
