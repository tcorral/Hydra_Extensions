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
}( Hydra ));