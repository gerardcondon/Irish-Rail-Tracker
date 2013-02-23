define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/stationData',
    'collections/stationDatas',
    'views/stationDataView'
    ], function($, _, Backbone, BootStrap, StationDataModel, StationDatasCollection, StationDataView){

    var SideBarView = Backbone.View.extend({

        initialize:function() {
            $(this.el).append('<p>Click on a station to view train information for that station.</p>');
        },

        load:function(station) {
            var $ul = $('<ul class="stationDataList"></ul>');
            this.collection = new StationDatasCollection({code: station.code});
            var that = this;
            $(that.el).empty();
            $(that.el).append("<strong>Timetable Information for " + station.description + "</strong>");

            var onDataHandler = function(collection) {
                if (collection.length === 0) {
                    $(that.el).append("<hr>No trains stopping in the next 90 mins");
                } else {
                    collection.each(function(stationData){
                        console.log("Processing " + JSON.stringify(stationData));
                        var stationDataView = new StationDataView({stationData: stationData});
                        $ul.append(stationDataView.render().el);
                        $(that.el).append($ul);
                    });
                }
            };
            this.collection.fetch({ success : onDataHandler});
        }
    });

    return SideBarView;
});
