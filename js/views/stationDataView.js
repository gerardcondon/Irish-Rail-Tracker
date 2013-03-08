define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/stationData',
    'collections/stationDatas',
    'text!/js/templates/stationDataTemplate.html',
    'text!/js/templates/stationDataArrivingTemplate.html',
    'text!/js/templates/stationDataDepartingTemplate.html'
    ], function($, _, Backbone, BootStrap, StationDataModel, StationDatasCollection,
        stationDataTemplate, stationDataArrivingTemplate, stationDataDepartingTemplate){

    var StationDataView = Backbone.View.extend({

        tagName:'li',
        template:  _.template(stationDataTemplate),
        arrivingTemplate: _.template(stationDataArrivingTemplate),
        departingTemplate: _.template(stationDataDepartingTemplate),

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
                destination : this.model.journey.get('destination'),
                origin : this.model.journey.get('origin'),
                expectedArrival : this.model.stopTimes.get('expectedArrival'),
                expectedDeparture : this.model.stopTimes.get('expectedDeparture'),

                originTime : this.model.get('originTime'),
                destinationTime : this.model.get('destinationTime'),

                status : this.model.trainStatus.get('status'),
                dueIn : this.model.trainStatus.get('dueIn'),
                late : this.model.trainStatus.get('late'),
                lastLocation : this.model.trainStatus.get('lastLocation'),

                direction : this.model.get('direction'),
                trainType : this.model.get('trainType'),
                locationType : this.model.get('locationType')

            }));
            return this;
        }
    });

    return StationDataView;
});
