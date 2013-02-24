define([
	'backbone'
	], function(Backbone) {

	var TrainJourneyModel = Backbone.Model.extend({
		initialize: function(attributes, options) {
			this.set({
				code : options.code,
				date : options.date,
				
				origin : options.origin,
				destination : options.destination
			});
		}
	});

	return TrainJourneyModel;
});