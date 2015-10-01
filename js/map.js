import L from 'leaflet';

L.Icon.Default.imagePath = '/images/leaflet';

const yMap = {
	
	container: null,
	latLng:null,
	zoom: null,
	initiated:false,
		
	init : function(element){
		
		/*
		 * init the map only one time
		 */
		if(!this.initiated) {
			this.latLng = L.latLng(51.505, -0.09);
			this.zoom = 13;
		}
			
		this.container = L.map(element).setView(this.latLng, this.zoom);

		L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
			    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(yMap.container);

		L.marker([51.5, -0.09]).addTo(yMap.container)
			  .bindPopup('I\'m a Marker, yeah!')
			   .openPopup();
		
		/*
		 * Save state of the map while changing it
		 */
		this.container.on('moveend zoomend',function(ev){
			
			yMap.zoom = yMap.container.getZoom();
			yMap.latLng = yMap.container.getCenter();

		});
			
		/*
		 * set initiated true to know that the map is initialized
		 */
		this.initiated = true;
		
		
		
	}
};

export default yMap;