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
                        stationType: StationModel.constants.ALL,
                        zIndex: 0,
                        colour: 'purple',
                        buttonID: '#other-button'
                    });
                }
            });
            collectionView.on('marker-click', function(stationCode) {
                console.log('marker clicked with station code ' + stationCode);
                that.sideBarView.load(stationCode);
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

            $('a[href="#profile"]').on('shown', function(e) {
                google.maps.event.trigger(this.map, 'resize');
            });
            $("#map_canvas").css("height", 550);
            google.maps.event.trigger(this.map, 'resize');
        }
    });

    return StationsView;

});
