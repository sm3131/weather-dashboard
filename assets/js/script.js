var currentDate = (moment().format("M, D, YYYY"));

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
    var apiGeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateName + "," + countryName + "&limit=1&appid=d7c51260421f59d205477457b5c74ad2"

    fetch(apiGeoUrl).then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                console.log(data[0].name);
                console.log(data[0].lat);
                console.log(data[0].lon);
                getCityWeather(data[0].name, data[0].state, data[0].lat, data[0].lon);
            })
        }
    })
}

var getCityWeather = function(city, state, lat, lon) {

    $(".current-city").text(city + ", " + state + " " + "(" + currentDate + ")");

    var apiWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d7c51260421f59d205477457b5c74ad2";

    fetch(apiWeatherUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var icon = data.current.weather[0].icon;
                var temp = data.current.temp;
                var wind = data.current.wind_speed
                var humidity = data.current.humidity
                var uvi = data.current.uvi
                
                console.log(icon);
                console.log(temp);
                console.log(wind);
                console.log(humidity);
                console.log(uvi);

                displayCurrentWeather(icon, temp, wind, humidity, uvi)

                // displayFiveDay()
            })
        }
    })
}

var displayCurrentWeather = function(icon, temp, wind, humidity, uvi) {

    var iconUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png"

    $(".current-city").append("<img src=" + iconUrl + ">");

    $("#temp").text("Temp: " + temp + "°F");
    $("#wind").text("Wind: " + wind + " MPH");
    $("#humidity").text("Humidity: " + humidity + " %");
    $("#uv").text("UV Index: " + uvi);
};

$(".city-form").on("submit", formSubmitHandler); 