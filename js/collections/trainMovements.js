define([
    'jquery',
    'underscore',
    'backbone',
    'network/crossDomainRequest',
    'models/trainMovement'
    ], function($, _, Backbone, CrossDomainRequest, TrainMovementModel){


    var TrainsCollection = Backbone.Collection.extend({
        model: TrainMovementModel,
        parse: function(data) {

            var parsed=[];
            var xml = data.results[0];
            var xmlDoc = $.parseXML(xml);
            var $xml = $(xmlDoc);
            $xml.find('objTrainMovements').each(function (index) {

                var params = {};

				params.traincode = $(this).find('TrainCode').text();
				params.traindate = $(this).find('TrainDate').text();
			
				params.origin = $(this).find('TrainOrigin').text();
				params.destination = $(this).find('TrainDestination').text();

				params.locationCode = $(this).find('LocationCode').text();
				params.locationFullName = $(this).find('LocationFullName').text();
				params.locationOrder = $(this).find('LocationOrder').text();
				params.locationType = $(this).find('LocationType').text();

				params.expectedArrival = $(this).find('ExpectedArrival').text();
				params.expectedDeparture = $(this).find('ExpectedDeparture').text();

				params.scheduledArrival = $(this).find('ScheduledArrival').text();
				params.scheduledDeparture = $(this).find('ScheduledDeparture').text();

				params.arrival = $(this).find('Arrival').text();
				params.departure = $(this).find('Departure').text();
				params.autoArrival = $(this).find('AutoArrival').text();
				params.autoDepart = $(this).find('AutoDepart').text();
				params.stopType = $(this).find('StopType').text();

                parsed.push(params);
            });
          
            return parsed;
        },

        initialize: function(models, options) {
            this.code = options.code;
            this.date = options.date.split(' ').join('_');
            this.url = 'http://api.irishrail.ie/realtime/realtime.asmx/getTrainMovementsXML?TrainId=' + this.code + '&TrainDate=' + this.date;
            console.log(this.url);
        },

        comparator: function(model) {
            return parseInt(model.get('LocationOrder'), 10);
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
