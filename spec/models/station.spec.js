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

	var TEST_XML_CODE = "TEST_XML_CODE";
	var TEST_XML_LATITUDE = "TEST_XML_LATITUDE";
	var TEST_XML_LONGITUDE = "TEST_XML_LONGITUDE";
	var TEST_XML_ID = "TEST_XML_ID";
	var TEST_XML_DESCRIPTION = "TEST_XML_DESCRIPTION";
	var TEST_XML_ALIAS = "TEST_XML_ALIAS";

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
			var xml = '<StationModel><StationDesc>' + TEST_XML_DESCRIPTION + '</StationDesc>' +
			'<StationAlias>' + TEST_XML_ALIAS + '</StationAlias>' +
			'<StationLatitude>' + TEST_XML_LATITUDE + '</StationLatitude>' +
			'<StationLongitude>' + TEST_XML_LONGITUDE + '</StationLongitude>' +
			'<StationCode>' + TEST_XML_CODE + '</StationCode>' +
			'<StationId>' + TEST_XML_ID + '</StationId></StationModel>';

	    var xmlDoc = $.parseXML(xml);
	    var $xmlDoc = $(xmlDoc);

	  	var attributes = StationModel.parse($xmlDoc.find('StationModel')[0]);

	  	expect(attributes.code).toEqual(TEST_XML_CODE);
	  	expect(attributes.latitude).toEqual(TEST_XML_LATITUDE);
	  	expect(attributes.longitude).toEqual(TEST_XML_LONGITUDE);
	  	expect(attributes.id).toEqual(TEST_XML_ID);
	  	expect(attributes.description).toEqual(TEST_XML_DESCRIPTION);
	  	expect(attributes.alias).toEqual(TEST_XML_ALIAS);
	});
});
});
