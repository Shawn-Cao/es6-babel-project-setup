fs = require('fs');

fs.readFile('./weather-widget/weather-widget.template.html', 'utf8', (error, data)=> {
  if(error) {
    console.log(error);
  }
  console.log(data);
});
