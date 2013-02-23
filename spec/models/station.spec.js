define([
  'models/station'
], function(StationModel) {

describe("Station Model Tests", function() {
	var sut = {};
	var TEST_CODE = "TEST_CODE";
	var TEST_LATITUDE = "TEST_LATITUDE";
	var TEST_LONGITUDE = "TEST_LONGITUDE";
	var TEST_ID = "TEST_ID";
	var TEST_DESCRIPTION = "TEST_DESCRIPTION";
	var TEST_ALIAS = "TEST_ALIAS";
	var TEST_TYPE = "TEST_TYPE";

	beforeEach(function() {
		sut = new StationModel({
			code : TEST_CODE,
			latitude : TEST_LATITUDE,
			longitude : TEST_LONGITUDE,
			id : TEST_ID,
			description : TEST_DESCRIPTION,
			alias : TEST_ALIAS,
			type : TEST_TYPE
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

	it("has an id", function() {
		expect(sut.id).toEqual(TEST_ID);
	});

	it("has a description", function() {
		expect(sut.description).toEqual(TEST_DESCRIPTION);
	});

	it("has an alias", function() {
		expect(sut.alias).toEqual(TEST_ALIAS);
	});

	it("has a type", function() {
		expect(sut.type).toEqual(TEST_TYPE);
	});
});
});
