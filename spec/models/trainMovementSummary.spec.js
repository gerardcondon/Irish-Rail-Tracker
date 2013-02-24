define([
    'moment',
    'models/trainMovementSummary'
    ], function(moment, TrainMovementSummaryModel) {

describe("Train Movement Summary Model Tests", function() {
	var sut = {};
	var TEST_LOCATION_NAME = "TEST_LOCATION_NAME";
    var TEST_ARRIVAL = "TEST_ARRIVAL";
    var TEST_EXPECTED_ARRIVAL = "TEST_EXPECTED_ARRIVAL";
    var TEST_SCHEDULED_ARRIVAL = "TEST_SCHEDULED_ARRIVAL";
    var TEST_DEPARTURE = "TEST_DEPARTURE";
    var TEST_EXPECTED_DEPARTURE = "TEST_EXPECTED_DEPARTURE";
    var TEST_SCHEDULED_DEPARTURE = "TEST_SCHEDULED_DEPARTURE";

	it("has a location name", function() {
        sut = new TrainMovementSummaryModel([], {
            locationFullName : TEST_LOCATION_NAME
        })

		expect(sut.get('locationName')).toEqual(TEST_LOCATION_NAME);
	});

	describe("calculate arrival time", function() {

		it("if it has an arrival then that is used for the arrival time", function() {
            sut = new TrainMovementSummaryModel([], {
                arrival : TEST_ARRIVAL
            });

            expect(sut.get('arrivalTime')).toEqual(TEST_ARRIVAL);
		});

		it("otherwise if arrival is undefined it will use the expected time", function() {
            sut = new TrainMovementSummaryModel([], {
                expectedArrival : TEST_EXPECTED_ARRIVAL
            });

            expect(sut.get('arrivalTime')).toEqual(TEST_EXPECTED_ARRIVAL);
		});

        it("or if arrival is empty it will use the expected time", function() {
            sut = new TrainMovementSummaryModel([], {
                arrival : '',
                expectedArrival : TEST_EXPECTED_ARRIVAL
            });

            expect(sut.get('arrivalTime')).toEqual(TEST_EXPECTED_ARRIVAL);
        });

		it("unless if expectedArrival is undefined it will use the scheduled time ", function() {
            sut = new TrainMovementSummaryModel([], {
                arrival : '',
                scheduledArrival : TEST_SCHEDULED_ARRIVAL
            });

            expect(sut.get('arrivalTime')).toEqual(TEST_SCHEDULED_ARRIVAL);
		});

        it("or if expectedArrival is empty it will use the scheduled time ", function() {
            sut = new TrainMovementSummaryModel([], {
                arrival : '',
                expectedArrival : '',
                scheduledArrival : TEST_SCHEDULED_ARRIVAL
            });

            expect(sut.get('arrivalTime')).toEqual(TEST_SCHEDULED_ARRIVAL);
        });

        it("unless scheduledTime is undefined it will use ''", function() {
            sut = new TrainMovementSummaryModel([], {
                arrival : '',
                expectedArrival : ''
            });

            expect(sut.get('arrivalTime')).toEqual('');
        });

        it("or if scheduledTime is empty it will use ''", function() {
            sut = new TrainMovementSummaryModel([], {
                arrival : '',
                expectedArrival : '',
                scheduledArrival : ''
            });

            expect(sut.get('arrivalTime')).toEqual('');
        });
	});

	describe("calculate departure time", function() {
        it("if it has an departure then that is used for the departure time", function() {
            sut = new TrainMovementSummaryModel([], {
                departure : TEST_DEPARTURE
            });

            expect(sut.get('departureTime')).toEqual(TEST_DEPARTURE);
        });

        it("otherwise if departure is undefined it will use the expected time", function() {
            sut = new TrainMovementSummaryModel([], {
                expectedDeparture : TEST_EXPECTED_DEPARTURE
            });

            expect(sut.get('departureTime')).toEqual(TEST_EXPECTED_DEPARTURE);
        });

        it("or if departure is empty it will use the expected time", function() {
            sut = new TrainMovementSummaryModel([], {
                departure : '',
                expectedDeparture : TEST_EXPECTED_DEPARTURE
            });

            expect(sut.get('departureTime')).toEqual(TEST_EXPECTED_DEPARTURE);
        });

        it("unless if expectedDeparture is undefined it will use the scheduled time ", function() {
            sut = new TrainMovementSummaryModel([], {
                departure : '',
                scheduledDeparture : TEST_SCHEDULED_DEPARTURE
            });

            expect(sut.get('departureTime')).toEqual(TEST_SCHEDULED_DEPARTURE);
        });

        it("or if expectedDeparture is empty it will use the scheduled time ", function() {
            sut = new TrainMovementSummaryModel([], {
                departure : '',
                expectedDeparture : '',
                scheduledDeparture : TEST_SCHEDULED_DEPARTURE
            });

            expect(sut.get('departureTime')).toEqual(TEST_SCHEDULED_DEPARTURE);
        });

        it("unless scheduledTime is undefined it will use ''", function() {
            sut = new TrainMovementSummaryModel([], {
                departure : '',
                expectedDeparture : ''
            });

            expect(sut.get('departureTime')).toEqual('');
        });

        it("or if scheduledTime is empty it will use ''", function() {
            sut = new TrainMovementSummaryModel([], {
                departure : '',
                expectedDeparture : '',
                scheduledDeparture : ''
            });

            expect(sut.get('departureTime')).toEqual('');
        });
	});

    describe("knows if it was in the past, current or in the future", function() {
        it("an arrival time in the past means that the train had arrived", function() {
            sut = new TrainMovementSummaryModel([], {
                arrival : moment().subtract(1, 'seconds').format('HH:mm:ss')
            });
            expect(sut.get('hasArrived')).toBeTruthy();
        });

        it("an arrival time in the future means that the train hasn't arrived", function() {
            sut = new TrainMovementSummaryModel([], {
                arrival : moment().add(10, 'seconds').format('HH:mm:ss')
            });
            expect(sut.get('hasArrived')).toBeFalsy();
        });

        it("a departure time in the past means that the train has departed", function() {
            sut = new TrainMovementSummaryModel([], {
                departure : moment().subtract(1, 'seconds').format('HH:mm:ss')
            });
            expect(sut.get('hasDeparted')).toBeTruthy();
        });

        it("a departure time in the future means that the train hasn't departed", function() {
            sut = new TrainMovementSummaryModel([], {
                departure : moment().add(10, 'seconds').format('HH:mm:ss')
            });
            expect(sut.get('hasDeparted')).toBeFalsy();
        });

        // TODO Implement test & Fix the case when the departure is on the following day
    });
});
});
