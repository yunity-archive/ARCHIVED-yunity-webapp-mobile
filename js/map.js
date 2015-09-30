import L from 'leaflet';

L.Icon.Default.imagePath = '/images/leaflet';

const yMap = {
	
	container: null,
	latitude: null,
	longitude: null,
	zoom: null,
		
	init : function(element){
		
		this.latitude = 51.505;
		this.longitude = -0.09;
		this.zoom = 13;
		
		this.container = L.map(element).setView([yMap.latitude, yMap.longitude], yMap.zoom);

		L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(yMap.container);

		L.marker([51.5, -0.09]).addTo(yMap.container)
		    .bindPopup('I\'m a Marker, yeah!')
		    .openPopup();
		
	}
};

export default yMap;