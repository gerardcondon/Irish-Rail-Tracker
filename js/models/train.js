define([
  'underscore',
  'backbone'
], function(_, Backbone) {

    var TrainModel = Backbone.Model.extend({
        initialize: function( options ) {
            // TODO Extract these from here and station into a base class
            this.latitude = options.latitude;
            this.longitude = options.longitude;
            this.code = options.code;

            this.status = options.status;
            this.date = options.date;

            this.message = options.message;
            this.direction = options.direction;
        }
    });

    // TODO Move to a common location
    TrainModel.constants = {};
    TrainModel.constants.DART = "D";
    TrainModel.constants.MAINLINE = "M";
    TrainModel.constants.SUBURBAN = "S";
    TrainModel.constants.ALL = "A";

    return TrainModel;
});