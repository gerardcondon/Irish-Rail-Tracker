define([
	'underscore',
	'backbone',
	'models/trainJourney',
	'models/stationStopTimes',
	'models/trainMovementSummary'
	], function(_, Backbone, TrainJourneyModel, StationStopTimes, TrainMovementSummaryModel) {

	var TrainMovementModel = Backbone.Model.extend({

		initialize: function(attributes, options) {
			this.journey = new TrainJourneyModel([], attributes);
			this.stopTimes = new StationStopTimes([], attributes);
			this.summary = new TrainMovementSummaryModel([], attributes);
		}
	});

	return TrainMovementModel;
});
