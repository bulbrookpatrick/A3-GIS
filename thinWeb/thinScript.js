
const cities = L.layerGroup();
L.marker([44.2312, -76.4860]).bindPopup('Kingston, Ontario').addTo(cities);
L.marker([44.2270, -76.6500]).bindPopup('Amherstview, Ontario').addTo(cities);
L.marker([44.3300, -76.1600]).bindPopup('Gananoque, Ontario').addTo(cities);
L.marker([44.2500, -76.9500]).bindPopup('Napanee, Ontario').addTo(cities);


const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

const wmsUrl = 'http://10.41.80.45:8080/cgi-bin/mapserv.exe?map=/ms4w/Apache/htdocs/wmaps/engo451/2026/u42/Kingston_wms.map';
const neighbourhoods = L.tileLayer.wms(wmsUrl, {
	format: 'image/png',
	transparent: true,
	version: '1.3.0',
	layers: 'Kingston_Pop_neighbourhood'
});

const roads = L.tileLayer.wms(wmsUrl, {
	format: 'image/png',
	transparent: true,
	version: '1.3.0',
	layers: 'Road_Centreline_kingston'
});

const playgrounds = L.tileLayer.wms(wmsUrl, {
	format: 'image/png',
	transparent: true,
	version: '1.3.0',
	layers: 'Playgrounds_kingston'
});

const map = L.map('map', {
	center: [44.2312, -76.4860],
	zoom: 11,
	layers: [osm, neighbourhoods, roads, playgrounds, cities]
});
map.fitBounds([
	[44.2083, -76.7129],
	[44.4803, -76.2338]
]);

const baseLayers = {
	'OpenStreetMap': osm,
	'OpenStreetMap.HOT': osmHOT
};

const overlays = {
	'Cities': cities,
	'Kingston Population Neighbourhoods': neighbourhoods,
	'Kingston Road Centrelines': roads,
	'Kingston Playgrounds': playgrounds
};


// layerControl button
const layerControl = L.control.layers(baseLayers, overlays).addTo(map);
