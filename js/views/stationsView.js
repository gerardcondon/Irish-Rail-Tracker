define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'models/station',
  'collections/stations',
  'views/stationCollectionView'
], function($, _, Backbone, BootStrap, StationModel, StationsCollection, StationCollectionView){

  var StationsView = Backbone.View.extend({

    initialize:function() {
      var that = this;
      that.render();
      that.filterIDs = [];

      that.dartCollectionView = new StationCollectionView({
        type: StationModel.constants.DART,
        map: this.map,
        zIndex: 3,
        colour: 'green',
        buttonID: '#dart-button'
      });
      that.dartCollectionView.on('add-finish', function(args) {
        that.filterIDs = _.union(that.filterIDs, args);
      });

      that.suburbanCollectionView = new StationCollectionView({
        type: StationModel.constants.SUBURBAN,
        map: this.map,
        zIndex: 2,
        colour: 'blue',
        buttonID: '#suburban-button'
      });
      that.suburbanCollectionView.on('add-finish', function(args) {
        that.filterIDs = _.union(that.filterIDs, args);
      });

      that.mainlineCollectionView = new StationCollectionView({
        type: StationModel.constants.MAINLINE,
        map: this.map,
        zIndex: 1,
        colour: 'red',
        buttonID: '#mainline-button'
      });
      that.mainlineCollectionView.on('add-finish', function(args) {
        that.filterIDs = _.union(that.filterIDs, args);

        that.otherCollectionView = new StationCollectionView({
          type: StationModel.constants.ALL,
          map: this.map,
          zIndex: 0,
          colour: 'purple',
          buttonID: '#other-button',
          filterIDs: that.filterIDs
        });
      });
    },

    render: function(){
      var latlng = new google.maps.LatLng(53.3, -8.2);
        var myOptions = {
            zoom: 7,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        $('a[href="#profile"]').on('shown', function(e) {
            google.maps.event.trigger(this.map, 'resize');
        });
        $("#map_canvas").css("height", 550);
        google.maps.event.trigger(this.map, 'resize');
    }
  });

  return StationsView;
  
});
