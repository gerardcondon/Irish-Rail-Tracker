define([
    'jquery',
    'underscore',
    'backbone',
    'collections/stations',
    'views/stationsView',
    'views/trainsView',
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

        var stationsView = new StationsView();
        var trainsView = new TrainsView();

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
