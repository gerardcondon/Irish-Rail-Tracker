define([
	'underscore',
	'backbone'
	], function(_, Backbone) {

	var StationDataModel = Backbone.Model.extend({

		initialize: function( options ) {
			this.traincode = options.traincode;
			this.traindate = options.traindate;
			
			this.origin = options.origin;
			this.originTime = options.originTime;

			this.destination = options.destination;
			this.destinationTime = options.destinationTime;

			this.status = options.status;
			this.lastLocation = options.lastLocation;
			this.dueIn = options.dueIn;
			this.late = options.late;

			this.expectedArrival = options.expectedArrival;
			this.expectedDeparture = options.expectedDeparture;

			this.scheduledArrival = options.scheduledArrival;
			this.scheduledDeparture = options.scheduledDeparture;

			this.direction = options.direction;
			this.trainType = options.trainType;
			this.locationType = options.locationType;
		},

		isArrival: function() {
            return this.expectedDeparture == '00:00';
        },

		isDeparture: function() {
            return this.expectedArrival == '00:00';
        }
	});

	return StationDataModel;
});