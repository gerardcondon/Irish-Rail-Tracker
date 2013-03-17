define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/stationData',
    'collections/stationDatas',
    'views/stationDataView',
    'text!/js/templates/sidebarHeadingTemplate.html'

    ], function($, _, Backbone, BootStrap, StationDataModel, StationDatasCollection, StationDataView, headingTemplate){

    var SideBarView = Backbone.View.extend({

        headingTemplate: _.template(headingTemplate),

        initialize:function(options) {
            this.dispatcher = options.dispatcher;

            _.bindAll(this, 'load');
            if (this.dispatcher) {
                this.dispatcher.bind('station-selected', this.load);
            }

            this.render();
        },

        renderEmpty:function() {
            this.$ul.append("<div class='stationDataView'>Click on a station to view train information for that station.<div>");
        },

        renderUL: function() {
            this.$ul = $('<ul class="stationDataList"></ul>');
            this.$el.empty();
            this.$el.append(this.$ul);
        },

        render:function() {
            this.renderUL();
            this.renderEmpty();
        },

        load:function(station) {
            var that = this;
            this.renderUL();
            this.collection = new StationDatasCollection([], {code: station.get('code')});
            this.$el.prepend(this.headingTemplate({heading : station.get('description')}));

            var onDataHandler = function(collection) {
                if (collection.length === 0) {
                    that.$ul.append("<div class='stationDataView'>No trains stopping in the next 90 mins<div>");
                } else {
                    collection.each(function(stationData){
                        var stationDataView = new StationDataView({stationData: stationData});
                        that.$ul.append(stationDataView.render().el);
                    });
                }
            };
            this.collection.fetch({ success : onDataHandler});
        }
    });

    return SideBarView;
});
