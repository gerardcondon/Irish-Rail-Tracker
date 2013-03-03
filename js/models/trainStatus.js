define([
	'backbone'
	], function(Backbone) {

	var TrainStatus = Backbone.Model.extend({
		defaults : {
			status : '',
			lastLocation : '',
			dueIn : '',
			late : ''
		}
	}, {
		parse: function(xmlNode) {
			var attributes = {};

            attributes.status = $(xmlNode).find('Status').text();
            attributes.lastLocation = $(xmlNode).find('Lastlocation').text();
            attributes.dueIn = $(xmlNode).find('Duein').text();
            attributes.late = $(xmlNode).find('Late').text();
            
			return attributes;
		}
	});

	return TrainStatus;
});