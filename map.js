import L from 'leaflet';

L.Icon.Default.imagePath = '/assets/img/marker';

const mapModule = angular.module('yunityMap', []);

mapModule.provider('$yunityMap', [function () {

    this.$get = () => {
        return {

            /*
             * Attributes
             */
            container: null,
            latLng: null,
            zoom: null,
            element:null,
            initiated: false,

            /*
             * Configuration
             */
            config(opt) {

            },

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
                    yMap.latLng = L.latLng(51.505, -0.09);
                    yMap.zoom = 13;

                }

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

                /*
                 * set initiated true to know that the map is initialized
                 */
                yMap.initiated = true;

            },

            addMarker() {

                let yMap = this;

                L.marker([51.5, -0.09]).addTo(yMap.container)
                    .bindPopup('I\'m a Marker, yeah!')
                    .openPopup();
            }

        };
    };

    return this;

}]);


mapModule.directive('yMap', ['$yunityMap', function ($yunityMap) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {

            $yunityMap.init($element[0]);
            $yunityMap.addMarker();

        }
    };
}]);

mapModule.run(() => {

});

export default 'yunityMap';