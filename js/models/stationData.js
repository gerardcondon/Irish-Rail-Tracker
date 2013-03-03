define([
	'underscore',
	'backbone',
	'models/trainJourney',
	'models/stationStopTimes',
	'models/trainStatus'
	], function(_, Backbone, TrainJourneyModel, StationStopTimesModel, TrainStatusModel) {

	var StationDataModel = Backbone.Model.extend({

		initialize: function(attributes, options) {
			this.journey = new TrainJourneyModel(attributes, options);
			this.stopTimes = new StationStopTimesModel(attributes, options);
			this.trainStatus = new TrainStatusModel(attributes, options);
		},

		isArrival: function() {
            return this.stopTimes.isArrival();
        },

		isDeparture: function() {
            return this.stopTimes.isDeparture();
        }
	}, {
		parse : function(xmlNode) {
			var attributes = {};

            _.extend(attributes, StationStopTimesModel.parse(xmlNode));
            _.extend(attributes, TrainJourneyModel.parse(xmlNode));
            _.extend(attributes, TrainStatusModel.parse(xmlNode));

            attributes.originTime = $(xmlNode).find('Origintime').text();
            attributes.destinationTime = $(xmlNode).find('Destinationtime').text();

            attributes.direction = $(xmlNode).find('Direction').text();
            attributes.trainType = $(xmlNode).find('Traintype').text();
            attributes.locationType = $(xmlNode).find('Locationtype').text();

			return attributes;
		}
	});

	return StationDataModel;
});