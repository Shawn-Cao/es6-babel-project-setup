'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeatherWidgetComponent = function () {
  function WeatherWidgetComponent(city) {
    var _this = this;

    _classCallCheck(this, WeatherWidgetComponent);

    city = encodeURIComponent(city);
    var apiUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var data = _this.parseData(xmlHttp.responseText);
        _this.setDom(data);
      }
    };
    xmlHttp.open('GET', apiUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  _createClass(WeatherWidgetComponent, [{
    key: 'parseData',
    value: function parseData(response) {
      var data = JSON.parse(response).query.results.channel;
      return {
        img: data.item.description.substring(data.item.description.indexOf('<img'), data.item.description.indexOf('\n<BR')),
        city: data.location.city + ', ' + data.location.region,
        currentTemperature: data.item.condition.temp,
        currentWeather: data.item.condition.text,
        forecast: data.item.forecast
      };
    }
  }, {
    key: 'setDom',
    value: function setDom(data) {
      var widget = '<figure role=\'img\' alt=\'weather widget - current weather and forcast\'>\n  <h1 data-city>' + data.city + '</h1>\n  <section>\n    <h2 data-current-temperature>' + data.currentTemperature + '&deg;</h2>\n    <span>\n      <span data-img>' + data.img + '</span><br />\n      <span data-current-weather>' + data.currentWeather + '</span>\n    </span>\n  </section>\n  <section data-forecast>\n    <span class="border-right p-a-1">' + data.forecast[0].day + '<br />' + data.forecast[0].high + '&deg;/' + data.forecast[0].low + '&deg;</span>\n    <span class="border-right p-a-1">' + data.forecast[1].day + '<br />' + data.forecast[1].high + '&deg;/' + data.forecast[1].low + '&deg;</span>\n    <span class="border-right p-a-1">' + data.forecast[2].day + '<br />' + data.forecast[2].high + '&deg;/' + data.forecast[2].low + '&deg;</span>\n    <span class="border-right p-a-1">' + data.forecast[3].day + '<br />' + data.forecast[3].high + '&deg;/' + data.forecast[3].low + '&deg;</span>\n    <span class="p-a-1">' + data.forecast[4].day + '<br />' + data.forecast[4].high + '&deg;/' + data.forecast[4].low + '&deg;</span>\n  </section>\n</figure>\n'; //HTML partial as string
      document.getElementById('weather-widget').innerHTML = widget;
    }
  }]);

  return WeatherWidgetComponent;
}();

new WeatherWidgetComponent("fairfax, va"); //replace with your own city
