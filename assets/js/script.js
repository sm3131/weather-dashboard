var currentDate = (moment().format("M/D/YYYY"));

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
                var daily = data.daily

                console.log(icon);
                console.log(temp);
                console.log(wind);
                console.log(humidity);
                console.log(uvi);

                displayCurrentWeather(icon, temp, wind, humidity, uvi)

                getNewDate();
                displayFiveDay(daily);
            })
        }
    })
}

var displayCurrentWeather = function(icon, temp, wind, humidity, uvi) {

    var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

    $(".current-city").append("<img class='icon-img' src=" + iconUrl + ">");

    $("#temp").text("Temp: " + temp + "°F");
    $("#wind").text("Wind: " + wind + " MPH");
    $("#humidity").text("Humidity: " + humidity + " %");
    $("#uv").text("UV Index: " + uvi);

    if(uvi < 3) {
        $("#uv").addClass("green");
    } else if(uvi>=3 && uvi<=5) {
        $("#uv").addClass("yellow");
    } else if(uvi>=6 && uvi<=7) {
        $("#uv").addClass("orange");
    } else if(uvi>=8 && uvi<=10) {
        $("#uv").addClass("red");
    } else if(uvi>= 11) {
        $("#uv").addClass("dark-red");
    }
};


var displayFiveDay = function(dailyStats) {

    for (var i = 0; i < 5; i++) {

        var fiveIcon = "http://openweathermap.org/img/wn/" + dailyStats[i].weather[0].icon + "@2x.png"
        $(".day" + i).find(".weather-icon" + i).append("<img class='iconFive' src=" + fiveIcon + ">");

        $(".day" + i).find(".w-stats").append("<li>High Temp: " + dailyStats[i].temp.max + " °F</li>");
        $(".day" + i).find(".w-stats").append("<li>Low Temp: " + dailyStats[i].temp.min + " °F</li>");
        $(".day" + i).find(".w-stats").append("<li>Wind: " + dailyStats[i].wind_speed + " MPH</li>");
        $(".day" + i).find(".w-stats").append("<li>Humidity: " + dailyStats[i].humidity + " %</li>");
    }


};

var getNewDate = function () {
    for (var d = 1; d < 6; d++) {

        var date = new Date();
        date.setDate(date.getDate() + d);
        
        var newDate = date.toLocaleDateString();
        
        $(".head" + d).text(newDate);
    }  
};

$(".city-form").on("submit", formSubmitHandler); 