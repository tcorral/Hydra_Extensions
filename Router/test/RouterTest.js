(function ( Hydra ) {
	'use strict';
	TestCase( "HydraRouterTest", sinon.testCase( {
		setUp: function () {},
		tearDown: function () {},
		'test should check that router exist': function () {
			assertObject(Hydra.router);
		}
	} ) );
	TestCase("HydraRouterAddTest", sinon.testCase({
		setUp: function () {},
		tearDown: function () {},
		'test should check that router.add is a function': function () {
			assertFunction(Hydra.router.add);
		},
		'test should check that router.add must receive two arguments': function () {
			assertEquals(2, Hydra.router.add.length);
		},
		'test should execute the added callback if the id of the body is the same as defined': function()
		{
			document.body.id = 'test';
			var oStub = sinon.stub();

			Hydra.router.add('test', oStub);

			window.onload = function()
			{
				assertEquals(1, oStub.callCount);
			};
		}
	}));
	TestCase("HydraSetDefaultTest", sinon.testCase({
		setUp: function(){},
		tearDown: function(){},
		'test should check that router.setDefault is a function': function() {
			assertFunction(Hydra.router.setDefault);
		},
		'test should check that router.setDefault must receive one argument': function() {
			assertEquals(1, Hydra.router.setDefault.length);
		},
		'test should execute the default callback if the id of the body has not match': function () {
			var oStub = sinon.stub(),
				oStub2 = sinon.stub();
			document.body.id = 'invalid';
			Hydra.router.add('home', oStub2);

			Hydra.router.setDefault('test', oStub);

			window.onload = function()
			{
				assertEquals(1, oStub.callCount);
			};
		}
	}));
}( Hydra ));