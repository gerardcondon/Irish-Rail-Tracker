define([
    'jquery',
    'backbone',
    'views/stationAccordionGroupView',
    'jasmine/views/viewSpecHelper'
], function($, Backbone, StationAccordionGroupView, helper) {

    describe("Station Accordion Group View", function() {
        var sut;

        beforeEach(function() {
            sut = new StationAccordionGroupView({collection : 
                new Backbone.Collection([{description : "1"}, {description : "2"}]),
                dispatcher : jasmine.createSpyObj('dispatcher', ['trigger'])
            });
        });

        describe("render", function() {
            beforeEach(function() {
            });

            it("should create a Station Accordion Group Element", function() {
                var mainDiv;
                el = sut.render().el;
                mainDiv = $('<span></span>');
                mainDiv.append(sut.el);
                expect(mainDiv.find(".accordion-group")[0]).toBeTruthy();
            });

            //TODO Add tests for individual group items
        });
    });

});