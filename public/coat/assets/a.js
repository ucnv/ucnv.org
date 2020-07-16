var initMap = function() {
   var markerll = new google.maps.LatLng(35.672101,139.712802);
   var centerll = new google.maps.LatLng(35.672358,139.712791);
   var opt = {
    zoom: 16,
    center: centerll,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('map'), opt);
  var marker = new google.maps.Marker({
    position: markerll,
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initMap);

var initBgImg = function() {
  var resize = function(e) {
    var bg = $('#bg');
    var ww = $(window).width();
    ww = Math.max(ww, 1024);
    var wh = $(window).height();
    var ch = $('body').height();
    wh = Math.max(ch, wh);
    var i = $('img.stereoscopy', bg);
    if (ww > wh) {
      i.css({
        'margin-left': 'auto',
        'margin-right': 'auto',
        'margin-top': (ch - ww) / 2,
        'width': ww,
        'height': ww
      });
    } else {
      i.css({
        'margin-top': 'auto',
        'margin-left': (ww - wh) / 2,
        'margin-right': (ww - wh) / 2,
        'width': wh,
        'height': wh
      });
    }
    bg.height(wh);
  }
  $(window).resize(resize);
  var setImg = function(link) {
    var token;
    if (link && link.target) {
      token = $(link.target).attr('id');
      if (token) token = token.replace('switch-', '');
    }
    if (!token) token = 'light';
    var bg = $('#bg');
    var img = $('img.stereoscopy', bg);
    if (!img.length) {
      img = $('<img class="stereoscopy" />');
      img.appendTo(bg);
    }
    img.attr('src', 'assets/' + token + 'p.gif');
    img.load(function() {
      $('#bg .loading').hide();
    });
    resize();
    return false;
  }
  $('.button .switch').click(setImg);
  setImg();
  $('<img>').attr('src', 'assets/darkp.gif');
  $('<img>').attr('src', 'assets/lightp.gif');
}

var loadObj = function(token) {
  var glitch = /glitch/.test(location.search);
  var w = $(window);
  var container = $('#bg');
  var camera = new THREE.PerspectiveCamera(80, w.width() / w.height(), 1, 1500 );
  var reset = (function() {
    if (token == 'dark') {
      return function() {
        camera.position.set(33.58, -14.14, 6.45);
        camera.up.set(-0.42, 0.23, 0.86);
      }
    } else {
      return function() {
        camera.position.set(-23.65, -12.21, -2.10);
        camera.up.set(0.80, 0.42, 0.41);
      }
    }
  })();

  var scene = new THREE.Scene();
  var ambient = new THREE.AmbientLight(0xffffff);
  scene.add(ambient);

  var dl = new THREE.DirectionalLight(0xffffff);
  dl.position.set(0, 0, 1).normalize();
  scene.add(dl);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(w.width(), w.height());
  var canvas = renderer.domElement;
  container.append(renderer.domElement);

  var loader = new THREE.OBJMTLLoader();
  loader.addEventListener('load', function (ev) {
    var o = ev.content;
    scene.add(o);
    if (token == 'light') {
      o.position.z = -16;
      $('#bg .loading').hide();
    } else {
      o.position.z = -13;
    }
    reset();
    setTimeout(function() { renderer.render(scene, camera); }, 100);
  });
  if (!glitch) loader.load('assets/' + token + '.obj', 'assets/' + token + '.obj.mtl');
  else loader.load('assets/' + token + '-g.obj', 'assets/' + token + '-g.obj.mtl');

  var controls = new THREE.TrackballControls(camera);
  controls.addEventListener('change', function() {
    renderer.render(scene, camera);
  });

  return {
    token: token,
    canvas: canvas,
    scene: scene,
    camera: camera,
    renderer: renderer,
    controls: controls,
    reset: reset
  };
}

var initWebGL = function() {
  var w = $(window);
  var scene, camera, renderer, controls;

  var objects = [loadObj('dark'), loadObj('light')];

  var switchObj = function(link) {
    var token;
    if (link && link.target) {
      token = $(link.target).attr('id');
      if (token) token = token.replace('switch-', '');
    }
    if (!token) token = 'light';
    var show, hide;
    for (var i = 0; i < objects.length; i++) {
      if (objects[i].token == token) show = objects[i];
      else hide = objects[i];
    }
    $(show.canvas).show();
    $(hide.canvas).hide();
    scene = show.scene;
    camera = show.camera;
    renderer = show.renderer;
    controls = show.controls;
    show.reset();
  }
  $('.button .switch').click(switchObj);
  switchObj();


  var resize = function() {
    if (w.width() > 1024) objects[0].controls.enabled = objects[1].controls.enabled = true;
    else objects[0].controls.enabled = objects[1].controls.enabled = false;

    camera.aspect = w.width() / w.height();
    camera.updateProjectionMatrix();

    renderer.setSize(w.width(), w.height());
    controls.handleResize();
    renderer.render(scene, camera);
  }
  $(window).resize(resize);
  resize();

  var animate = function() {
    requestAnimationFrame(animate);
    controls.update();
  }
  animate();
}

$(function() {
  if (Detector.webgl) initWebGL();
  else initBgImg();
});
