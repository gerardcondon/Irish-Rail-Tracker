define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap'
    ], function($, _, Backbone, BootStrap){

    var TrainsView = Backbone.View.extend({

        initialize:function() {
            this.stationNetwork = options.stationNetwork;
        },

        render: function(){
        }
    });

    return TrainsView;

});
