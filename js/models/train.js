define([
  'backbone',
  'models/locatable'
], function(Backbone, Locatable) {

    var TrainModel = Locatable.extend({
        defaults:{
            status : "",
            date : "",

            message : "",
            direction : ""
        },

        initialize: function(attributes, options) {
            this.constructor.__super__.initialize.apply(this, arguments);
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