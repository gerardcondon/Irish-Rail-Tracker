define([
    'jquery',
    'underscore',
    'backbone',
    'network/crossDomainRequest'
    ], function($, _, Backbone, CrossDomainRequest){

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

    var BaseXMLCollection = Backbone.Collection.extend({
        defaults: {
            xmlNodeKey : ''
        },

        sync : function(method, model, options) {
            var that = this;
            CrossDomainRequest.exec(this.url, function(data) {
                data.type = that.type;
                options.success && options.success(that, data, options);
            });
        },

        parse: function(data) {
            var parsed=[];
            var that = this;

            var xml = data.results[0];
            var xmlDoc = $.parseXML(xml);
            var $xml = $(xmlDoc);
            $xml.find(this.xmlNodeKey).each(function (index) {

                var params = that.model.parse(this);
                parsed.push(params);
            });

            return parsed;
        }
    });

    return BaseXMLCollection;
});
