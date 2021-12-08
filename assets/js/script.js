var currentDate = (moment().format("M/D/YYYY"));

var formSubmitHandler = function (event) {
    
    event.preventDefault();

    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var country = $("#country").val().trim();
    console.log(city);
    console.log(state);
    console.log(country);

    if (city && state && country) {
        getCoords(city, state, country);
    } else if (city && !state && !country) {
        getCoordsCity(city);
    } else if (city && !state && country) {
        getCoordsCityCountry(city, country);
    } else if (city && state && !country) {
        getCoordsCityState(city, state); 
    } else {
        alert("please enter a valid city");
    } 

    //clear old content
    $("#city").val("");
    $("#state").val("");
    $("#country").val("");
};

var getCoords = function (cityName, stateName, countryName) {
    var apiGeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateName + "," + countryName + "&limit=1&appid=d7c51260421f59d205477457b5c74ad2"

    fetch(apiGeoUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                console.log(data[0].name);
                console.log(data[0].state);
                console.log(data[0].country);
                console.log(data[0].lat);
                console.log(data[0].lon);
                getCityWeather(data[0].name, data[0].state, data[0].country, data[0].lat, data[0].lon);
            })
        }
    })
}

var getCoordsCity = function (cityName) {
    var apiGeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=d7c51260421f59d205477457b5c74ad2"

    fetch(apiGeoUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                console.log(data[0].name);
                console.log(data[0].state);
                console.log(data[0].country);
                console.log(data[0].lat);
                console.log(data[0].lon);
                getCityWeather(data[0].name, data[0].state, data[0].country, data[0].lat, data[0].lon);
            })
        }
    })
};

var getCoordsCityState = function(cityName, stateName) {
    var apiGeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + stateName + ",US&limit=1&appid=d7c51260421f59d205477457b5c74ad2"

    fetch(apiGeoUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                console.log(data[0].name);
                console.log(data[0].state);
                console.log(data[0].country);
                console.log(data[0].lat);
                console.log(data[0].lon);
                getCityWeather(data[0].name, data[0].state, data[0].country, data[0].lat, data[0].lon);
            })
        }
    })
}

var getCoordsCityCountry = function (cityName, countryName) {
    var apiGeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "," + countryName + "&limit=1&appid=d7c51260421f59d205477457b5c74ad2"

    fetch(apiGeoUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                console.log(data[0].name);
                console.log(data[0].state);
                console.log(data[0].country);
                console.log(data[0].lat);
                console.log(data[0].lon);
                getCityWeather(data[0].name, data[0].state, data[0].country, data[0].lat, data[0].lon);
            })
        }
    })
}

var getCityWeather = function (city, state, country, lat, lon) {

    if(country==="US") {
        $(".current-city").text(city + ", " + state + " " + "(" + currentDate + ")");
    } else
        $(".current-city").text(city + ", " + country + " " + "(" + currentDate + ")");

    var apiWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=d7c51260421f59d205477457b5c74ad2";

    fetch(apiWeatherUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
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

                displayCurrentWeather(icon, temp, daily, wind, humidity, uvi)

                getNewDate();
                displayFiveDay(daily);

                storeSearches(city, state, country);
            })
        }
    })
}

var displayCurrentWeather = function (icon, temp, daily, wind, humidity, uvi) {

    var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

    $(".current-city").append("<img class='icon-img' src=" + iconUrl + ">");

    $("#temp").text("Temp: " + temp + "°F");
    $("#temp-high").text("High: " + daily[0].temp.max + "°F");
    $("#temp-low").text("Low: " + daily[0].temp.min + "°F");
    $("#wind").text("Wind: " + wind + " MPH");
    $("#humidity").text("Humidity: " + humidity + "%");
    $("#uv").text("UV Index: " + uvi);

    if (uvi < 3) {
        $("#uv").addClass("green");
    } else if (uvi >= 3 && uvi <= 5) {
        $("#uv").addClass("yellow");
    } else if (uvi >= 6 && uvi <= 7) {
        $("#uv").addClass("orange");
    } else if (uvi >= 8 && uvi <= 10) {
        $("#uv").addClass("red");
    } else if (uvi >= 11) {
        $("#uv").addClass("dark-red");
    }
};

