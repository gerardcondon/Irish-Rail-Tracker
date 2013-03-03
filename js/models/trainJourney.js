define([
	'backbone',
    'xml/xmlUtils'
	], function(Backbone, XMLUtils) {

	var TrainJourneyModel = Backbone.Model.extend({
		defaults: {
			code : '',
			date : '',
			
			origin : '',
			destination : ''
		}
	}, {
		parse: function(xmlNode) {
			var attributes = {};

			attributes.code = XMLUtils.getNodeText(xmlNode, ['TrainCode', 'Traincode']);
            attributes.date = XMLUtils.getNodeText(xmlNode, ['TrainDate', 'Traindate']);

            attributes.origin = XMLUtils.getNodeText(xmlNode, ['Origin', 'TrainOrigin']);
            attributes.destination = XMLUtils.getNodeText(xmlNode, ['Destination', 'TrainDestination']);

			return attributes;
		}
	});

	return TrainJourneyModel;
});