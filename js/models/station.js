define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var StationModel = Backbone.Model.extend({

    initialize: function( options ) {
			this.description = options.description; 
      this.alias = options.alias; 
      this.latitude = options.latitude; 
      this.longitude = options.longitude; 
      this.code = options.code; 
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