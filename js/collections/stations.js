define([
    'jquery',
    'underscore',
    'backbone',
    'models/station',
    'collections/BaseXMLCollection'
    ], function($, _, Backbone, StationModel, BaseXMLCollection){

    var StationsCollection = BaseXMLCollection.extend({
        model: StationModel,

        initialize: function(models, options) {
            this.type = options.type;
            this.xmlNodeKey = 'objStation';
            this.url = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=' + this.type;
        },

        comparator: function(model) {
            return model.get('description');
        }
    });

    return StationsCollection;
});