var displayFiveDay = function (dailyStats) {

    for (var i = 1; i < 6; i++) {

        var fiveIcon = "http://openweathermap.org/img/wn/" + dailyStats[i].weather[0].icon + "@2x.png"
        $(".day" + i).find(".weather-icon" + i).attr("src", fiveIcon);

        $(".day" + i).find(".list1").text("High Temp: " + dailyStats[i].temp.max + " °F");
        $(".day" + i).find(".list2").text("Low Temp: " + dailyStats[i].temp.min + " °F");
        $(".day" + i).find(".list3").text("Wind: " + dailyStats[i].wind_speed + " MPH");
        $(".day" + i).find(".list4").text("Humidity: " + dailyStats[i].humidity + "%");
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

var storeSearches = function(city, state, country) {
    
    if(state) {
        var cityObj = {
            "city": city,
            "state": state,
            "country": country
        }
    } else {
        var cityObj = {
            "city": city,
            "country": country
        }
    }

    var cityArr = [];

    var cityMatch = [];
    for(i = 0; i < 8; i++) {
        var cityItem = $(".item" + i).text()
        cityMatch.push(cityItem);
    }
    
    if(cityMatch.includes(city + ", " + state)) {
        return false;
    } else {
        var getCityArr = getStoredCities(cityArr);
        cityArr = getCityArr
        cityArr = cityArr.unshift(cityObj);
        localStorage.setItem("storedCities", JSON.stringify(getCityArr));
    }
    displayCityHistory(getCityArr);
}

var getStoredCities = function(cityArr) {

    var getCities = localStorage.getItem("storedCities");
        
        if(!getCities) {
            return getCities = [];
        } else {
            getCities = JSON.parse(getCities);
            cityArr = getCities
            return cityArr
        }
    }


var displayCityHistory = function(cityDisplay) {

    for(i = 0; i < cityDisplay.length; i++) {
        var cityDis = cityDisplay[i].city;
        var stateDis = cityDisplay[i].state;
        var countryDis = cityDisplay[i].country;
        if(stateDis) {
            $(".item" + i).text(cityDis + ", " + stateDis);
        } else {
            $(".item" + i).text(cityDis + ", " + countryDis);
        }
    }
}

var displaySearchHistory = function(event) {
    var cityTarget = event.target

    if(cityTarget.matches(".city-item")) {
        var cityItem = $(cityTarget).text();
        cityItem = cityItem.split(",", 1);
        var cityItemText = cityItem[0];
        var stateItem = $(cityTarget).text();
        stateItem = stateItem.split(",", 2);
        var stateItemText = stateItem[1].trim();
    }
    
    var storedArrMatch = getStoredCities(); 

    for(i = 0; i < storedArrMatch.length; i++) {
        
        var storedCity = storedArrMatch[i].city
        var storedState = storedArrMatch[i].state
        var storedCountry = storedArrMatch[i].country

        if(storedCity === cityItemText && storedState === stateItemText) {
            $("#city").val(storedCity);
            $("#state").val(storedState);
            $("#country").val(storedCountry);
        } else if (storedCity === cityItemText && !storedState) {
            $("#city").val(storedCity);
            $("#country").val(storedCountry);
        }
    }
    searchHistoryCity();
}

var searchHistoryCity = function () {
    

    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var country = $("#country").val().trim();
    console.log(city);
    console.log(state);
    console.log(country);

    if (city && state && country) {
        getCoords(city, state, country);
    } else if (city && !state && !country) {
        getCoordsCity(city);
    } else if (city && !state && country) {
        getCoordsCityCountry(city, country);
    } else if (city && state && !country) {
        getCoordsCityState(city, state); 
    } else {
        alert("please enter a valid city");
    } 

    //clear old content
    $("#city").val("");
    $("#state").val("");
    $("#country").val("");
};

window.onload = function() {
   var storedCitiesArr = getStoredCities();

    displayCityHistory(storedCitiesArr);
}

$(".history-cities").on("click", displaySearchHistory);

$(".city-form").on("submit", formSubmitHandler);


//to do
// fix city history to store multiple cities in different states/countries
// when hovering over list items in search history turn cursor into pointer
// style searched cities
// change temps to round with math floor function
