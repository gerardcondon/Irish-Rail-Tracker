define([
  'models/trainJourney'
], function(TrainJourneyModel) {

describe("Train Journey Model Tests", function() {
	var sut = {};
	var TEST_CODE = "TEST_CODE";
	var TEST_DATE = "TEST_DATE";
	var TEST_DESTINATION = "TEST_DESTINATION";
	var TEST_ORIGIN = "TEST_ORIGIN";

	beforeEach(function() {
		sut = new TrainJourneyModel([], {
			code : TEST_CODE,
			date : TEST_DATE,
			destination : TEST_DESTINATION,
			origin : TEST_ORIGIN
		});
	});

	it("has a code", function() {
		expect(sut.get('code')).toEqual(TEST_CODE);
	});

	it("has a date", function() {
		expect(sut.get('date')).toEqual(TEST_DATE);
	});

	it("has a destination", function() {
		expect(sut.get('destination')).toEqual(TEST_DESTINATION);
	});

	it("has an origin", function() {
		expect(sut.get('origin')).toEqual(TEST_ORIGIN);
	});
});
});
