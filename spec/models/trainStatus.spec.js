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
		expect(sut.status).toEqual(TEST_STATUS);
	});

	it("has a lastLocation", function() {
		expect(sut.lastLocation).toEqual(TEST_LAST_LOCATION);
	});

	it("has a dueIn time", function() {
		expect(sut.dueIn).toEqual(TEST_DUE_IN);
	});

	it("has an late status", function() {
		expect(sut.late).toEqual(TEST_LATE);
	});
});
});
