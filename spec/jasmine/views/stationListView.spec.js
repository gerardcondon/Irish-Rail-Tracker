define([
    'jquery',
    'views/stationListView'
], function($, StationListView) {

    describe("Station List View", function() {
        describe("render", function() {
            var el;
            var sut;
            var stationSideBarStub;
            var mainDiv;

            beforeEach(function() {
                stationSideBarStub = {
                    render : jasmine.createSpy().andReturn({el : {}})
                };

                stationAccordionView = {
                    render : jasmine.createSpy().andReturn({el : {}})
                };

                sut = new StationListView({sideBarConstructor : function(){return stationSideBarStub}});
                el = sut.render().el;
                mainDiv = $('<span></span>');
                mainDiv.append(el);
            });

            it("should create a Station List Div", function() {
                expect(mainDiv.find("div[id^=station-list-main-div]")[0]).toBeTruthy();
            });

            it("should render a Station List Accordion View", function() {
                expect(stationAccordionView.render).toHaveBeenCalled();
                //expect($(el)).toContain("#station-list-accordion");
            });
          
            it("should render a Station List SideBar View", function() {
                expect(stationSideBarStub.render).toHaveBeenCalled();
                //expect($(el)).toContain("#station-list-sidebar");
            });
        });
    });

});