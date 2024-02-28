/*
StAuth10244: I Alen Varghese Cheruvally Kunjumon, 000837873 certify that this material is my original work.
No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

*/

let map;
var homeLatitude,homeLongitude,currentLocation;
let allMarkers = [];
function initMap() {
    
  

    
    map = new google.maps.Map(
        document.getElementById("map"),
        {center:{lat:43.2387, lng:-79.881},
        zoom: 12,
        });

        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();

        directionsRenderer.setMap(map);        



        let infoWindow = new google.maps.InfoWindow();

        function openInfoWindow(){
            infoWindow.close();
            infoWindow.setContent (
                "<h4>" + this.NAME + "</h4>" +
                "<br />" + " <br />" +
                "<p><strong>WaterFall Height: " + this.HEIGHT_IN_M + " Meters<strong/></p>" + 
                "<p><strong>WaterFall Width: " + this.WIDTH_IN_M + " Meters<strong/></p>" + 
                "<p><strong>Location Access point: " + this.ACCESS_FROM + "<strong/></p>" 
                
            )
            infoWindow.open(map,this);
        }

        

        


        for(let i =0; i<waterFallData.length;i++){
            let waterFallMarker = new google.maps.Marker({
                position: {lat: waterFallData[i].LATITUDE,
                        lng: waterFallData[i].LONGITUDE},
                        title: waterFallData[i].NAME
            }); 

           
            waterFallMarker.NAME = waterFallData[i].NAME;
            waterFallMarker.HEIGHT_IN_M = waterFallData[i].HEIGHT_IN_M;
            waterFallMarker.WIDTH_IN_M = waterFallData[i].WIDTH_IN_M;
            waterFallMarker.ACCESS_FROM = waterFallData[i].ACCESS_FROM;
            waterFallMarker.COMMUNITY = waterFallData[i].COMMUNITY;
            waterFallMarker.LATITUDE = waterFallData[i].LATITUDE;
            waterFallMarker.LONGITUDE = waterFallData[i].LONGITUDE;

            
            

            waterFallMarker.setMap(map);

            waterFallMarker.addListener("click", openInfoWindow);

            allMarkers.push(waterFallMarker)


            
        }
        function filterByHamilton(){
            for(let i=0; i<allMarkers.length;i++){
                if(allMarkers[i].COMMUNITY == "Hamilton"){
                    allMarkers[i].setMap(map);
                }
                else{
                    allMarkers[i].setMap(null);
                }
            }
        }
        document.getElementById("hamilton").onclick = filterByHamilton;


        function filterByDundas(){
            for(let i=0; i<allMarkers.length;i++){
                if(allMarkers[i].COMMUNITY == "Dundas"){
                    allMarkers[i].setMap(map);
                }
                else{
                    allMarkers[i].setMap(null);
                }
            }
        }
        document.getElementById("dundas").onclick = filterByDundas;


        function filterByStoneyCreek(){
            for(let i=0; i<allMarkers.length;i++){
                if(allMarkers[i].COMMUNITY == "Stoney Creek"){
                    allMarkers[i].setMap(map);
                }
                else{
                    allMarkers[i].setMap(null);
                }
            }
        }
        document.getElementById("stoney_creek").onclick = filterByStoneyCreek;


        function filterByAncaster(){
            for(let i=0; i<allMarkers.length;i++){
                if(allMarkers[i].COMMUNITY == "Ancaster"){
                    allMarkers[i].setMap(map);
                }
                else{
                    allMarkers[i].setMap(null);
                }
            }
        }
        document.getElementById("ancaster").onclick = filterByAncaster;


        function filterByFlamborough(){
            for(let i=0; i<allMarkers.length;i++){
                if(allMarkers[i].COMMUNITY == "Flamborough"){
                    allMarkers[i].setMap(map);
                }
                else{
                    allMarkers[i].setMap(null);
                }
            }
        }
        document.getElementById("flamborough").onclick = filterByFlamborough;


        function filterByShowAll(){
            for(let i=0; i<allMarkers.length;i++){
                    allMarkers[i].setMap(map);
                }
            }
        document.getElementById("show_all").onclick = filterByShowAll;

        //success function to run if coordinates are found,, geolocate service function
        function userLocation(position){
            currentLocation = new google.maps.Marker({
                position: {lat: position.coords.latitude,
                        lng: position.coords.longitude},
                        title: "Your Location",
                        icon:"http://maps.google.com/mapfiles/kml/shapes/ranger_station.png"
                }); 
            currentLocation.setMap(map);
            homeLatitude = position.coords.latitude;
            homeLongitude = position.coords.longitude;
        }
        
        


        
        document.getElementById("geolocate").onclick = function(){
            navigator.geolocation.getCurrentPosition(userLocation);
        }

         // geocoder service object
        geocoder = new google.maps.Geocoder();

        document.getElementById("geocode").onclick = function(){
             geocoder = new google.maps.Geocoder();
            var address = document.getElementById('address').value;

            // perform geocoding for the address entered into the input textbox, a 
            // callback function is given the latitude and longitude as an an 
            // argument as part of a results object..
            geocoder.geocode( { 'address': address}, function(results, status) {
              if (status == 'OK') {
                
                // we could center the map at the location
                // map.setCenter(results[0].geometry.location);
                
                
                 
                // put a marker on the map at the given position
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon:"http://maps.google.com/mapfiles/kml/shapes/ranger_station.png"

                });
              } else {
                alert('Geocode was not successful for the following reason: ' + status);
              }
            });
        }

        //to get directions
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);


          const selectedDestination = document.getElementById("destinations");
          selectedDestination.onchange = function (){

            var start = new google.maps.LatLng(homeLatitude,homeLongitude);
            var end =  document.getElementById('destinations').value;
        
            console.log(end)

            var request = {
              origin: start,
              destination: end,
              travelMode: 'DRIVING'
            };
            directionsService.route(request, function(result, status) {
              if (status == 'OK') {
                directionsRenderer.setDirections(result);
              }
            });
          }


        
       


}

initMap();
  