class WeatherWidgetComponent {
  constructor(city, widgetElement) {
    this.city = city;
    this.widgetElement = widgetElement;
    let apiUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(this.city)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke`;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        let data = this.parseData(xmlHttp.responseText);
        this.setDom(data, widgetElement);
      }
    };
    xmlHttp.open('GET', apiUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }
  parseData(response) {
    var data = JSON.parse(response).query.results.channel;
    this.data = {
      img: data.item.description.substring(data.item.description.indexOf('<img'), data.item.description.indexOf('\n<BR')),
      city: data.location.city+', '+data.location.region,
      currentTemperature: data.item.condition.temp,
      currentWeather: data.item.condition.text,
      forecast: data.item.forecast
    };
    return this.data;
  }
  setDom(data, widgetElement) {
    var widget = `@file:template@`;  //HTML partial as string
    widgetElement.innerHTML = widget;
  }
}
