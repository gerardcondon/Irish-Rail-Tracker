define([
  'models/stationStopTimes'
], function(StationStopTimesModel) {

describe("Station Stop Times Model Tests", function() {
	var sut = {};
	var TEST_EXPECTED_ARRIVAL = "TEST_EXPECTED_ARRIVAL";
	var TEST_EXPECTED_DEPARTURE = "TEST_EXPECTED_DEPARTURE";
	var TEST_SCHEDULED_ARRIVAL = "TEST_SCHEDULED_ARRIVAL";
	var TEST_SCHEDULED_DEPARTURE = "TEST_SCHEDULED_DEPARTURE";

	beforeEach(function() {
		sut = new StationStopTimesModel({
			expectedArrival : TEST_EXPECTED_ARRIVAL,
			expectedDeparture : TEST_EXPECTED_DEPARTURE,
			scheduledArrival : TEST_SCHEDULED_ARRIVAL,
			scheduledDeparture : TEST_SCHEDULED_DEPARTURE
		});
	});

	it("has an expected Arrival", function() {
		expect(sut.get('expectedArrival')).toEqual(TEST_EXPECTED_ARRIVAL);
	});

	it("has an expected Departure", function() {
		expect(sut.get('expectedDeparture')).toEqual(TEST_EXPECTED_DEPARTURE);
	});

	it("has a scheduled Arrival", function() {
		expect(sut.get('scheduledArrival')).toEqual(TEST_SCHEDULED_ARRIVAL);
	});

	it("has a scheduled Departure", function() {
		expect(sut.get('scheduledDeparture')).toEqual(TEST_SCHEDULED_DEPARTURE);
	});

	it("can parse an xml element and extract the station elements from it", function() {
		var xml = '<StationStopTimesModel>' +
			'<Exparrival>' + TEST_EXPECTED_ARRIVAL + '</Exparrival>' +
			'<Expdepart>' + TEST_EXPECTED_DEPARTURE + '</Expdepart>' +
			'<Scharrival>' + TEST_SCHEDULED_ARRIVAL + '</Scharrival>' +
			'<Schdepart>' + TEST_SCHEDULED_DEPARTURE + '</Schdepart></StationStopTimesModel>';

	    var xmlDoc = $.parseXML(xml);
	    var $xmlDoc = $(xmlDoc);

	  	var attributes = StationStopTimesModel.parse($xmlDoc.find('StationStopTimesModel')[0]);

	  	expect(attributes.expectedArrival).toEqual(TEST_EXPECTED_ARRIVAL);
	  	expect(attributes.expectedDeparture).toEqual(TEST_EXPECTED_DEPARTURE);
	  	expect(attributes.scheduledArrival).toEqual(TEST_SCHEDULED_ARRIVAL);
	  	expect(attributes.scheduledDeparture).toEqual(TEST_SCHEDULED_DEPARTURE);
	});

	describe("Arrivals and Departures", function() {
		it("an arrival time means it's not a departure", function() {
			expect(sut.isDeparture()).toBeFalsy();
		});

		it("no arrival time means that it's a departure", function() {
			sut.set({expectedArrival : '00:00'});
			expect(sut.isDeparture()).toBeTruthy();
		});

		it("a departure time means that it's not an arrival", function() {
			expect(sut.isArrival()).toBeFalsy();
		});

		it("no departure time means that it's an arrival", function() {
			sut.set({expectedDeparture : '00:00'});
			expect(sut.isArrival()).toBeTruthy();
		});
	});
});
});
