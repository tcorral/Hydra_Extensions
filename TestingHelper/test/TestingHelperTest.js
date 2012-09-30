/*global assertTrue, window, document, TestCase, assertEquals, assertFunction, assertException, jstestdriver*/
(function(win, doc, Hydra, und)
{
	'use strict';
	var oTestCase = TestCase;

	oTestCase('HydraSetTestFrameworkTest', sinon.testCase({
		setUp: function(){},
		tearDown: function(){},
		'test should check that setTestFramework exist in Hydra': function()
		{
			assertFunction(Hydra.setTestFramework);
		},
		'test should check that setTestFramework expects one argument': function()
		{
			assertEquals(1, Hydra.setTestFramework.length);
		}
	}));

	oTestCase('HydraGetModuleTest', sinon.testCase({
		setUp: function(){
			sinon.stub(Hydra.module, "getInstance");
		},
		tearDown: function(){
			Hydra.module.getInstance.restore();
		},
		'test should throw an error if the module to get instance has not been registered before': function()
		{
			assertException(function()
			{
				Hydra.setTestFramework(jstestdriver);

				Hydra.module.getModule('test', 'test2');
			});
		},
		'test should check that Hydra.module.getInstance is called if the framework of test has been set before': function()
		{
			Hydra.setTestFramework(jstestdriver);
			Hydra.module.register('test', function(action)
			{
				return {};
			});

			Hydra.module.getModule('test', 'test2');

			assertEquals(1, Hydra.module.getInstance.callCount);
			Hydra.setTestFramework(null);
		},
		'test should check that Hydra.module.getInstance is not called if the framework of test has not been set before': function()
		{
			Hydra.module.register('test', function(action)
			{
				return {};
			});
			Hydra.module.getModule('test', 'test2');

			assertEquals(0, Hydra.module.getInstance.callCount);
		}
	}));

	oTestCase( "HydraModuleTestTest", sinon.testCase( {
		setUp: function () {
			var self = this;
			Hydra.setTestFramework(jstestdriver);
			this.sModuleId = 'test';
			this.fpCallback = sinon.stub();
			this.fpDestroyStub = sinon.stub();
			this.fpModuleCreator = function ( oAction ) {
				return {
					init: function () {

					},
					handleAction: function () {

					},
					destroy: function () {
						self.fpDestroyStub();
					}
				}
			};
			Hydra.module.register( this.sModuleId, this.fpModuleCreator );
		},
		tearDown: function () {
			Hydra.module.remove( this.sModuleId );
		},
		"test should call the callback": function () {
			Hydra.module.test( this.sModuleId, this.fpCallback );

			assertTrue( this.fpCallback.calledOnce );
		}
	} ) );
}(window, document, Hydra));
