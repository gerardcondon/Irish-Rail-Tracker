define([
  'backbone',
  'models/locatable'
], function(Backbone, Locatable) {

    var StationModel = Locatable.extend({
        defaults: {
            description : "",
            alias : "",
            id : 0,
            type : ""
        },

        initialize: function(attributes, options) {
            this.constructor.__super__.initialize.apply(this, arguments);
        }
    }, {
        parse: function(xmlNode) {
            var attributes = Locatable.parse(xmlNode, 'Station');
            attributes.description = $(xmlNode).find('StationDesc').text();
            attributes.alias = $(xmlNode).find('StationAlias').text();
            attributes.id = $(xmlNode).find('StationId').text();
            return attributes;
        }
    });

    StationModel.constants = {};
    StationModel.constants.DART = "D";
    StationModel.constants.MAINLINE = "M";
    StationModel.constants.SUBURBAN = "S";
    StationModel.constants.ALL = "A";

    return StationModel;
});