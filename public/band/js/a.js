var highlighter = function() {
  $(".vevent").removeClass('highlight');
  if(location.hash) $(location.hash).addClass('highlight');
}

$(highlighter);
window.addEventListener("hashchange", highlighter, false);
