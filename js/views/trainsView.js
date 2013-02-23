define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'models/train',
    'collections/trains',
    'views/trainCollectionView'
    //'views/trainSideBarView'
    ], function($, _, Backbone, BootStrap, TrainModel, TrainsCollection, TrainCollectionView){

    var TrainsView = Backbone.View.extend({

        addTrainCollection:function(options) {
            var that = this;
            var collectionView = new TrainCollectionView({
                type: options.type,
                map: this.map,
                zIndex: options.zIndex,
                colour: options.colour,
                buttonID: options.buttonID,
                filterIDs: options.filterIDs
            });
            collectionView.on('add-finish', function(args) {
                that.filterIDs = _.union(that.filterIDs, args);
                if (options.type == TrainModel.constants.MAINLINE) {
                    that.addTrainCollection({
                        stationType: TrainModel.constants.ALL,
                        zIndex: 0,
                        colour: 'purple',
                        buttonID: '#other-button'
                    });
                }
            });
            collectionView.on('marker-click', function(station) {
                //that.sideBarView.load(station);
            });
            this.collections.push(collectionView);
        },

        initialize:function() {
            var that = this;
            this.render();
            this.filterIDs = [];
            this.collections = [];
            //this.sideBarView = new SideBarView({el: '#main-panel-sidebar'});

            this.addTrainCollection({
                type: TrainModel.constants.DART,
                zIndex: 3,
                colour: 'green',
                buttonID: '#dart-button'
            });

            this.addTrainCollection({
                type: TrainModel.constants.SUBURBAN,
                zIndex: 2,
                colour: 'blue',
                buttonID: '#suburban-button'
            });

            this.addTrainCollection({
                type: TrainModel.constants.MAINLINE,
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
            this.map = new google.maps.Map(document.getElementById("trains-map_canvas"), myOptions);

            var that = this;
            $('a[href="#trains-page"]').on('shown', function(e) {
                var center = that.map.center;
                google.maps.event.trigger(that.map, 'resize');
                that.map.setCenter(center);
            });
            $("#trains-map_canvas").css("height", 550);
            google.maps.event.trigger(this.map, 'resize');
        }
    });

    return TrainsView;

});
