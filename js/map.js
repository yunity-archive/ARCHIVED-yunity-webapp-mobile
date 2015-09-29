var yMap = {
	
	prefix : 'map-',
	
	container: null,
	latitude: null,
	longitude: null,
	zoom: null,
		
	init : function(){
		
		container.map = L.map('map').setView([container.latitude, container.longitude], container.zoom);

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(container.map);

		L.marker([51.5, -0.09]).addTo(container.map)
		    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
		    .openPopup();
		
	}
};