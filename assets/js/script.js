var marsApiKey = "GrZ5XxlNbYcBVTrWcEVaRSagQlzo9TgtCbACgo64";
var photoOneEl = document.querySelector("#photoOne");
var photoTwoEl = document.querySelector("#photoTwo");
var today = [];
var todayWeather = [];
var search = document.querySelector("#location");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var lat = ' ';
var lon = ' ';

// TBD 
// add another camera/API to the other photo
// photo sizing hmmm...
// check to make sure the array exists function - if it doesn't run getMarsPhotos again
// figure out what image should be displayed on landing on the page - if any


// call Mars Photo API
var getMarsPhotos = function(sol) {
    var sol = 10 + Math.floor(Math.random() * (1000 - 10 + 1)); 
    var marsApiUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + sol + "&api_key=" + marsApiKey;

    fetch(marsApiUrl).then(function (responseMarsPhoto) {
        responseMarsPhoto.json().then(function (photoData) {
            displayMarsPhotos(photoData);
        })
    })
};

// display Mars photo on the page 
var displayMarsPhotos = function(photoData) {
    console.log(photoData);
    console.log(photoOneEl);

    // clear old content - so that with each run of the application new images are generated
    photoOneEl.src = "";
    photoTwoEl.src = "";
    console.log(photoOneEl);

    var randomNumber = Math.floor(Math.random() * photoData.photos.length);
    var randomNumberTwo = Math.floor(Math.random() * photoData.photos.length);
    console.log(randomNumber);

    var photoOne = photoData.photos[randomNumber].img_src;
    photoOneEl.src = photoOne;

    var photoTwo = photoData.photos[randomNumberTwo].img_src;
    photoTwoEl.src = photoTwo;
};


function place() {
    var cityName = document.querySelector("#search").value;

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=6d5ccf5473302b19f719a739ab7ff1c2")
        .then(r => r.json())
        .then(function (json) {
            where = json
            lat = where.city.coord.lat
            lon = where.city.coord.lon
            earthWeather()
        })
}
function earthWeather() {
    fetch("https://api.weather.gov/points/" + lat + ',' + lon)

        .then(r => r.json())
        .then(function (json) {
            today = json
            console.log(today)
            fetch(today.properties.forecast)

                .then(r => r.json())
                .then(function (json) {
                    todayWeather = json
                    console.log(todayWeather)
                    EarthCurrentWeather()
                    getMarsPhotos();
                })
        })

}

function EarthCurrentWeather() {
    temp.innerText = "temp:" + " " + todayWeather.properties.periods[0].temperature + "°F"
    wind.innerText = "wind speed:" + " " + todayWeather.properties.periods[0].windSpeed
}

search.onclick = place;