import L from 'leaflet';
import 'leaflet.markercluster';

/*
  TODO: import stylesheets
  - leaflet.css
  - MarkerClusterer.css
  - MarkerClusterer.Default.css
*/

L.Icon.Default.imagePath = '/images/markers/';

const debug = require('debug')('yunity:yMap');

export default class YMapService {

  constructor() {
    Object.assign(this, {
      container: null,
      latLng: null,
      zoom: null,
      element: null,
      initiated: false,
      defaultLatLng: [51.505, -0.09],
      defaultZoom: 13

    });
  }

  /*
  * Configuration
  */
  config(opt) {
    if (opt.defaultLatLng !== undefined) {
      this.defaultLatLng = opt.defaultLatLng;
    }

    if (opt.defaultZoom !== undefined) {
      this.defaultZoom = opt.defaultZoom;
    }
  }

  /**
  * initialize map by given HTML Element
  *
  * @param element <HTMLElement>
  */


  init(element) {

    /*
    * init the map only one time
    */
    if (!this.initiated) {

      debug('init map');
      this.zoom = this.defaultZoom;
      this.latLng = this.defaultLatLng;
    }

    /*
    * Add Container and define Tile Layer Service
    */
    this.container = L.map(element).setView(this.latLng, this.zoom);

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.container);

    /*
    * Save state of the map when anything has changed
    */
    this.container.on('moveend zoomend', () => {
      this.zoom = this.container.getZoom();
      this.latLng = this.container.getCenter();
    });

    this.container.on('locationfound', (e) => {
      debug(e);
      this.addMarker(e.latlng, 'you are here!');
    });

    this.container.locate({
      setView: true,
      enableHighAccuracy: true
    });

    /*
    * set initiated true to know that the map is initialized
    */
    this.initiated = true;

  }

  /*
  * set view of the map
  */
  setView(LatLng, zoom) {

    if (zoom === undefined) {
      zoom = this.defaultZoom;
    }
    this.container.setView(LatLng, zoom);
  }

  addMarker(latLng, label) {

    L.marker(latLng).addTo(this.container)
    .bindPopup(label)
    .openPopup();
  }

  /*
  * draw marker on map and cluster it together
  * Param List of Items [{name,ll}]
  */
  renderMarkerCluster(items) {

    // init cluster group
    let markers = new L.MarkerClusterGroup();

    // add all recieved marker items to the map
    items.forEach((item) => {
      markers.addLayer( new L.Marker(item.ll) );
    });

    this.container.addLayer(markers);
  }

}
