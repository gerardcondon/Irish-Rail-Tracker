define([
	'underscore',
	'backbone',
	'moment'
	], function(_, Backbone, moment) {

	var calculateArrivalTime = function(attributes, stopTimes) {
		if ((typeof attributes.arrival !== 'undefined') && (attributes.arrival !== '')){
			return attributes.arrival;
		}
		if (typeof stopTimes === 'undefined') {
			return '';
		}
		if ((typeof stopTimes.get('expectedArrival') !== 'undefined') && (stopTimes.get('expectedArrival') !== '')){
			return stopTimes.get('expectedArrival');
		}
		if ((typeof stopTimes.get('scheduledArrival') !== 'undefined') && (stopTimes.get('scheduledArrival') !== '')){
			return stopTimes.get('scheduledArrival');
		}
		return '';
	};

	var calculateDepartureTime = function(attributes, stopTimes) {
		if ((typeof attributes.departure !== 'undefined') && (attributes.departure !== '')){
			return attributes.departure;
		}
		if (typeof stopTimes === 'undefined') {
			return '';
		}
		if ((typeof stopTimes.get('expectedDeparture') !== 'undefined') && (stopTimes.get('expectedDeparture') !== '')){
			return stopTimes.get('expectedDeparture');
		}
		if ((typeof stopTimes.get('scheduledDeparture') !== 'undefined') && (stopTimes.get('scheduledDeparture') !== '')){
			return stopTimes.get('scheduledDeparture');
		}
		return '';
	};

	var moveToCurrentDay = function(toMove, referenceDate) {
		toMove.year(referenceDate.year());
		toMove.month(referenceDate.month());
		toMove.date(referenceDate.date());
		return toMove;
	};

	var TrainMovementSummaryModel = Backbone.Model.extend({
		defaults: {
			"locationName":  "",
			"arrivalTime":   "",
			"departureTime": "",
			"hasArrived":    false,
			'hasDeparted': false
		},

		initialize: function(attributes, options) {
			this.set({
				arrivalTime : calculateArrivalTime(attributes, options.stopTimes),
				departureTime : calculateDepartureTime(attributes, options.stopTimes)
			});
			this.setCurrentStatus();
		},

		setCurrentStatus: function() {
			var now = moment();
			var arrivalTimeMoment = moment(this.get('arrivalTime'), "HH:mm:ss");
			if (arrivalTimeMoment) {
				arrivalTimeMoment = moveToCurrentDay(arrivalTimeMoment, now);
				this.set({hasArrived : arrivalTimeMoment.isBefore(now)});
			}
			var departureTimeMoment = moment(this.get('departureTime'), "HH:mm:ss");
			if (departureTimeMoment) {
				departureTimeMoment = moveToCurrentDay(departureTimeMoment, now);
				this.set({hasDeparted : departureTimeMoment.isBefore(now)});
			}
		}
	}, {
		parse: function(xmlNode) {
			var attributes = {};

			attributes.arrival = $(xmlNode).find('Arrival').text();
			attributes.departure = $(xmlNode).find('Departure').text();
			attributes.locationFullName = $(xmlNode).find('LocationFullName').text();
            
			return attributes;
		}
	});

	return TrainMovementSummaryModel;
});