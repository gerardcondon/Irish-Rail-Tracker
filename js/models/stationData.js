define([
	'underscore',
	'backbone',
	'models/trainJourney',
	'models/stationStopTimes',
	'models/trainStatus'
	], function(_, Backbone, TrainJourneyModel, StationStopTimes, TrainStatus) {

	var StationDataModel = Backbone.Model.extend({

		initialize: function(attributes, options) {
			this.journey = new TrainJourneyModel(options);
			this.stopTimes = new StationStopTimes(options);
			this.trainStatus = new TrainStatus(options);

			this.originTime = options.originTime;
			this.destinationTime = options.destinationTime;

			this.direction = options.direction;
			this.trainType = options.trainType;
			this.locationType = options.locationType;
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