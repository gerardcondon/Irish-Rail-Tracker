define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/trainData',
    'collections/trainDatas',
    'views/trainDataView'
    ], function($, _, Backbone, BootStrap, TrainDataModel, TrainDatasCollection, TrainDataView){

    var SideBarView = Backbone.View.extend({

        initialize:function() {
            $(this.el).append('<p>Click on a train to view train information for that train.</p>');
        },

        load:function(train) {
            var $ul = $('<ul class="trainDataList"></ul>');
            this.collection = new TrainDatasCollection({code: train.code});
            var that = this;
            $(that.el).empty();
            $(that.el).append("<strong>Timetable Information for " + train.description + "</strong>");

            var onDataHandler = function(collection) {
                collection.each(function(trainData){
                    console.log("Processing " + JSON.stringify(trainData));
                    var trainDataView = new TrainDataView({stationData: stationData});
                    $ul.append(stationDataView.render().el);
                    $(that.el).append($ul);
                });
            };
            this.collection.fetch({ success : onDataHandler});
        }
    });

    return SideBarView;
});
