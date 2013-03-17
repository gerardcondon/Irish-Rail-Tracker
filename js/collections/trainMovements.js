define([
    'jquery',
    'underscore',
    'backbone',
    'models/trainMovement',
    'collections/BaseXMLCollection'
    ], function($, _, Backbone, TrainMovementModel, BaseXMLCollection){


    var TrainsCollection = BaseXMLCollection.extend({
        model: TrainMovementModel,

        initialize: function(models, options) {
            this.code = options.code;
            this.date = options.date.split(' ').join('_');
            this.xmlNodeKey = 'objTrainMovements';
            this.url = 'http://api.irishrail.ie/realtime/realtime.asmx/getTrainMovementsXML?TrainId=' + this.code + '&TrainDate=' + this.date;
        },

        comparator: function(model) {
            return parseInt(model.get('LocationOrder'), 10);
        }
    });

    return TrainsCollection;
});
