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
        parse: function(xmlNode, prefix) {
            var attributes = {};
            prefix = prefix || "";

            attributes.latitude = $(xmlNode).find(prefix + 'Latitude').text();
            attributes.longitude = $(xmlNode).find(prefix + 'Longitude').text();
            attributes.code = $(xmlNode).find(prefix + 'Code').text();

            return attributes;
        }
    });

    return LocatableModel;
});