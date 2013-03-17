define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/trainMovement',
    'collections/trainMovements'
    ], function($, _, Backbone, BootStrap, TrainMovementModel, TrainMovementsCollection){

    var TrainMovementView = Backbone.View.extend({

        tagName:'li',
        template:  _.template($('#train-movement-template').html()),

        initialize:function(options) {
            this.model = options.trainMovement;
        },

        render:function() {
            var template = this.template;
            var summaryJSON = this.model.summary.toJSON();
            this.$el.html(template(summaryJSON));
            return this;
        }
    });

    return TrainMovementView;
});
