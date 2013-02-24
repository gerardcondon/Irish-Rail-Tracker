define([
	'backbone'
	], function(Backbone) {

	var StationStopTimes = Backbone.Model.extend({
		initialize: function(attributes, options) {
			this.set({
                expectedArrival : options.expectedArrival,
                expectedDeparture : options.expectedDeparture,

                scheduledArrival : options.scheduledArrival,
                scheduledDeparture : options.scheduledDeparture
            });
		},

		isArrival: function() {
            return this.get('expectedDeparture') == '00:00';
        },

		isDeparture: function() {
            return this.get('expectedArrival') == '00:00';
        }
	});

	return StationStopTimes;
});