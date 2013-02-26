define([
  'backbone'
], function(Backbone) {

    var LocatableModel = Backbone.Model.extend({
        defaults: {
            latitude : "",
            longitude : "",
            code : ""
        }
    }, {
        parse: function(xml, prefix) {
            var attributes = {};
            prefix = prefix || "";

            attributes.latitude = $(xml).find(prefix + 'Latitude').text();
            attributes.longitude = $(xml).find(prefix + 'Longitude').text();
            attributes.code = $(xml).find(prefix + 'Code').text();

            return attributes;
        }
    });

    return LocatableModel;
});