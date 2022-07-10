
//inicializar mapa
var map = L.map('map').setView([51.505, -0.09], 13);
// var marker = L.marker([-32.959319, -60.624040]).addTo(map);
var circle
//variables
let search = document.getElementById("tb_search");
let btn_search = document.getElementById("btn_search");
let search_ip = document.getElementById("search_ip");
let search_location = document.getElementById("search_location");
let search_timezone = document.getElementById("search_timezone");
let search_isp = document.getElementById("search_isp");




btn_search.addEventListener("click", function(e){
    e.preventDefault();
    if(search.value != ""){
        getIp(search.value);
    }   
})

function getIp(search){
    const url = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_9vFJcHD9vDP84woLInU5ZVqg8MdBG";

    urlFetch = url + "&ipAddress=" + search;
    console.log(urlFetch)

    fetch(urlFetch)
    .then(res => res.json())
    .then(data => {
        if(data.code == 422){
            document.getElementById("resultadoBusquedaOk").style.display = "none";
            document.getElementById("resultadoBusquedaError").style.display = "block";
            return;
        }
        document.getElementById("resultadoBusquedaOk").style.display = "flex";
        document.getElementById("resultadoBusquedaError").style.display = "none";
    
        
        search_ip.innerHTML = data.ip;
        search_location.innerHTML = data.location.region;
        search_timezone.innerHTML = data.location.timezone;
        search_isp.innerHTML = data.isp;
        map.setView([data.location.lat, data.location.lng], 13);
        L.marker([data.location.lat, data.location.lng],{draggable: true}).addTo(map);
        
    })
    .catch(function(error) {console.log(error)});
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
L.control.scale().addTo(map);
