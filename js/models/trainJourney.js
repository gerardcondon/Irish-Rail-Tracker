define([
	'backbone'
	], function(Backbone) {

	var TrainJourneyModel = Backbone.Model.extend({
		initialize: function(options) {
			this.code = options.code;
			this.date = options.date;
			
			this.origin = options.origin;
			this.destination = options.destination;
		}
	});

	return TrainJourneyModel;
});