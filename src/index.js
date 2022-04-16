function formatTime(time) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[time.getDay()];
    let hour = time.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let currentTime = `${day} ${hour}:${minutes}`;
    return currentTime;
  }
  let presentTime = new Date();
  let formattedTime = document.querySelector("#current-date");
  formattedTime.innerHTML = formatTime(presentTime);
  
  function formatYear(year) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  
    let month = months[year.getMonth()];
    let day = year.getDate();
    let thisYear = year.getFullYear();
  
    let currentYear = `${day} ${month} ${thisYear}`;
    return currentYear;
  }
  
  let presentYear = new Date();
  let formattedYear = document.querySelector("#current-year");
  formattedYear.innerHTML = formatYear(presentYear);
  
  function switchCelcius(event) {
    event.preventDefault();
    let temperature = document.querySelector("#main-temperature");
    temperature.innerHTML = "30";
  }
  
  function switchFarenheit(event) {
    event.preventDefault();
    let temperature = document.querySelector("#main-temperature");
    temperature.innerHTML = "60";
  }
  
  let clickForCelcius = document.querySelector("#celcius");
  clickForCelcius.addEventListener("click", switchCelcius);
  
  let clickForFarenheit = document.querySelector("#farenheit");
  clickForFarenheit.addEventListener("click", switchFarenheit);
  
  function search(city) {
    //searchCityEngine(city)
    let apiKey = "77336acba4ef2689d8ec5c5a1aa8c796";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    //https://api.openweathermap.org/data/2.5/weather?q=Perth&appid=77336acba4ef2689d8ec5c5a1aa8c796&units=metric
    axios.get(apiUrl).then(showTemperature);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-bar");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = cityInput.value;
    let city = cityInput.value;
    search(city);
  }
  
  function showTemperature(response) {
    let currentTemperature = Math.round(response.data.main.temp);
    let currentCity = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = currentCity;
    let temperature = document.querySelector("#main-temperature");
    temperature.innerHTML = currentTemperature;
    let sky = document.querySelector("#sky");
    let skyCondition = response.data.weather[0].description;
    sky.innerHTML = skyCondition;
    let humidity = document.querySelector("#humidity");
    let humidityCondition = response.data.main.humidity;
    humidity.innerHTML = `${humidityCondition}%`;
    let wind = document.querySelector("#wind");
    let windSpeed = Math.round(response.data.wind.speed);
    wind.innerHTML = `${windSpeed}km/h`;
    let rain = document.querySelector("#rain");
    rain.innerHTML =
      response.data.rain && response.data.rain["1h"]
        ? response.data.rain["1h"]
        : "0%";
    let feel = document.querySelector("#feel");
    let feelCondition = Math.round(response.data.main.feels_like);
    feel.innerHTML = `${feelCondition}%`;
    let high = document.querySelector("#high");
    let highTemp = Math.round(response.data.main.temp_max);
    high.innerHTML = `${highTemp}%`;
    let low = document.querySelector("#low");
    let lowTemp = Math.round(response.data.main.temp_min);
    low.innerHTML = `${lowTemp}%`;
    //search city and display
    let temperatureSource = Math.round(response.data.main.temp);
    let cityTemperature = document.querySelector("#main-temperature");
    cityTemperature.innerHTML = `${temperatureSource}°C`;
  }
  
  function getLocation(position) {
    //console.log(position.coords.latitude);
    //console.log(position.coords.longitude);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let unit = "metric";
    let apiKey = "afcc39ddd6555af048cc779c19fc2bad";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
    //console.log(apiUrl);
    axios.get(apiUrl).then(showTemperature); //3
  }
  
  function showLocationTemp(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getLocation);
  } //2
  
  let button = document.querySelector("#location-button");
  button.addEventListener("click", showLocationTemp); //1
  
  let form = document.querySelector("#form-search-bar");
  form.addEventListener("submit", handleSubmit);
  
  search("Perth");