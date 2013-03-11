define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap'
    ], function($, _, Backbone, BootStrap){

    var createViewStub = function() {
        var stub = {};
        stub.render = jasmine.createSpy().andReturn(stub);
        stub.setElement = jasmine.createSpy().andReturn(stub);
        return stub;
    };

    return {
        createViewStub : createViewStub
    };
});
