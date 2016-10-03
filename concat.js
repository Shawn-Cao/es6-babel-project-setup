'use strict';

var fs = require('fs');
var city = "fairfax, va";

var files={
  template: './weather-widget/weather-widget.template.html',
  component: './weather-widget/weather-widget.component.js',
  style: './weather-widget/weather-widget.style.css',
  dist: 'dist/weather-widget.js'
};

fs.readFile(files.component, 'utf-8', (error, component)=> {
  if(error) {
    console.log(`error reading file: ${file.component}, error: ${error}`);
  } else {
    //insert template
    var template = fs.readFileSync(files.template, 'utf-8');
    component = component.replace('@file:template@', template);
    console.log(component);
    //TODO: insert css...
    //invoke class
    component += `new WeatherWidgetComponent("${city}") //replace with your own city`;
    fs.writeFile(files.dist, component, (err)=> {
      if(error) { console.log("error: " + err); }
      console.log('wrote concatenated script to file: ' + files.dist);
    });
  }
});

fs.readFile('./sample-client/index.html', 'utf-8', (error, data) => {
  fs.writeFile('./dist/index.html', data);
});

fs.readFile('./weather-widget/weather-widget.style.css', 'utf-8', (error, data) => {
  fs.writeFile('./dist/weather-widget.css', data);
});
