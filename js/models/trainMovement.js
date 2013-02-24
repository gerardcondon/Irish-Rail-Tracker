define([
	'underscore',
	'backbone',
	'models/trainJourney',
	'models/stationStopTimes',
	'models/trainMovementSummary'
	], function(_, Backbone, TrainJourneyModel, StationStopTimes, TrainMovementSummaryModel) {

	var TrainMovementModel = Backbone.Model.extend({

		initialize: function( options ) {
			this.journey = new TrainJourneyModel([], options);
			this.stopTimes = new StationStopTimes([], options);

			this.locationCode = options.locationCode;
			this.locationFullName = options.locationFullName;
			this.locationOrder = options.locationOrder;
			this.locationType = options.locationType;

			this.arrival = options.arrival;
			this.departure = options.departure;
			this.autoArrival = options.autoArrival;
			this.autoDepart = options.autoDepart;
			this.stopType = options.stopType;

			this.summary = new TrainMovementSummaryModel([], options);
		}
	});

	return TrainMovementModel;
});
