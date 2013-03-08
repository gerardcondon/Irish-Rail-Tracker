define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'views/sideBarView',
    'text!/js/templates/stationListViewTemplate.html'
    ], function($, _, Backbone, BootStrap, StationSideBarView, stationTemplate){

    var StationListView = Backbone.View.extend({
        id: "station-list-main-div" + _.uniqueId(),
        className: "station-list-main-div",
        template: _.template(stationTemplate),
        initialize:function(options) {
            this.stationNetwork = options.stationNetwork;
            this.sideBarConstructor = options.sideBarConstructor || StationSideBarView;
        },

        render: function() {
            this.$el.append(this.template({}));
            this.sideBarView = new this.sideBarConstructor({ id : "station-list-sidebar"});
            this.$el.append(this.sideBarView.render().el);
            return this;
        }
    });

    return StationListView;
});
