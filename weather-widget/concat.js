fs = require('fs');

var dist = 'dist/weather-widget.html';
fs.writeFile(dist, '<!-- weather widget -->\n');

var files = [
  'weather-widget.template.html',
  'weather-widget.css',
  'weather-widget.script.js'
];

files.forEach((file) => {
  fs.readFile(file, 'utf8', (error, data)=> {
    if(error) {
      console.log(`error reading file: ${file}, error: ${error}`);
    } else {
      if (file.endsWith('.css')) {
        data = '<style>'+data+"</style>";
      } else if (file.endsWith('.js')) {
        data = '<script>'+data+"</script>";
      }
      fs.appendFile(dist, data, (error)=> {
        if(error) { console.log("error: " + error); }
      });
    }
  });
});


console.log('wrote to file: ' + dist);
