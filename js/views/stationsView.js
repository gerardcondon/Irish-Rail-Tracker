define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'models/station',
  'collections/stations'
], function($, _, Backbone, BootStrap, StationModel, StationsCollection){

  var StationsView = Backbone.View.extend({

    initialize:function() {

      var that = this;
      that.render();

      this.dartMarkers = [];
      this.dartVisibility = true;
      var onDartDataHandler = function(collection) {
        console.log('collection length = ' + collection.length);
        collection.each(function( station ){ 
          var stationLatlng = new google.maps.LatLng(station.latitude, station.longitude);
          var marker = new google.maps.Marker({
              position: stationLatlng,
              map: that.map,
              title:station.description,
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              zIndex:3
          }); 
          that.dartMarkers.push(marker);
        } );
          that.dartIDs = collection.pluck("id");
      }

      this.suburbanMarkers = [];
      this.suburbanVisibility = true;
      var onSuburbanDataHandler = function(collection) {
        console.log('collection length = ' + collection.length);
        collection.each(function( station ){ 
          var stationLatlng = new google.maps.LatLng(station.latitude, station.longitude);
          var marker = new google.maps.Marker({
              position: stationLatlng,
              map: that.map,
              title:station.description,
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              zIndex:2
          }); 
          that.suburbanMarkers.push(marker);
        } );
          that.suburbanIDs = collection.pluck("id");
      }

      this.mainlineMarkers = [];
      this.mainlineVisibility = true;
      var onMainlineDataHandler = function(collection) {
        console.log('collection length = ' + collection.length);
        collection.each(function( station ){ 
          var stationLatlng = new google.maps.LatLng(station.latitude, station.longitude);
          var marker = new google.maps.Marker({
              position: stationLatlng,
              map: that.map,
              title:station.description,
              icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              zIndex:1
          }); 
          that.mainlineMarkers.push(marker);
        } );
          that.mainlineIDs = collection.pluck("id");
      }

      this.otherMarkers = [];
      this.otherVisibility = true;
      var onOtherDataHandler = function(collection) {
        console.log('collection length = ' + collection.length);
          that.otherIDs = collection.pluck("id");
          that.otherIDs = _.difference(that.otherIDs, that.dartIDs);
          that.otherIDs = _.difference(that.otherIDs, that.suburbanIDs);
          that.otherIDs = _.difference(that.otherIDs, that.mainlineIDs);
          console.log(JSON.stringify(that.otherIDs));

        collection.each(function( station ){ 
          if (_.contains(that.otherIDs, station.id)) {
            var stationLatlng = new google.maps.LatLng(station.latitude, station.longitude);
            var marker = new google.maps.Marker({
                position: stationLatlng,
                map: that.map,
                title:station.description,
                icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
                zIndex:0
            }); 
            that.otherMarkers.push(marker);
          }
        });
      }

      that.dartCollection = new StationsCollection({type: StationModel.constants.DART});
      that.dartCollection.on('all', function(eventName) {console.log('dartCollection event ' + eventName);});
      that.dartCollection.fetch({ success : onDartDataHandler});

      that.suburbanCollection = new StationsCollection({type: StationModel.constants.SUBURBAN});
      that.suburbanCollection.fetch({ success : onSuburbanDataHandler});

      that.mainlineCollection = new StationsCollection({type: StationModel.constants.MAINLINE});
      that.mainlineCollection.fetch({ success : onMainlineDataHandler});

      that.otherCollection = new StationsCollection({type: StationModel.constants.ALL});
      that.otherCollection.fetch({ success : onOtherDataHandler});

      $('#dart-button').click(function() {that.toggleDartStations()});
      $('#dart-button').button('toggle');

      $('#suburban-button').click(function() {that.toggleSuburbanStations()});
      $('#suburban-button').button('toggle');

      $('#mainline-button').click(function() {that.toggleMainlineStations()});
      $('#mainline-button').button('toggle');

      $('#other-button').click(function() {that.toggleOtherStations()});
      $('#other-button').button('toggle');
    },

    toggleDartStations: function() {
      console.log("toggleDartStations");
      this.dartVisibility = !this.dartVisibility;
        for (var i = 0; i < this.dartMarkers.length; i++) {
            this.dartMarkers[i].setVisible(this.dartVisibility);
        }
    },

    toggleSuburbanStations: function() {
      console.log("toggleDartStations");
      this.suburbanVisibility = !this.suburbanVisibility;
        for (var i = 0; i < this.suburbanMarkers.length; i++) {
            this.suburbanMarkers[i].setVisible(this.suburbanVisibility);
        }
    },

    toggleMainlineStations: function() {
      console.log("toggleMainlineStations");
      this.mainlineVisibility = !this.mainlineVisibility;
        for (var i = 0; i < this.mainlineMarkers.length; i++) {
            this.mainlineMarkers[i].setVisible(this.mainlineVisibility);
        }
    },

    toggleOtherStations: function() {
      console.log("toggleOtherStations");
      this.otherVisibility = !this.otherVisibility;
        for (var i = 0; i < this.otherMarkers.length; i++) {
            this.otherMarkers[i].setVisible(this.otherVisibility);
        }
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
