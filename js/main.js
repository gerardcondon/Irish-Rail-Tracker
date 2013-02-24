// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jquery: 'lib/jquery/jquery-min',
    bootstrap: "lib/bootstrap/bootstrap",
    underscore: 'lib/underscore/underscore-min',
    backbone: 'lib/backbone/backbone',
    moment: "lib/moment/moment",
    templates: '../templates',
    //alias to plugins
    async : 'lib/require/async',
    goog : 'lib/require/goog',
    propertyParser : 'lib/require/propertyParser'
  },
  shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      "bootstrap": {
        deps: ["jquery"],
        exports: "$.fn.popover"
      }
    }
});

// convert Google Maps into an AMD module
define('gmaps', ['async!http://maps.google.com/maps/api/js?v=3&sensor=false'],
function(){
    // return the gmaps namespace for brevity
    return window.google.maps;
});


require([
  // Load our app module and pass it to our definition function
  'app'

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
