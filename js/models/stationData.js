define([
	'underscore',
	'backbone',
	'models/trainJourney',
	'models/stationStopTimes',
	'models/trainStatus'
	], function(_, Backbone, TrainJourneyModel, StationStopTimes, TrainStatus) {

	var StationDataModel = Backbone.Model.extend({

		initialize: function(attributes, options) {
			this.journey = new TrainJourneyModel([], attributes);
			this.stopTimes = new StationStopTimes([], attributes);
			this.trainStatus = new TrainStatus([], attributes);
		},

		isArrival: function() {
            return this.stopTimes.isArrival();
        },

		isDeparture: function() {
            return this.stopTimes.isDeparture();
        }
	});

	return StationDataModel;
});