define([
  'models/locatable'
], function(Locatable) {

describe("Locatable Model Tests", function() {
	var sut = {};
	var TEST_CODE = "TEST_CODE";
	var TEST_LATITUDE = "TEST_LATITUDE";
	var TEST_LONGITUDE = "TEST_LONGITUDE";

	var TEST_XML_CODE = "TEST_XML_CODE";
	var TEST_XML_LATITUDE = "TEST_XML_LATITUDE";
	var TEST_XML_LONGITUDE = "TEST_XML_LONGITUDE";

	beforeEach(function() {
		sut = new Locatable({
			code : TEST_CODE,
			latitude : TEST_LATITUDE,
			longitude : TEST_LONGITUDE
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

	it("can parse an xml element and extract the locatable elements from it", function() {
		var xml = '<locatable><Latitude>' + TEST_XML_LATITUDE+ '</Latitude>' +
			'<Longitude>' + TEST_XML_LONGITUDE + '</Longitude>' +
			'<Code>' + TEST_XML_CODE + '</Code></locatable>';

	    var xmlDoc = $.parseXML(xml);
	    var $xmlDoc = $(xmlDoc);

	  	var attributes = Locatable.parse($xmlDoc.find('locatable')[0]);

	  	expect(attributes.code).toEqual(TEST_XML_CODE);
	  	expect(attributes.latitude).toEqual(TEST_XML_LATITUDE);
	  	expect(attributes.longitude).toEqual(TEST_XML_LONGITUDE);
	});
});
});
