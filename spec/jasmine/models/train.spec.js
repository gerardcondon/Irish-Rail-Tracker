define([
  'models/train'
], function(TrainModel) {

describe("Train Model Tests", function() {
	var sut = {};
	var TEST_CODE = "TEST_CODE";
	var TEST_LATITUDE = "TEST_LATITUDE";
	var TEST_LONGITUDE = "TEST_LONGITUDE";
	var TEST_STATUS = "TEST_STATUS";
	var TEST_DATE = "TEST_DATE";
	var TEST_MESSAGE = "TEST_MESSAGE";
	var TEST_DIRECTION = "TEST_DIRECTION";

	beforeEach(function() {
		sut = new TrainModel({
			code : TEST_CODE,
			latitude : TEST_LATITUDE,
			longitude : TEST_LONGITUDE,
			status : TEST_STATUS,
			date : TEST_DATE,
			message : TEST_MESSAGE,
			direction : TEST_DIRECTION
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

	it("has a status", function() {
		expect(sut.get("status")).toEqual(TEST_STATUS);
	});

	it("has a date", function() {
		expect(sut.get("date")).toEqual(TEST_DATE);
	});

	it("has a message", function() {
		expect(sut.get("message")).toEqual(TEST_MESSAGE);
	});

	it("has a direction", function() {
		expect(sut.get("direction")).toEqual(TEST_DIRECTION);
	});

	it("can parse an xml element and extract the train elements from it", function() {
		var xml = '<TrainModel><TrainStatus>' + TEST_STATUS + '</TrainStatus>' +
			'<TrainDate>' + TEST_DATE + '</TrainDate>' +
			'<TrainLatitude>' + TEST_LATITUDE + '</TrainLatitude>' +
			'<TrainLongitude>' + TEST_LONGITUDE + '</TrainLongitude>' +
			'<TrainCode>' + TEST_CODE + '</TrainCode>' +
			'<PublicMessage>' + TEST_MESSAGE + '</PublicMessage>' +
			'<Direction>' + TEST_DIRECTION + '</Direction></TrainModel>';

	    var xmlDoc = $.parseXML(xml);
	    var $xmlDoc = $(xmlDoc);

	  	var attributes = TrainModel.parse($xmlDoc.find('TrainModel')[0]);

	  	expect(attributes.code).toEqual(TEST_CODE);
	  	expect(attributes.latitude).toEqual(TEST_LATITUDE);
	  	expect(attributes.longitude).toEqual(TEST_LONGITUDE);
	  	expect(attributes.status).toEqual(TEST_STATUS);
	  	expect(attributes.message).toEqual(TEST_MESSAGE);
	  	expect(attributes.direction).toEqual(TEST_DIRECTION);
	  	expect(attributes.date).toEqual(TEST_DATE);
	});
});
});