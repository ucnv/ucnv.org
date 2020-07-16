$(function() {
  $(window).scroll(function() {
    if ($('h1 em').css('position') == 'fixed') {
      var t = $(window).scrollTop();
      var x = t * -0.3;
      $('h1 em').transition({
        duration: 0,
        rotate: '135deg',
        perspective: '600px',
        rotate3d: '0.1, 1, 0.4, ' + x + 'deg'
      });
    } else {
      $('h1 em').transition({
        duration: 0,
        rotate: '135deg',
        rotate3d: '0, 0, 0, 0deg'
      });
    }
  })

});

google.maps.event.addDomListener(window, 'load', function() {
  var mapId = 'a';
  var pos = new google.maps.LatLng(35.693134, 139.763406);
  var featureOpts = [
    {
      stylers: [
        { saturation: -100 }
      ]
    }
  ];
  var mapOptions = {
    zoom: 16,
    scrollwheel: false,
    mapTypeControl: false,
    streetViewControl: false,
    navigationControl: true,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    },
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, mapId]
    },
    center: pos,
    mapTypeId: mapId
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var customMapType = new google.maps.StyledMapType(featureOpts);
  map.mapTypes.set(mapId, customMapType);
  var marker = new google.maps.Marker({
    position: pos,
    map: map
  });
});

