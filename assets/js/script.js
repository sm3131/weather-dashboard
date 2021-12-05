

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = $("#city-name").val().trim();
    console.log(cityName);

    
    $(".current-city").text(cityName);


}

$(".city-form").on("submit", formSubmitHandler); 