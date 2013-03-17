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
    }, {
        parse: function(xmlNode) {
            var attributes = Locatable.parse(xmlNode, 'Train');
            attributes.status = $(xmlNode).find('TrainStatus').text();
            attributes.date = $(xmlNode).find('TrainDate').text();
            attributes.message = $(xmlNode).find('PublicMessage').text().replace(/\\n/g, '\n');
            attributes.direction = $(xmlNode).find('Direction').text();
            return attributes;
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