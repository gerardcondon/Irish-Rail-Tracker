define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/stationData',
    'collections/stationDatas'
    ], function($, _, Backbone, BootStrap, StationDataModel, StationDatasCollection){

    var StationDataView = Backbone.View.extend({

        tagName:'li',
        template:  _.template($('#station-data-template').html()),
        arrivingTemplate: _.template($('#station-data-arriving-template').html()),
        departingTemplate: _.template($('#station-data-departing-template').html()),

        initialize:function(options) {
            this.model = options.stationData;
        },

        render:function() {
            var template = this.template;
            if (this.model.isArrival()) {
                template = this.arrivingTemplate;
            }
            if (this.model.isDeparture()) {
                template = this.departingTemplate;
            }

            this.$el.html(template({
                destination : this.model.destination,
                origin : this.model.origin,
                expectedArrival : this.model.expectedArrival,

                originTime : this.model.originTime,
                destinationTime : this.model.destinationTime,

                status : this.model.status,
                lastLocation : this.model.lastLocation,
                dueIn : this.model.dueIn,
                late : this.model.late,
                expectedDeparture : this.model.expectedDeparture,

                scheduledArrival : this.model.scheduledArrival,
                scheduledDeparture : this.model.scheduledDeparture,

                direction : this.model.direction,
                trainType : this.model.trainType,
                locationType : this.model.locationType

            }));
            return this;
        }
    });

    return StationDataView;
});
