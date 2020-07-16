var $ = require('jquery');

$(function() {
  var resize = function() {
    $('.cover').height($(window).height());
  };
  resize();
  $(window).resize(resize);

  var theme = $('meta').filter(function() {
    return $(this).attr('name') == 'theme-color';
  });
  var isflicker = $('body').hasClass('flicker');
  var changeTheme = function() {
    var v = new Array(3);
    for (var i = 0; i < v.length; i++) {
      var x = parseInt(Math.random() * 255).toString(16);
      if (x.length == 1) x = '0' + x;
      v[i] = x;
    }
    var color = '#' + v[0] + v[1] + v[2];
    theme.attr('content', color);
    if (isflicker) $('body').css('background-color', color);
    requestAnimationFrame(changeTheme);
  }
  changeTheme();
})
