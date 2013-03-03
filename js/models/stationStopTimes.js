define([
	'backbone',
    'xml/xmlUtils'
	], function(Backbone, XMLUtils) {

	var StationStopTimes = Backbone.Model.extend({
        defaults: {
            expectedArrival : '',
            expectedDeparture : '',

            scheduledArrival : '',
            scheduledDeparture : ''
        },

		isArrival: function() {
            return this.get('expectedDeparture') == '00:00';
        },

		isDeparture: function() {
            return this.get('expectedArrival') == '00:00';
        }
	}, {
        parse: function(xmlNode) {
            var attributes = {};

            attributes.expectedArrival = XMLUtils.getNodeText(xmlNode, ['Exparrival', 'ExpectedArrival']);
            attributes.expectedDeparture = XMLUtils.getNodeText(xmlNode, ['Expdepart', 'ExpectedDeparture']);

            attributes.scheduledArrival = XMLUtils.getNodeText(xmlNode, ['Scharrival', 'ScheduledArrival']);
            attributes.scheduledDeparture = XMLUtils.getNodeText(xmlNode, ['Schdepart', 'ScheduledDeparture']);

            return attributes;
        }
    });

	return StationStopTimes;
});