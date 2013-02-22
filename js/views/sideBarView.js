define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/stationData',
    'collections/stationDatas'
    ], function($, _, Backbone, BootStrap, StationDataModel, StationDatasCollection){

    var SideBarView = Backbone.View.extend({

        initialize:function() {
            $(this.el).append('<p>Click on a station to view train information for that station.</p>');
        },

        load:function(stationCode) {
            $(this.el).append('<p>SidebarView load with code ' + stationCode + '</p>');
            this.collection = new StationDatasCollection({code: stationCode});
                var that = this;

            var onDataHandler = function(collection) {
                console.log('collection length = ' + collection.length);

                collection.each(function(stationData){
                    console.log('collection traincode = ' + stationData.traincode);
                    $(that.el).append('<p>Station ' + stationData.traincode + '</p>');
                });
            };
            this.collection.fetch({ success : onDataHandler});
        }
    });

    return SideBarView;
});
