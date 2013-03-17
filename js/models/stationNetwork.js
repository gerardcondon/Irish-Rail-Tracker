define([
  'backbone',
  'underscore',
  'models/station',
  'collections/stations'
], function(Backbone, _, StationModel, StationsCollection) {

    var StationNetwork = Backbone.Model.extend({
        initialize: function(attributes, options) {
            this.numCollectionsCompleted = 0;
            _.bindAll(this, "addCollection", "onCollectionFetched", "processOtherStationsCollection");

            this.dartCollection = this.addCollection(StationModel.constants.DART);
            this.suburbanCollection = this.addCollection(StationModel.constants.SUBURBAN);
            this.mainlineCollection = this.addCollection(StationModel.constants.MAINLINE);

            this.allCollection = new StationsCollection([], {type : StationModel.constants.ALL});
            this.allCollection.fetch({success : this.processOtherStationsCollection});
        },

        addCollection: function(type) {
            var collection = new StationsCollection([], {"type" : type});
            collection.fetch({success : this.onCollectionFetched});
            return collection;
        },

        onCollectionFetched: function(collection) {
            this.processOtherStationsCollection();
            this.trigger("add", collection);
        },

        processOtherStationsCollection: function() {
            this.numCollectionsCompleted = this.numCollectionsCompleted + 1;
            if (this.numCollectionsCompleted == 4) {
                var takenIds = [];
                takenIds = takenIds.concat(this.dartCollection.pluck('id'));
                takenIds = takenIds.concat(this.suburbanCollection.pluck('id'));
                takenIds = takenIds.concat(this.mainlineCollection.pluck('id'));

                var otherStations = this.allCollection.reject(function(station) {
                    var id = station.get('id');
                    return _.contains(takenIds, id);

                }, this);
                this.otherCollection = new StationsCollection(otherStations, {type : "O"});
                this.trigger("add", this.otherCollection);
            }
        }
    });

    return StationNetwork;
});