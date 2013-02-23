define([
  'backbone',
  'models/locatable'
], function(Backbone, Locatable) {

  var StationModel = Locatable.extend({

    initialize: function( options ) {
        this.constructor.__super__.initialize.apply(this, arguments);
        this.description = options.description;
        this.alias = options.alias;
        this.id = options.id;
        this.type = options.type;
	}
  });

  StationModel.constants = {};
  StationModel.constants.DART = "D";
  StationModel.constants.MAINLINE = "M";
  StationModel.constants.SUBURBAN = "S";
  StationModel.constants.ALL = "A";

  return StationModel;
});