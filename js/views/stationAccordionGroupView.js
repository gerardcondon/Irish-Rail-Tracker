define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'entities/stationType',
    'text!/js/templates/stationAccordionGroupTemplate.html',
    'text!/js/templates/stationAccordionGroupItemTemplate.html'
    ], function($, _, Backbone, BootStrap, StationType, accordionGroupTemplate, itemTemplate){

    var StationAccordionGroupView = Backbone.View.extend({
        template: _.template(accordionGroupTemplate),
        itemTemplate: _.template(itemTemplate),
        initialize:function(options) {
            this.dispatcher = options.dispatcher;
        },

        render: function() {
            this.setElement(this.template({id : "station-accordion-group-" + this.collection.type,
                heading : StationType.getDescriptionForCode(this.collection.type)}));

            this.collection.each(function(station, index) {
                var $item = $(this.itemTemplate({title : station.get('description')}));
                var list = '.station-list-accordion-list.' + (index%2===0 ? 'left' : 'right');
                var dispatcher = this.dispatcher;

                this.$(list).append($item);
                $item.bind('click', function() {
                    dispatcher.trigger("station-selected", station);
                });
            }, this);

            return this;
        }
    });

    return StationAccordionGroupView;
});
