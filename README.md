# es6-babel-project-setup
This is a demo project to use plain ES6 syntax with use Babel library to transpile source code into ES5 compatible format for browser compatilibity.

I added minimum build steps using plain npm as the build tool

to build: 'npm install && npm run build'

to start a dev server: use "npm start"

live demo at https://www.shawn-cao.com/es6-babel-project-setup/dist/

## Two ES6 features used here:

1. [Template Literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals): can replace ${} notations in template strings with object values without a web framework. Used in weather-widget/weather-widget.template.html after converting it into JavaScript string.
2. [Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes): simplified syntax to create existing JavaScript constructor functions. Class is instantiated in sample-client/index.html by passing API parameters and widget element to WeatherWidgetComponent constuctor.

Even thouth both are syntatical sugar but they help minimize coding effort while making source code more readable.

### Pending update
Current concat.js in build step is not scallable, could use a tool to facilitate import and export features in ES6.
