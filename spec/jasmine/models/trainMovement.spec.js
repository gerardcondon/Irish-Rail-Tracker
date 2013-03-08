define([
  'models/trainMovement'
], function(TrainMovementModel) {

describe("Train Movement Model Tests", function() {
    var sut = {};
    var TEST_CODE = "TEST_CODE";
    var TEST_DATE = "TEST_DATE";
    var TEST_DESTINATION = "TEST_DESTINATION";
    var TEST_ORIGIN = "TEST_ORIGIN";
    var TEST_EXPECTED_ARRIVAL = "TEST_EXPECTED_ARRIVAL";
    var TEST_EXPECTED_DEPARTURE = "TEST_EXPECTED_DEPARTURE";
    var TEST_SCHEDULED_ARRIVAL = "TEST_SCHEDULED_ARRIVAL";
    var TEST_SCHEDULED_DEPARTURE = "TEST_SCHEDULED_DEPARTURE";
    var TEST_LOCATION_FULL_NAME = "TEST_LOCATION_NAME";
    var TEST_ARRIVAL = "TEST_ARRIVAL";
    var TEST_DEPARTURE = "TEST_DEPARTURE";

    beforeEach(function() {
        sut = new TrainMovementModel({
            code : TEST_CODE,
            date : TEST_DATE,
            destination : TEST_DESTINATION,
            origin : TEST_ORIGIN
        });
    });

    it("has a train journey element", function() {
        expect(sut.journey).not.toBeNull();
    });

    it("has a station stop times element", function() {
        expect(sut.stopTimes).not.toBeNull();
    });

    it("has a train movement summary element", function() {
        expect(sut.summary).not.toBeNull();
    });

    it("can parse train movement data from an xml element", function() {
        var xml = '<TrainMovementModel>' +
        '<TrainCode>' + TEST_CODE + '</TrainCode>' +
        '<TrainDate>' + TEST_DATE + '</TrainDate>' +
        '<LocationFullName>' + TEST_LOCATION_FULL_NAME + '</LocationFullName>' +
        '<TrainOrigin>' + TEST_ORIGIN + '</TrainOrigin>' +
        '<TrainDestination>' + TEST_DESTINATION + '</TrainDestination>' +
        '<ScheduledArrival>' + TEST_SCHEDULED_ARRIVAL + '</ScheduledArrival>' +
        '<ScheduledDeparture>' + TEST_SCHEDULED_DEPARTURE + '</ScheduledDeparture>' +
        '<ExpectedArrival>' + TEST_EXPECTED_ARRIVAL + '</ExpectedArrival>' +
        '<ExpectedDeparture>' + TEST_EXPECTED_DEPARTURE + '</ExpectedDeparture>' +
        '<Arrival>' + TEST_ARRIVAL + '</Arrival>' +
        '<Departure>' + TEST_DEPARTURE + '</Departure>' +
        '</TrainMovementModel>';

        var xmlDoc = $.parseXML(xml);
        var $xmlDoc = $(xmlDoc);

        var attributes = TrainMovementModel.parse($xmlDoc.find('TrainMovementModel')[0]);

        expect(attributes.code).toEqual(TEST_CODE);
        expect(attributes.date).toEqual(TEST_DATE);
        expect(attributes.origin).toEqual(TEST_ORIGIN);
        expect(attributes.destination).toEqual(TEST_DESTINATION);

        expect(attributes.expectedArrival).toEqual(TEST_EXPECTED_ARRIVAL);
        expect(attributes.expectedDeparture).toEqual(TEST_EXPECTED_DEPARTURE);
        expect(attributes.scheduledArrival).toEqual(TEST_SCHEDULED_ARRIVAL);
        expect(attributes.scheduledDeparture).toEqual(TEST_SCHEDULED_DEPARTURE);

        expect(attributes.locationFullName).toEqual(TEST_LOCATION_FULL_NAME);
        expect(attributes.arrival).toEqual(TEST_ARRIVAL);
        expect(attributes.departure).toEqual(TEST_DEPARTURE);
    });
});
});

