define([
  'models/locatable'
], function(StationModel) {

describe("Locatable Model Tests", function() {
	var sut = {};
	var TEST_CODE = "TEST_CODE";
	var TEST_LATITUDE = "TEST_LATITUDE";
	var TEST_LONGITUDE = "TEST_LONGITUDE";

	beforeEach(function() {
		sut = new StationModel({
			code : TEST_CODE,
			latitude : TEST_LATITUDE,
			longitude : TEST_LONGITUDE
		});
	});

	it("has a code", function() {
		expect(sut.code).toEqual(TEST_CODE);
	});

	it("has a latitude", function() {
		expect(sut.latitude).toEqual(TEST_LATITUDE);
	});

	it("has a longitude", function() {
		expect(sut.longitude).toEqual(TEST_LONGITUDE);
	});
});
});
