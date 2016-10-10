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
    var widget = `<figure role='img' alt='weather widget - current weather and forcast'>
  <h1 data-city>${data.city}</h1>
  <section>
    <h2 data-current-temperature>${data.currentTemperature}&deg;</h2>
    <span>
      <span data-img>${data.img}</span><br />
      <span data-current-weather>${data.currentWeather}</span>
    </span>
  </section>
  <section data-forecast>
    <span class="border-right p-a-1">${data.forecast[0].day}<br />${data.forecast[0].high}&deg;/${data.forecast[0].low}&deg;</span>
    <span class="border-right p-a-1">${data.forecast[1].day}<br />${data.forecast[1].high}&deg;/${data.forecast[1].low}&deg;</span>
    <span class="border-right p-a-1">${data.forecast[2].day}<br />${data.forecast[2].high}&deg;/${data.forecast[2].low}&deg;</span>
    <span class="border-right p-a-1">${data.forecast[3].day}<br />${data.forecast[3].high}&deg;/${data.forecast[3].low}&deg;</span>
    <span class="p-a-1">${data.forecast[4].day}<br />${data.forecast[4].high}&deg;/${data.forecast[4].low}&deg;</span>
  </section>
</figure>
`;  //HTML partial as string
    widgetElement.innerHTML = widget;
  }
}
