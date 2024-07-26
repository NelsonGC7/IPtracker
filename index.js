const $ = document;
const input = $.querySelector("input")
const btton= $.querySelector("button")
const inf= {
    ip: $.querySelector("#ip"),
    locationn: $.querySelector("#location"),
    timezone:$.querySelector("#timezone"),
    isp:$.querySelector("#isp"),
}
const  validateInput = (inputIp)=>{
    const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(inputIp)
};


var map = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

function updateMap(lat, lng,txt){
    map.setView([lat, lng], 13);
    map.eachLayer(function(layer){
        if(layer instanceof L.Marker){
            map.removeLayer(layer);
        }
    });
    // agregaa un nuevo marcador en la nueva ubicación
    L.marker([lat, lng]).addTo(map)
    .bindPopup(txt)
    .openPopup();
};
btton.addEventListener("click",(e)=>{
    e.preventDefault();
  
    
   if(validateInput(input.value)){
    console.log("clicked")
    fetch(` https://geo.ipify.org/api/v2/country,city?apiKey=at_jbpiz6fhcgjEbT1CEZehHCH99SbcS&ipAddress=${input.value}`)
    .then(responce=> responce.json())
        .then(data=>{
            console.log(data)
            inf.ip.textContent = data.ip;
            inf.locationn.textContent = `${data.location.country}-${data.location.region}`;
            inf.timezone.textContent = `UTC${data.location.timezone}`;
            inf.isp.textContent = data.isp;
            updateMap(data.location.lat, data.location.lng,data.location.city);
            input.value = ""
            var icon  =  document.querySelector(".leaflet-marker-icon")
            icon.src = "./images/icon-location.svg"
            icon.style.width = "40px"
            icon.style.height = "50px"
        })
    .catch(err=> console.error("no Cerro la peticion",err))
   }else{
        input.style.border = "2px solid red";
        setTimeout(()=>{
            input.style.border = "none"
            
        },1000)
        
   }
        
        
})


