define([
  'jquery',
  'underscore',
  'backbone',
  'models/station'
], function($, _, Backbone, StationModel){

  // Accepts a url and a callback function to run.
  var requestCrossDomain = function(site, callback) {
        // If no url was passed, exit.
      if (!site) {
          alert('No site was passed.');
          return false;
      }
   
      // Take the provided url, and add it to a YQL query. Make sure you encode it!
      var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=xml&callback=?';
   
      // Request that YSQL string, and run a callback function.
      // Pass a defined function to prevent cache-busting.
      $.getJSON(yql, cbFunc);
   
      function cbFunc(data) {
          // If we have something to work with...
          if (data.results[0]) {
              if (typeof callback === 'function') {
                  callback(data);
              }
          }
          // Else, Maybe we requested a site that doesn't exist, and nothing returned.
          else throw new Error('Nothing returned from getJSON.');
      }
  };

  var StationsCollection = Backbone.Collection.extend({
    model: StationModel,
    parse: function(data) {

      //console.log('parse entry data: ' + JSON.stringify(data));
      var parsed=[];
      var xml = data.results[0];
      var xmlDoc = $.parseXML(xml);
      var $xml = $(xmlDoc);
      $xml.find('objStation').each(function (index) {
        //console.log("Processing " + this);

        var params = {};
        params.description = $(this).find('StationDesc').text();
        params.alias = $(this).find('StationAlias').text();
        params.latitude = $(this).find('StationLatitude').text();
        params.longitude = $(this).find('StationLongitude').text();
        params.code = $(this).find('StationCode').text();
        params.id = $(this).find('StationId').text();
        params.type = data.type;

        //console.log('params.description = ' + params.description);
        parsed.push(params);
        //console.log('parsed[' + index + '] = ' + JSON.stringify(parsed[index]));
      });
      
      
      //console.log('parsed stations: ' + parsed);
      parsed.type = data.type;
      return parsed;
    },

    initialize: function(options) {
      this.type = options.type;
      this.url = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=' + this.type;
    },

    sync : function(method, model, options) {
      console.log("sync entry");
      var that = this;
      requestCrossDomain(this.url, 
        function(data) {
          console.log('rcd callback');
          data.type = that.type;
          options.success && options.success(data);
        });
      console.log("sync exit");
    },

    fetch: function(options) {
        options || (options = {});
        options.dataType="jsonp";
        options.crossDomain=true;
        Backbone.Collection.prototype.fetch.call(this, options);
    }

  });
 
  return StationsCollection;
});
