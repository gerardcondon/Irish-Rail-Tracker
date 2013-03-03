define([
    'jquery',
    'underscore',
    'backbone',
    'collections/stations',
    'views/stationsView',
    'views/trainsView',
    //'views/stationsListView',
    'gmaps'
    ], function($, _, Backbone, StationsCollection, StationsView, TrainsView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter();
        app_router.on('route:defaultAction', function (actions) {});

        //var stationNetwork = new StationNetwork();

        var stationsView = new StationsView();
        //var stationsListView = new StationsListView({
        //    el : '#station-list-container',
        //    stationNetwork : stationNetwork});
        var trainsView = new TrainsView();

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
