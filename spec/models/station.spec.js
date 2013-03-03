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
		expect(sut.get("code")).toEqual(TEST_CODE);
	});

	it("has a latitude", function() {
		expect(sut.get("latitude")).toEqual(TEST_LATITUDE);
	});

	it("has a longitude", function() {
		expect(sut.get("longitude")).toEqual(TEST_LONGITUDE);
	});

	it("has an id", function() {
		expect(sut.get("id")).toEqual(TEST_ID);
	});

	it("has a description", function() {
		expect(sut.get("description")).toEqual(TEST_DESCRIPTION);
	});

	it("has an alias", function() {
		expect(sut.get("alias")).toEqual(TEST_ALIAS);
	});

	it("has a type", function() {
		expect(sut.get("type")).toEqual(TEST_TYPE);
	});

	it("can parse an xml element and extract the station elements from it", function() {
		var xml = '<StationModel><StationDesc>' + TEST_DESCRIPTION + '</StationDesc>' +
			'<StationAlias>' + TEST_ALIAS + '</StationAlias>' +
			'<StationLatitude>' + TEST_LATITUDE + '</StationLatitude>' +
			'<StationLongitude>' + TEST_LONGITUDE + '</StationLongitude>' +
			'<StationCode>' + TEST_CODE + '</StationCode>' +
			'<StationId>' + TEST_ID + '</StationId></StationModel>';

	    var xmlDoc = $.parseXML(xml);
	    var $xmlDoc = $(xmlDoc);

	  	var attributes = StationModel.parse($xmlDoc.find('StationModel')[0]);

	  	expect(attributes.code).toEqual(TEST_CODE);
	  	expect(attributes.latitude).toEqual(TEST_LATITUDE);
	  	expect(attributes.longitude).toEqual(TEST_LONGITUDE);
	  	expect(attributes.id).toEqual(TEST_ID);
	  	expect(attributes.description).toEqual(TEST_DESCRIPTION);
	  	expect(attributes.alias).toEqual(TEST_ALIAS);
	});
});
});
