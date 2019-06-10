const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const fiveWeather = document.querySelector(".five-weather");
const forecast = new Forecast();


const updateUI = (data) => {
  // destructure properties

  const {cityDets, weather, weather5Day} = data;
  // this is same as ...
              // cityDets = data.cityDets
              // weather = data.weather
              // weather5Day = data.weather5Day
  console.log(weather);
  console.log(weather5Day);

  
  // update details template
  details.innerHTML = `
      <h1 class="my-3">${cityDets.EnglishName}</h1>
      <div class="my-3 text-25">${weather.WeatherText}</div>
      <div class="display-3 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
    
  `;

  // update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  
  const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc);

  fiveWeather.innerHTML = " ";

  const weather4day = weather5Day.slice(1,5);
  console.log(weather4day);

  weather4day.forEach( e => {
    const weatherIcon = `img/icons/${e.Day.Icon}.svg`;
    let d = new Date(e.Date);

    var weekday = new Array(7);
    weekday[0] =  "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    var n = weekday[d.getDay()];

    const fiveDayHTML = `
    <div class="card">
    <img src=${weatherIcon} class="card-img-top" alt="...">
    <div class="card-body day">
   
    <h1 class="text-center">${d.getMonth()+1}/${d.getDate()} (${n})</h1>
    <h2 class="hot" style="text-align:left;float:left;">${FtoC(e.Temperature.Maximum.Value)}&deg;C</h2> 
    <h2 class="cold" style="text-align:right;float:right;">${FtoC(e.Temperature.Minimum.Value)}&deg;C</h2> 
    

    </div>`;

    fiveWeather.innerHTML += fiveDayHTML;

    

    console.log(e.Date,d);
    console.log(d.getDate());
    console.log(d.getMonth());
  //1560060000000



  } );

  




  // remove the d-none class if present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
};

const FtoC = ( F => Math.round((F -32) * 5 /9));


cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();
  
  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local storage
  localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
  forecast.updateCity(localStorage.getItem('city')) 
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}