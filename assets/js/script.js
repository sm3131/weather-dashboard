

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var country = $("#country").val().trim();
    console.log(city);
    console.log(state);
    console.log(country);

    if(city && state && country) {

        getCityCoords(city, state, country);

        //clear old content
        $("#city").val("");
        $("#state").val("");
        $("#country").val("");
    } 
    else {
        alert("please enter a valid location");
    }
};
  
var getCityCoords = function(cityName, stateName, countryName) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateName + "," + countryName + "&limit=1&appid=d7c51260421f59d205477457b5c74ad2"

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                //getCityWeather(data.name, data.lat, data.lon);
            })
        }
    })
}

var getCityWeather = function(city, lat, lon) {

}


$(".city-form").on("submit", formSubmitHandler); 