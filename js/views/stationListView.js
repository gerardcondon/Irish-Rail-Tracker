define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'views/stationAccordionView',
    'views/sideBarView',
    'text!/js/templates/stationListViewTemplate.html'
    ], function($, _, Backbone, BootStrap, StationAccordionView, StationSideBarView, stationTemplate){

    var StationListView = Backbone.View.extend({
        id: "station-list-main-div" + _.uniqueId(),
        className: "station-list-main-div",
        template: _.template(stationTemplate),
        initialize:function(options) {
            var dispatcher = _.clone(Backbone.Events);
            this.stationNetwork = options.stationNetwork;
            this.sideBarConstructor = options.sideBarConstructor || StationSideBarView;
            this.stationAccordionConstructor = options.stationAccordionConstructor || StationAccordionView;

            this.sideBarView = new this.sideBarConstructor({ id : "station-list-sidebar", dispatcher : dispatcher});
            this.stationAccordionView = new this.stationAccordionConstructor({model : this.stationNetwork, dispatcher : dispatcher});
        },

        render: function() {
            this.$el.html(this.template({}));

            this.stationAccordionView.setElement(this.$('.station-list-accordion')).render();
            this.sideBarView.setElement(this.$('.station-list-sidebar')).render();

            return this;
        }
    });

    return StationListView;
});
