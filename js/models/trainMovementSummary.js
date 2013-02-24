define([
	'underscore',
	'backbone',
	'moment'
	], function(_, Backbone, moment) {

	var calculateArrivalTime = function(options) {
		if ((typeof options.arrival !== 'undefined') && (options.arrival !== '')){
			return options.arrival;
		}
		if ((typeof options.expectedArrival !== 'undefined') && (options.expectedArrival !== '')){
			return options.expectedArrival;
		}
		if ((typeof options.scheduledArrival !== 'undefined') && (options.scheduledArrival !== '')){
			return options.scheduledArrival;
		}
		return '';
	};

	var calculateDepartureTime = function(options) {
		if ((typeof options.departure !== 'undefined') && (options.departure !== '')){
			return options.departure;
		}
		if ((typeof options.expectedDeparture !== 'undefined') && (options.expectedDeparture !== '')){
			return options.expectedDeparture;
		}
		if ((typeof options.scheduledDeparture !== 'undefined') && (options.scheduledDeparture !== '')){
			return options.scheduledDeparture;
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
			this.set({locationName : options.locationFullName,
				arrivalTime : calculateArrivalTime(options),
				departureTime : calculateDepartureTime(options)
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
	});

	return TrainMovementSummaryModel;
});