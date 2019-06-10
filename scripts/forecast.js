class Forecast {
  constructor(){
    this.key = '4TU9lobSYp9fL7cv5VZV7ADfMYBt9AYY';
    this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    this.city5DayURI = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  }
  async updateCity(city){
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);
    const weather5Day = await this.get5dayWeather(cityDets.Key);
    return { cityDets, weather, weather5Day };
  }
  async getWeather(id){ // id = city Key number
    const query = `${id}?apikey=${this.key}`; // ?apikey=${api key parameter(account key)}
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }
  async getCity(city){
    const query = `?apikey=${this.key}&q=${city}&details=true`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0]; 
  }

  async get5dayWeather(id){
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.city5DayURI + query);
    const data = await response.json();
    return data.DailyForecasts;

  }
}