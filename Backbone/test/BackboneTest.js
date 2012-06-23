(function ( win, doc, Hydra ) {
	'use strict';
	TestCase("BackbonePropertiesTest", sinon.testCase({
		setUp: function() {},
		tearDown: function(){},
		'test should check that events is same as Backbone.Events': function()
		{
			assertSame(Hydra.backbone.Events, Backbone.Events);
		},
		'test should check that history is same as Backbone.history': function()
		{
			assertSame(Hydra.backbone.history, Backbone.history);
		},
		'test should check that sync is same as Backbone.sync': function()
		{
			assertSame(Hydra.backbone.sync, Backbone.sync);
		},
		'test should check that emulateHTTP is same as Backbone.emulateHTTP': function()
		{
			assertSame(Hydra.backbone.emulateHTTP, Backbone.emulateHTTP);
		},
		'test should check that emulateJSON is same as Backbone.emulateJSON': function()
		{
			assertSame(Hydra.backbone.emulateJSON, Backbone.emulateJSON);
		},
		'test should check that Model is same as Backbone.Model': function()
		{
			assertSame(Hydra.backbone.Model, Backbone.Model);
		},
		'test should check that Collection is same as Backbone.Collection': function()
		{
			assertSame(Hydra.backbone.Collection, Backbone.Collection);
		},
		'test should check that router is same as Backbone.Router': function()
		{
			assertSame(Hydra.backbone.Router, Backbone.Router);
		},
		'test should check that view is same as Backbone.View': function()
		{
			assertSame(Hydra.backbone.View, Backbone.View);
		},
		'test should check that noConflict is same as Backbone.noConflict': function()
		{
			assertSame(Hydra.backbone.noConflict, Backbone.noConflict);
		},
		'test should check that setDomLibrary is same as Backbone.setDomLibrary': function()
		{
			assertSame(Hydra.backbone.setDomLibrary, Backbone.setDomLibrary);
		}
	}));
}( window, document, Hydra ));