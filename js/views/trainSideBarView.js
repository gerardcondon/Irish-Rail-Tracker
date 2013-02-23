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
            $(this.el).append('<p>Click on a train to view train information for that train.</p>');
        },

        load:function(train) {
            var $ul = $('<ul class="trainMovementList"></ul>');
            this.collection = new TrainMovementsCollection({code: train.code, date: train.date});
            var that = this;
            $(that.el).empty();
            $(that.el).append("<strong>Timetable Information for " + train.message + "</strong>");

            var onDataHandler = function(collection) {
                collection.each(function(trainMovement){
                    console.log("Processing " + JSON.stringify(trainMovement));
                    var trainMovementView = new TrainMovementView({trainMovement: trainMovement});
                    $ul.append(trainMovementView.render().el);
                    $(that.el).append($ul);
                });
            };
            this.collection.fetch({ success : onDataHandler});
        }
    });

    return SideBarView;
});
