 
  let Maps = L.map("map").setView([18.83634890534054,-70.11357550890317], 8);

 L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {attribution: '<a href="https://www.google.es/maps/preview">Google Maps</a>'}).addTo(Maps);
 

 // Insertando una leyenda en el mapa
var legend = L.control({position: 'bottomright'});
 
legend.onAdd = function (Maps) {
 
var div = L.DomUtil.create('div', 'info legend');
 
div.innerHTML +=
'<img alt="legend" src="../images/map_leyenda.jpg" width="200" height="120" />';
 return div;
};
 
legend.addTo(Maps);

// var title = L.control();
   
//   title.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info');
//         div.innerHTML +=
//         '<h2>TuDestinoRD</h2>Localiza los <b>Hoteles, Restaurante, Destinos Turisticos y mas...</b>';
//      return div;
//   };
   
//   title.addTo(map);         

  var hotelIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    // shadowUrl: 'leaf-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
    var restauranteIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    // shadowUrl: 'leaf-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
    var destinoIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    // shadowUrl: 'leaf-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
    var act_t_Icon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    // shadowUrl: 'leaf-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var nombre = "";
var cN = "";
var cW = "";

fetch(
  "https://finalproject-309315.uc.r.appspot.com/search?type=Business&busType=Hotel"
)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {

    let markerHotel = L.marker([element.CoordN, element.CoordW], {icon: hotelIcon}).addTo(Maps).bindPopup("Hotel: "+element.Name);
         markerHotel.on('click', function() {
    Maps.flyTo([element.CoordN, element.CoordW],14);
  });

    });
  });

fetch(
  "https://finalproject-309315.uc.r.appspot.com/search?type=Business&busType=Restaurante"
)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {

  let markerRestaurant = L.marker([element.CoordN, element.CoordW], {icon: restauranteIcon}).addTo(Maps).bindPopup("Restaurante: "+element.Name);
  markerRestaurant.on('click', function() {
    Maps.flyTo([element.CoordN, element.CoordW],14);
  });

    });
  });
fetch(
  "https://finalproject-309315.uc.r.appspot.com/search?type=Destination"
)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {

  let markerDestino = L.marker([element.CoordN,element.CoordW], {icon: destinoIcon}).addTo(Maps).bindPopup("Destino Turistico: "+element.Name);
   markerDestino.on('click', function() {
    Maps.flyTo([element.CoordN, element.CoordW],14);
  });

});
  });

fetch(
  "https://finalproject-309315.uc.r.appspot.com/search?type=Activity"
)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {

  let markerActivities = L.marker([element.CoordN, element.CoordW], {icon:act_t_Icon}).addTo(Maps).bindPopup("Actividad Turistica: "+element.Name);
  markerActivities.on('click', function() {
    Maps.flyTo([element.CoordN, element.CoordW],14);
  });

    });
  });
