define([
  'backbone',
  'models/locatable'
], function(Backbone, Locatable) {

    var StationType = function() {
    };

    StationType.prototype.getDescriptionForCode = function(code){
        if (code == 'D') {
            return 'DART';
        }
        if (code == 'S') {
            return 'SUBURBAN';
        }
        if (code == 'M') {
            return 'MAINLINE';
        }
        if (code == 'O') {
            return 'OTHERS';
        }
    };

    var StationTypeInstance = new StationType();
    return StationTypeInstance;
});