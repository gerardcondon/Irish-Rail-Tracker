define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!/js/templates/stationAccordionGroupTemplate.html',
    'text!/js/templates/stationAccordionGroupItemTemplate.html'
    ], function($, _, Backbone, BootStrap, accordionGroupTemplate, itemTemplate){

    var StationAccordionGroupView = Backbone.View.extend({
        template: _.template(accordionGroupTemplate),
        itemTemplate: _.template(itemTemplate),
        initialize:function(options) {
            this.dispatcher = options.dispatcher;
        },

        render: function() {
            this.setElement(this.template({id : "station-accordion-group-" + this.collection.type, heading : this.collection.type}));
            this.setElement(this.template({id : "station-accordion-group-" + this.collection.type,
                heading : StationType.getDescriptionForCode(this.collection.type)}));

            this.collection.each(function(station, index) {
                var $item = $(this.itemTemplate({title : station.get('description')}));
                var list = '.station-list-accordion-list.' + (index%2===0 ? 'left' : 'right');
                this.$(list).append($item);
                $item.click(this.dispatcher.trigger("station-selected"), station);
            }, this);

            return this;
        }
    });

    return StationAccordionGroupView;
});
