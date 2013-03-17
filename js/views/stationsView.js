define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/station',
    'collections/stations',
    'views/stationCollectionView',
    'views/sideBarView'
    ], function($, _, Backbone, BootStrap, StationModel, StationsCollection, StationCollectionView, SideBarView){

    var StationsView = Backbone.View.extend({

        addStationCollection:function(options) {
            var that = this;
            var collectionView = new StationCollectionView({
                type: options.type,
                map: this.map,
                zIndex: options.zIndex,
                colour: options.colour,
                buttonID: options.buttonID,
                filterIDs: options.filterIDs
            });
            collectionView.on('add-finish', function(args) {
                that.filterIDs = _.union(that.filterIDs, args);
                if (options.type == StationModel.constants.MAINLINE) {
                    that.addStationCollection({
                        type: StationModel.constants.ALL,
                        zIndex: 0,
                        colour: 'purple',
                        filterIDs : that.filterIDs,
                        buttonID: '#other-button'
                    });
                }
            });
            collectionView.on('marker-click', function(station) {
                that.sideBarView.load(station);
            });
            this.collections.push(collectionView);
        },

        initialize:function() {
            var that = this;
            this.render();
            this.filterIDs = [];
            this.collections = [];
            this.sideBarView = new SideBarView({el: '#main-panel-sidebar'});

            this.addStationCollection({
                type: StationModel.constants.DART,
                zIndex: 3,
                colour: 'green',
                buttonID: '#dart-button'
            });

            this.addStationCollection({
                type: StationModel.constants.SUBURBAN,
                zIndex: 2,
                colour: 'blue',
                buttonID: '#suburban-button'
            });

            this.addStationCollection({
                type: StationModel.constants.MAINLINE,
                zIndex: 1,
                colour: 'red',
                buttonID: '#mainline-button'
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
            
            var that = this;
            $('a[href="#station-map-page"]').on('shown', function(e) {
                var center = that.map.center;
                google.maps.event.trigger(that.map, 'resize');
                that.map.setCenter(center);
            });
            $("#map_canvas").css("height", 550);
            google.maps.event.trigger(this.map, 'resize');
        }
    });

    return StationsView;

});
