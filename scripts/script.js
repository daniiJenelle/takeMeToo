app = {}

// function to render list of possible city name matches based on user input defined here
app.cityMenu = function () {
  $(`form`).on(`submit`, function (e) {
    e.preventDefault();
    const cityName = ($(`:text`).val());

    app.findCityAPICall(cityName);

  });
};

app.getCityInfo = function (cityName) {
  return $.ajax({
    url: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php`,
    method: 'GET',
    dataType: 'json',
    headers: {
      "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
      "x-rapidapi-key": "9e16543852msh061f067cf4ff492p109400jsn392cd80914f3"
    },
    data: {
      location: cityName
    }
  });
};

app.findCityAPICall = async function (cityName) {
  // this will return an array of cities which matches the user input
  const cityInfo = await app.getCityInfo(cityName);

  // renders all cities that matches user input to the DOM
  cityInfo.Results.forEach((city) => {
    const liHTML = `<li>${city.name}</li>`

    $('.cityOptions').append(liHTML);
  })

  // listening for which matched city the user clicks on
  $('.cityOptions').on('click', 'li', function () {
    const chosenCity = cityInfo.Results.filter((city) => {
      return city.name === $(this).text();
    })

    const countryCode = chosenCity[0].c;
    const latitude = chosenCity[0].lat;
    const longitude = chosenCity[0].lon;
    const placeName = chosenCity[0].name;
  })
};

app.dashboardAPICalls = async function () {

}

app.init = function () {
  app.cityMenu();
};

$(function () {
  app.init()


});