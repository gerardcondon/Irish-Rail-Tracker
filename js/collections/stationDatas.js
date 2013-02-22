define([
    'jquery',
    'underscore',
    'backbone',
    'models/stationData'
    ], function($, _, Backbone, StationDataModel){

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

    var StationDatasCollection = Backbone.Collection.extend({
        model: StationDataModel,
        parse: function(data) {

            var parsed=[];
            var xml = data.results[0];
            var xmlDoc = $.parseXML(xml);
            var $xml = $(xmlDoc);
            $xml.find('objStationData').each(function (index) {

                var params = {};
                params.traincode = $(this).find('Traincode').text();
                params.traindate = $(this).find('Traindate').text();
                
                params.origin = $(this).find('Origin').text();
                params.originTime = $(this).find('Origintime').text();

                params.destination = $(this).find('Destination').text();
                params.destinationTime = $(this).find('Destinationtime').text();

                params.status = $(this).find('Status').text();
                params.lastLocation = $(this).find('Lastlocation').text();
                params.dueIn = $(this).find('Duein').text();
                params.late = $(this).find('Late').text();

                params.expectedArrival = $(this).find('Exparrival').text();
                params.expectedDeparture = $(this).find('Expdepart').text();

                params.scheduledArrival = $(this).find('Scharrival').text();
                params.scheduledDeparture = $(this).find('Schdepart').text();

                params.direction = $(this).find('Direction').text();
                params.trainType = $(this).find('Traintype').text();
                params.locationType = $(this).find('Locationtype').text();

                parsed.push(params);
            });
          
            return parsed;
        },

        initialize: function(options) {
            this.code = options.code;
            this.url = 'http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=' + this.code;
        },

        comparator: function(model) {
            return parseInt(model.get('dueIn'), 10);
        },

        sync : function(method, model, options) {
            var that = this;
            requestCrossDomain(this.url, function(data) {
                data.type = that.type;
                options.success && options.success(that, data, options);
            });
        },

        fetch: function(options) {
            options || (options = {});
            options.dataType="jsonp";
            options.crossDomain=true;
            Backbone.Collection.prototype.fetch.call(this, options);
        }
    });

    return StationDatasCollection;
});
