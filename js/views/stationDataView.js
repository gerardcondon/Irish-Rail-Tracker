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
                destination : this.model.journey.destination,
                origin : this.model.journey.origin,
                expectedArrival : this.model.stopTimes.expectedArrival,
                expectedDeparture : this.model.stopTimes.expectedDeparture,

                originTime : this.model.originTime,
                destinationTime : this.model.destinationTime,

                status : this.model.trainStatus.status,
                dueIn : this.model.trainStatus.dueIn,
                late : this.model.trainStatus.late,
                lastLocation : this.model.trainStatus.lastLocation,

                direction : this.model.direction,
                trainType : this.model.trainType,
                locationType : this.model.locationType

            }));
            return this;
        }
    });

    return StationDataView;
});
