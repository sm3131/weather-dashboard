# Weather Dashboard

# Description

The weather dashboard app was created to provide users a convenient way to search for weather in their cities or other cities of interest. This app allows users to search cities by their city name, city and state, city and country, or city, state, and country. After submitting their search the user is presented with both current weather data as well as the five day weather forecast. The data provided includes, current temps, high temps, low temps, wind speed, humidity, and UV index. It also provides weather icons to visually show the current and forecasted weather conditions (i.e. sunny, cloudy, rain, snow, etc.). 

# Table of Contents
- [Built With](#built-with)
- [Code Access](#code-access)
- [Preview](#preview)
- [Functionality](#functionality)
- [Password Generator Link](#password-generator-link)
- [Credit / Contribution](#credit--contribution)

# Built With
- HTML
- CSS 
- Bootstrap
- Javascript
- JQuery
- Moment.js

# Code Access

If you would like to access the code for this project, please visit this [GitHub](https://github.com/sm3131/weather-dashboard) repository. 

# Preview

Below is a screenshot of the Weather Dashboard Application
![Weather Dashboard](assets/images/

# Functionality

This weather app is likely similar to other weather apps you have encountered online or on mobile devices. This app has various functions and provides a detailed overview of current and future weather stats.
The app's functionality and features are described in further detail below:
- Once you have opened the application you are presented with several empty text fields that you can input information
- The first text field requests the city you are interested in searching
- The second text field requests the state where that city is located
- The third text field requests the country where the city is located
- The search function is fairly robust and will typically return US cities without entering the state and country, but if you are looking for a city that is also found in other states you will want to specify the state in this case
- The country field is more useful for searching international cities
- After entering all of the input city search information, you will click the search button to then get your weather data
- Once the data has been fetched and is returned, there will be two main displays on the page one for the current weather and another section for the five day forecast
- The current weather contains the current temperature, the daily high temp, the daily low temp, the wind speed, humidity, and the UV index
- The five day forecast provides weather data for the upcoming five days which includes the high temp, low temp, wind speed, and humidity
- There are also icons provided next to or underneath the date for that day to indicate the weather conditions (i.e. sunny, cloudy, rain, snow, etc.)
- The app also stores all recent searches up to 8 at a time on the page under the search input fields
- Once you exceed 8 searches your oldest search will disappear and be replaced by the most recent search
- You can also click on any of the search history cities and it will again display that cities weather data on the screen
- Lastly if you close or refresh the page any of your stored search history cities will persist and reappear when the page reopens or refreshes

# Weather Dashboard Link

The link to the weather dashboard app is provided below:
https://sm3131.github.io/weather-dashboard/

# Credit / Contribution

No starter code was provided for this project, meaning all of the code was written and created by myself from scratch to develop this app. The design and formatting was accomplished by using HTML, CSS, and bootstrap, while the functionality and interactivity was created by Javascript and JQuery. This app requests data from a third-party API called OpenWeather Map, and more specifically it is the one call API within that website. To access the api follow this [OpenWeather](https://openweathermap.org/api/one-call-api#example) link.
