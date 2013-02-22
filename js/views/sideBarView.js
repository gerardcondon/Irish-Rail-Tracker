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
        }
    });

    return SideBarView;

});
