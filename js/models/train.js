define([
  'backbone',
  'models/locatable'
], function(Backbone, Locatable) {

    var TrainModel = Locatable.extend({
        initialize: function( options ) {
            this.constructor.__super__.initialize.apply(this, arguments);

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