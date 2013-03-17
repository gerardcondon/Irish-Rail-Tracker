define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/station',
    'collections/stations'
    ], function($, _, Backbone, BootStrap, StationModel, StationsCollection){

    var StationCollectionView = Backbone.View.extend({

        initialize:function(options) {
            this.map = options.map;
            this.markers = [];
            this.visibility = true;
            this.zIndex = options.zIndex;
            this.colour = options.colour;
            this.buttonID = options.buttonID;
            this.filterIDs = options.filterIDs;

            var that = this;
            var onDataHandler = function(collection) {
                var validIDs = collection.pluck("id");

                if (that.filterIDs) {
                    validIDs = _.difference(validIDs, that.filterIDs);
                }

                collection.each(function( station ){
                    if (_.contains(validIDs, station.get('id'))) {
                        var stationLatlng = new google.maps.LatLng(station.get('latitude'), station.get('longitude'));
                        var marker = new google.maps.Marker({
                            position: stationLatlng,
                            map: that.map,
                            title:station.get('description'),
                            icon: 'http://maps.google.com/mapfiles/ms/icons/' + that.colour + '-dot.png',
                            zIndex: that.zIndex
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            that.trigger("marker-click", station);
                        });

                        that.markers.push(marker);
                    }
                });
                that.trigger("add-finish", validIDs);
            };

            this.collection = new StationsCollection({}, {type: options.type});
            this.collection.fetch({ success : onDataHandler});

            $(this.buttonID).click(function() {that.toggleStations();});
            $(this.buttonID).button('toggle');
        },

        toggleStations: function() {
            this.visibility = !this.visibility;
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setVisible(this.visibility);
            }
        }
    });

    return StationCollectionView;
});
