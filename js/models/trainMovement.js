define([
	'underscore',
	'backbone',
	'models/trainJourney',
	'models/stationStopTimes',
	'models/trainMovementSummary'
	], function(_, Backbone, TrainJourneyModel, StationStopTimesModel, TrainMovementSummaryModel) {

	var TrainMovementModel = Backbone.Model.extend({

		initialize: function(attributes, options) {
			this.journey = new TrainJourneyModel(attributes);
			this.stopTimes = new StationStopTimesModel(attributes);
			this.summary = new TrainMovementSummaryModel(attributes, {stopTimes: this.stopTimes});
		}
	}, {
		parse: function(xmlNode) {
			var attributes = {};

            _.extend(attributes, StationStopTimesModel.parse(xmlNode));
            _.extend(attributes, TrainJourneyModel.parse(xmlNode));
            _.extend(attributes, TrainMovementSummaryModel.parse(xmlNode));

			return attributes;
		}
	});

	return TrainMovementModel;
});
