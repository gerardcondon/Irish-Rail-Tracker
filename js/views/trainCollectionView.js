define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/train',
    'collections/trains'
    ], function($, _, Backbone, BootStrap, TrainModel, TrainsCollection){

    var TrainCollectionView = Backbone.View.extend({

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
                console.log('collection length = ' + collection.length);
                var validIDs = collection.pluck("id");

                if (that.filterIDs) {
                    validIDs = _.difference(validIDs, that.filterIDs);
                }

                collection.each(function( station ){
                    if (_.contains(validIDs, station.id)) {
                        var stationLatlng = new google.maps.LatLng(station.latitude, station.longitude);
                        var marker = new google.maps.Marker({
                            position: stationLatlng,
                            map: that.map,
                            title:station.code,
                            icon: 'http://maps.google.com/mapfiles/ms/icons/' + that.colour + '.png',
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

            this.collection = new TrainsCollection({type: options.type});
            this.collection.fetch({ success : onDataHandler});

            $(this.buttonID).click(function() {that.toggleTrains();});
            $(this.buttonID).button('toggle');
        },

        toggleTrains: function() {
            this.visibility = !this.visibility;
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setVisible(this.visibility);
            }
        }
    });

    return TrainCollectionView;
});
