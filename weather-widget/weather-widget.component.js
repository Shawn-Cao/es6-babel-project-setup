class WeatherWidgetComponent {
  constructor(city) {
    city = encodeURIComponent(city);
    let apiUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke`;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let data = this.parseData(xmlHttp.responseText);
        this.setDom(data);
      }
    };
    xmlHttp.open('GET', apiUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }
  parseData(response) {
    var data = JSON.parse(response).query.results.channel;
    return {
      img: data.item.description.substring(data.item.description.indexOf('<img'), data.item.description.indexOf('\n<BR')),
      city: data.location.city+', '+data.location.region,
      currentTemperature: data.item.condition.temp,
      currentWeather: data.item.condition.text,
      forecast: data.item.forecast
    };
  }
  setDom(data) {
    var widget = `@file:template@`;  //HTML partial as string
    document.getElementById('weather-widget').innerHTML = widget;
  }
}
