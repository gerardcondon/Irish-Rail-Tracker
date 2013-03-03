define([
  'models/trainStatus'
], function(TrainJourneyModel) {

describe("Train Status Model Tests", function() {
	var sut = {};
	var TEST_STATUS = "TEST_STATUS";
	var TEST_LAST_LOCATION = "TEST_LAST_LOCATION";
	var TEST_DUE_IN = "TEST_DUE_IN";
	var TEST_LATE = "TEST_LATE";

	beforeEach(function() {
		sut = new TrainJourneyModel({
			status : TEST_STATUS,
			lastLocation : TEST_LAST_LOCATION,
			dueIn : TEST_DUE_IN,
			late : TEST_LATE
		});
	});

	it("has a status", function() {
		expect(sut.get('status')).toEqual(TEST_STATUS);
	});

	it("has a lastLocation", function() {
		expect(sut.get('lastLocation')).toEqual(TEST_LAST_LOCATION);
	});

	it("has a dueIn time", function() {
		expect(sut.get('dueIn')).toEqual(TEST_DUE_IN);
	});

	it("has an late status", function() {
		expect(sut.get('late')).toEqual(TEST_LATE);
	});

	it("can parse an xml element and extract the train journey elements from it", function() {
		var xml = '<TrainJourneyModel><Status>' + TEST_STATUS+ '</Status>' +
			'<Lastlocation>' + TEST_LAST_LOCATION + '</Lastlocation>' +
			'<Duein>' + TEST_DUE_IN + '</Duein>' +
			'<Late>' + TEST_LATE + '</Late></TrainJourneyModel>';

	    var xmlDoc = $.parseXML(xml);
	    var $xmlDoc = $(xmlDoc);

	  	var attributes = TrainJourneyModel.parse($xmlDoc.find('TrainJourneyModel')[0]);

	  	expect(attributes.status).toEqual(TEST_STATUS);
	  	expect(attributes.lastLocation).toEqual(TEST_LAST_LOCATION);
	  	expect(attributes.dueIn).toEqual(TEST_DUE_IN);
	  	expect(attributes.late).toEqual(TEST_LATE);
	});
});
});
