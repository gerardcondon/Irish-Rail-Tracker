define([
    'jquery',
    'underscore',
    'backbone',
    'collections/stations',
    'views/stationsView',
    'views/trainsView',
    'views/stationListView',
    'models/stationNetwork',
    'gmaps'
    ], function($, _, Backbone, StationsCollection, StationsView, TrainsView, StationListView, StationNetwork) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter();
        app_router.on('route:defaultAction', function (actions) {});

        var stationNetwork = new StationNetwork();
        //var stationNetwork = new Backbone.Model();

        var stationsView = new StationsView({
            el : '#station-map-container',
            stationNetwork : stationNetwork});
        var stationsListView = new StationListView({
            el : '#station-list-container',
            stationNetwork : stationNetwork});
        var trainsView = new TrainsView();

        stationsListView.render();

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
