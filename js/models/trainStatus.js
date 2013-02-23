define([
	'backbone'
	], function(Backbone) {

	var TrainStatus = Backbone.Model.extend({
		initialize: function(options) {
			this.status = options.status;
			this.lastLocation = options.lastLocation;
			this.dueIn = options.dueIn;
			this.late = options.late;
		}
	});

	return TrainStatus;
});