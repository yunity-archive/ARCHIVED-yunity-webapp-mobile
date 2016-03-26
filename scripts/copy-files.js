var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

var BASE = path.join(__dirname, '..');
var bowerDir = path.join(BASE, 'bower_components');
var publicDir = path.join(BASE, 'public');
var mobileAngularUIDir = path.join(bowerDir, 'mobile-angular-ui');

var entries = [];   // list of full paths
var copySpecs = []; // list of { src: '', dst: '' }

var mobileAngularUIFiles = [
  'dist/css/mobile-angular-ui-hover.min.css',
  'dist/css/mobile-angular-ui-base.min.css',
  'dist/css/mobile-angular-ui-desktop.min.css',
  'dist/js/mobile-angular-ui.js',
  'dist/js/mobile-angular-ui.gestures.js',
  'demo/favicon.png'
];

var fontFiles = [
  'dist/fonts/fontawesome-webfont.woff2',
  'dist/fonts/fontawesome-webfont.ttf',
  'dist/fonts/fontawesome-webfont.svg',
  'dist/fonts/fontawesome-webfont.eot',
  'dist/fonts/fontawesome-webfont.woff'
];

fontFiles.forEach(function(filename){
  var src = path.join(mobileAngularUIDir, filename);
  var dst = path.join(publicDir, 'fonts', path.basename(filename));
  copySpecs.push({
    src: src,
    dst: dst
  });
});

mobileAngularUIFiles.forEach(function(filename){
  entries.push(path.join(mobileAngularUIDir, filename));
});
entries.push(path.join(bowerDir, 'leaflet/dist/leaflet.css'));
entries.push(path.join(bowerDir, 'Leaflet.markercluster/dist/MarkerCluster.css'));
entries.push(path.join(bowerDir, 'Leaflet.markercluster/dist/MarkerCluster.Default.css'));


entries.forEach(function(filename){
  var basename = path.basename(filename);
  var src = filename;
  var dst = path.join(publicDir, 'lib', basename);
  copySpecs.push({ src: src, dst: dst });
});

copySpecs.forEach(function(spec){
  var src = spec.src;
  var dst = spec.dst;
  var dstDir = path.dirname(dst);
  mkdirp.sync(dstDir);
  console.log('copying', src, 'to', dst);
  copyFile(src, dst);
});

function copyFile(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

/*
<link rel="stylesheet" href="bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-hover.min.css"/>
<link rel="stylesheet" href="bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-base.min.css"/>
<link rel="stylesheet" href="bower_components/mobile-angular-ui/dist/css/mobile-angular-ui-desktop.min.css"/>

<link rel="stylesheet" href="bower_components/leaflet/dist/leaflet.css"/>
<link rel="stylesheet" href="bower_components/Leaflet.markercluster/dist/MarkerCluster.css"/>
<link rel="stylesheet" href="bower_components/Leaflet.markercluster/dist/MarkerCluster.Default.css"/>
<script src="bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.js"></script>
<script src="bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.js"></script>
*/