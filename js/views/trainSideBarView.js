define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/trainMovement',
    'collections/trainMovements',
    'views/trainMovementView'
    ], function($, _, Backbone, BootStrap, TrainMovementModel, TrainMovementsCollection, TrainMovementView){

    var SideBarView = Backbone.View.extend({

        initialize:function() {
            this.render();
        },

        renderEmpty:function() {
            this.$ul.append("<div class='trainMovementView'>Click on a train to view train information for that train.<div>");
        },

        renderUL: function() {
            this.$ul = $('<ul class="trainMovementList"></ul>');
            this.$el.empty();
            this.$el.append(this.$ul);
        },

        render:function() {
            this.renderUL();
            this.renderEmpty();
        },

        load:function(train) {
            var that = this;
            this.renderUL();
            this.collection = new TrainMovementsCollection([], {code: train.get('code'), date: train.get('date')});
            $(that.el).prepend("<div class='sidebar-heading'><strong>Timetable Information for " + train.get('message') + "</strong></div>");

            var onDataHandler = function(collection) {
                if (collection.length === 0) {
                    that.$ul.append("<div class='stationDataView'>No stop information for selected train.</div>");
                } else {
                    collection.each(function(trainMovement){
                        var trainMovementView = new TrainMovementView({trainMovement: trainMovement});
                        that.$ul.append(trainMovementView.render().el);
                    });
                }
            };
            this.collection.fetch({ success : onDataHandler});
        }
    });

    return SideBarView;
});
