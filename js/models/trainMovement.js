define([
	'underscore',
	'backbone'
	], function(_, Backbone) {

	var TrainMovementModel = Backbone.Model.extend({

		initialize: function( options ) {
			this.traincode = options.traincode;
			this.traindate = options.traindate;
			
			this.origin = options.origin;
			this.destination = options.destination;

			this.locationCode = options.locationCode;
			this.locationFullName = options.locationFullName;
			this.locationOrder = options.locationOrder;
			this.locationType = options.locationType;

			this.expectedArrival = options.expectedArrival;
			this.expectedDeparture = options.expectedDeparture;

			this.scheduledArrival = options.scheduledArrival;
			this.scheduledDeparture = options.scheduledDeparture;

			this.arrival = options.arrival;
			this.departure = options.departure;
			this.autoArrival = options.autoArrival;
			this.autoDepart = options.autoDepart;
			this.stopType = options.stopType;
		},

		isArrival: function() {
            return this.expectedDeparture == '00:00';
        },

		isDeparture: function() {
            return this.expectedArrival == '00:00';
        }
	});

	return TrainMovementModel;
});
