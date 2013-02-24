define([
	'backbone'
	], function(Backbone) {

	var StationStopTimes = Backbone.Model.extend({
		initialize: function(attributes, options) {
			this.expectedArrival = options.expectedArrival;
			this.expectedDeparture = options.expectedDeparture;

			this.scheduledArrival = options.scheduledArrival;
			this.scheduledDeparture = options.scheduledDeparture;
		},

		isArrival: function() {
            return this.expectedDeparture == '00:00';
        },

		isDeparture: function() {
            return this.expectedArrival == '00:00';
        }
	});

	return StationStopTimes;
});