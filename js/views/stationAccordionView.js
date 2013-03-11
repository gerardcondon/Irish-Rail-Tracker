define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'views/stationAccordionGroupView',
    'text!/js/templates/stationAccordionTemplate.html'
    ], function($, _, Backbone, BootStrap, StationAccordionGroupView, accordionTemplate){

    var StationAccordionView = Backbone.View.extend({
        template: _.template(accordionTemplate),
        initialize:function(options) {
            this.stationAccordionGroupConstructor = options.stationAccordionGroupConstructor || StationAccordionGroupView;
            this.dispatcher = options.dispatcher;

            this.accordionGroupViews = [];

            _.bindAll(this, 'render', 'addOne', 'renderGroup');
            this.model.bind('add', this.addOne);
        },

        addOne: function(stationList) {
            var groupView = new this.stationAccordionGroupConstructor({collection : stationList, dispatcher : this.dispatcher});
            this.accordionGroupViews.push(groupView);
            this.renderGroup(groupView);
        },

        render: function() {
            this.$el.html(this.template({}));

            _.each(this.accordionGroupViews, function(groupView) {
                this.renderGroup(groupView);
            }, this);

            return this;
        },

        renderGroup: function(groupView) {
            this.$('#station-list-accordion').append(groupView.render().el);
        }
    });

    return StationAccordionView;
});
