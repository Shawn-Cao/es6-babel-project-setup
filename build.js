fs = require('fs');

var dist = './dist/weather-widget.html';
fs.writeFile(dist, '<!-- weather widget -->\n');
fs.readFile('./weather-widget.template.html', 'utf8', (error, data)=> {
  if(error) { console.log("error: " + error); }
  fs.appendFile(dist, data);
});

console.log('wrote to file: ' + dist);
