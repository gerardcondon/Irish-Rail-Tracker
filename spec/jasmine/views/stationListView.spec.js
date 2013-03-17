define([
    'jquery',
    'views/stationListView',
    'jasmine/views/viewSpecHelper'
], function($, StationListView, helper) {

    describe("Station List View", function() {
        describe("render", function() {
            var el;
            var sut;
            var stationSideBarStub;
            var stationAccordionViewStub;
            var mainDiv;

            beforeEach(function() {
                stationSideBarStub = helper.createViewStub();
                stationAccordionViewStub = helper.createViewStub();

                sut = new StationListView({
                    sideBarConstructor : function(){return stationSideBarStub},
                    stationAccordionConstructor : function(){return stationAccordionViewStub}
                });
                el = sut.render().el;
                mainDiv = $('<span></span>');
                mainDiv.append(el);
            });

            it("should create a Station List Div", function() {
                expect(mainDiv.find("div[id^=station-list-main-div]")[0]).toBeTruthy();
            });

            it("should render a Station List Accordion View", function() {
                expect(stationAccordionViewStub.render).toHaveBeenCalled();
            });
          
            it("should render a Station List SideBar View", function() {
                expect(stationSideBarStub.render).toHaveBeenCalled();
            });
        });
    });

});