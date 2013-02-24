define([
	'backbone'
	], function(Backbone) {

	var TrainStatus = Backbone.Model.extend({
		initialize: function(attributes, options) {
			this.set({
				status : options.status,
				lastLocation : options.lastLocation,
				dueIn : options.dueIn,
				late : options.late
			});
		}
	});

	return TrainStatus;
});