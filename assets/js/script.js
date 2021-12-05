

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = $("#city").val().trim();
    var state = $("#state").val().trim();
    var country = $("#country").val().trim();
    console.log(city);
    console.log(state);
    console.log(country);

    if(city && state && country) {

        getCityWeather(city, state, country);

        //clear old content
        $("#city").val("");
        $("#state").val("");
        $("#country").val("");
    } 
    else {
        alert("please enter a valid location");
    }
};
  
var getCityWeather = function(city) {
    var apiUrl = 

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayWeather(data, city);
            })
        }
    })
}


// var displayWeather = function (weather, citySearch) {

// }


$(".city-form").on("submit", formSubmitHandler); 