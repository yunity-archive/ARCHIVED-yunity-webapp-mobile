import L from 'leaflet';
import 'leaflet.markercluster';

L.Icon.Default.imagePath = '/assets/img/marker';

const mapModule = angular.module('yunityMap', []);

mapModule.factory('yMapService', [function () {

    return {

        /*
         * Attributes
         */
        container: null,
        latLng: null,
        zoom: null,
        element:null,
        initiated: false,
        defaultLatLng: [51.505, -0.09],
        defaultZoom: 13,

        /*
         * Configuration
         */
        config(opt) {
            if(opt.defaultLatLng != undefined) {
                this.defaultLatLng = opt.defaultLatLng;
            }

            if(opt.defaultZoom != undefined) {
                this.defaultZoom = opt.defaultZoom;
            }
        },

        /**
         * initialize map by given HTML Element
         *
         * @param element <HTMLElement>
         */


        init(element) {

            /*
             * make everything anywhere accessable workaround !? maybe good..
             */
            let yMap = this;

            /*
             * init the map only one time
             */
            if (!yMap.initiated) {

                console.log('init map');
                yMap.zoom = yMap.defaultZoom;
                yMap.latLng = yMap.defaultLatLng;
            }

            //L.map(element).setView(yMap.latLng, yMap.zoom);

            /*
             * Add Container and define Tile Layer Service
             */
            yMap.container = L.map(element).setView(yMap.latLng, yMap.zoom);

            L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(yMap.container);

            /*
             * Save state of the map when anything has changed
             */
            yMap.container.on('moveend zoomend', function (ev) {

                yMap.zoom = yMap.container.getZoom();
                yMap.latLng = yMap.container.getCenter();

            });

            yMap.container.on('locationfound', function(e) {
                console.log(e);
                yMap.addMarker(e.latlng, 'you are here!');
            });

            yMap.container.locate({
                setView: true,
                enableHighAccuracy: true
            });

            /*
             * set initiated true to know that the map is initialized
             */
            yMap.initiated = true;

        },

        /*
         * set view of the map
         */
        setView(LatLng, zoom) {

            let yMap = this;

            if(zoom == undefined) {
                zoom = yMap.defaultZoom;
            }
            yMap.container.setView(LatLng, zoom);
        },

        addMarker(latLng, label, type) {

            let yMap = this;

            L.marker(latLng).addTo(yMap.container)
                .bindPopup(label)
                .openPopup();
        },

        /*
         * draw marker on map and cluster it together
         * Param List of Items [{name,ll}]
         */
        renderMarkerCluster(items) {
            let yMap = this;

            // init cluster group
            var markers = new L.MarkerClusterGroup();

            // add all recieved marker items to the map
            items.forEach(item => {
                markers.addLayer( new L.Marker(item.ll) );
            });

            yMap.container.addLayer(markers);
        }

    };

}]);


mapModule.directive('yMap', ['yMapService', function (yMapService) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {

            yMapService.init($element[0]);

        }
    };
}]);

mapModule.run(() => {

});

export default 'yunityMap';