class WeatherWidgetComponent {
  constructor() {
    this.city = "McLean, VA"; //TODO: pass it in

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) setData(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }
  setData(response) {
    let data = response.data;
    this.currentTemperature = data;
  }
}
