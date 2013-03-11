define([
    'jquery',
    'backbone',
    'views/stationAccordionView',
    'jasmine/views/viewSpecHelper'
], function($, Backbone, StationAccordionView, helper) {

    describe("Station Accordion View", function() {
        var sut;
        var sutModel;
        var constructor;
        var accordionGroupStub;

        beforeEach(function() {
            sutModel = new Backbone.Model();
            accordionGroupStub = helper.createViewStub();

            sut = new StationAccordionView({model : sutModel, 
                stationAccordionGroupConstructor : function(){return accordionGroupStub}});
        });

        describe("model", function() {
            it("when the model adds a new Station Collection, then the view adds a StationAccordionGroupView child", function() {
                var stub = { id : "TEST_STUB" };
                sutModel.trigger("add", stub);
                expect(accordionGroupStub.render).toHaveBeenCalled();
            });
        });

        describe("render", function() {
            beforeEach(function() {
            });

            it("should create a Station Accordion Element", function() {
                var mainDiv;
                el = sut.render().el;
                mainDiv = $('<span></span>');
                mainDiv.append(sut.el);
                expect(mainDiv.find("div[id^=station-list-accordion]")[0]).toBeTruthy();
            });
        });
    });

});