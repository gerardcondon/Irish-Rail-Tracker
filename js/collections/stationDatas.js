define([
    'jquery',
    'underscore',
    'backbone',
    'models/stationData',
    'collections/BaseXMLCollection'
    ], function($, _, Backbone, StationDataModel, BaseXMLCollection){

    var StationDatasCollection = BaseXMLCollection.extend({
        model: StationDataModel,

        initialize: function(models, options) {
            this.code = options.code;
            this.xmlNodeKey = 'objStationData';
            this.url = 'http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=' + this.code;
        },

        comparator: function(model) {
            return parseInt(model.get('dueIn'), 10);
        }
    });

    return StationDatasCollection;
});
