define([
  'backbone'
], function(Backbone) {

    var LocatableModel = Backbone.Model.extend({
        initialize: function( options ) {
            this.latitude = options.latitude;
            this.longitude = options.longitude;
            this.code = options.code;
        }
    });

    return LocatableModel;
});