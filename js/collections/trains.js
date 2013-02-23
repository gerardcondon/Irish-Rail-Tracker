define([
    'jquery',
    'underscore',
    'backbone',
    'network/crossDomainRequest',
    'models/train'
    ], function($, _, Backbone, CrossDomainRequest, TrainModel){


    var TrainsCollection = Backbone.Collection.extend({
        model: TrainModel,
        parse: function(data) {

            var parsed=[];
            var xml = data.results[0];
            var xmlDoc = $.parseXML(xml);
            var $xml = $(xmlDoc);
            $xml.find('objTrainPositions').each(function (index) {

                var params = {};
                params.latitude = $(this).find('TrainLatitude').text();
                params.longitude = $(this).find('TrainLongitude').text();
                params.code = $(this).find('TrainCode').text();

                params.status = $(this).find('TrainStatus').text();
                params.date = $(this).find('TrainDate').text();
                params.message = $(this).find('PublicMessage').text();
                params.direction = $(this).find('Direction').text();

                parsed.push(params);
            });
          
            console.log("Parsed " + parsed.length + " trains");
            return parsed;
        },

        initialize: function(options) {
            this.type = options.type;
            this.url = 'http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML_WithTrainType?TrainType=' + this.type;
        },

        sync : function(method, model, options) {
            var that = this;
            CrossDomainRequest.exec(this.url, function(data) {
                data.type = that.type;
                options.success && options.success(that, data, options);
            });
        }
    });

    return TrainsCollection;
});
