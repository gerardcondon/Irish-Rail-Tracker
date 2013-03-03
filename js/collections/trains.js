define([
    'jquery',
    'underscore',
    'backbone',
    'models/train',
    'collections/BaseXMLCollection'
    ], function($, _, Backbone, TrainModel, BaseXMLCollection){


    var TrainsCollection = BaseXMLCollection.extend({
        model: TrainModel,

        initialize: function(models, options) {
            this.type = options.type;
            this.xmlNodeKey = 'objTrainPositions';
            this.url = 'http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML_WithTrainType?TrainType=' + this.type;
        }
    });

    return TrainsCollection;
});
