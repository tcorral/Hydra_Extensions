/*global window, document, TestCase, assertFunction, assertEquals*/
(function ( Hydra ) {
	'use strict';
	var oTestCase = TestCase;

	oTestCase( 'HydraSandboxTest', sinon.testCase({
		setUp: function () {},
		tearDown: function () {},
		"test should return a function for action property of Hydra": function () {
			assertFunction( Hydra.action );
		}
	} ) );
	oTestCase( "HydraActionTest", sinon.testCase( {
		setUp: function () {},
		tearDown: function () {},
		"test should return the Action Class": function () {
			var oResult;
			oResult = Hydra.action();

			assertEquals( "Action", oResult.type );
		}
	} ) );
	oTestCase( "HydraActionListenTest", sinon.testCase( {
		setUp: function () {
			this.sListener = 'test';
			this.fpHandler = sinon.stub();
			this.oModule = {
				init: function () {},
				handleAction: this.fpHandler,
				destroy: function () {}
			};
			this.oAction = new Hydra.action();
			this.oAction.__restore__();
		},
		tearDown: function () {
			this.oAction.__restore__();
		},
		"test should not call fpHandler if notify is launched before set the listeners": function () {
			this.oAction.notify( [this.sListener], {type: this.sListener} );

			assertEquals( 0, this.fpHandler.callCount );
		},
		"test should call fpHandler if notify is launched after set the listeners": function () {
			this.oAction.listen( [this.sListener], this.fpHandler, this.oModule );

			this.oAction.notify( {type: this.sListener} );

			assertEquals( 1, this.fpHandler.callCount );
		}
	} ) );

	oTestCase( "HydraActionNotifyTest", sinon.testCase( {
		setUp: function () {
			this.oAction = Hydra.action();
			var self = this;
			this.fpListen = sinon.stub();
			this.sListener = 'test';
			this.sOtherListener = 'test2';
			this.nData = 1;
			this.oNotifier = {
				type: this.sListener,
				data: this.nData
			};
			this.oOtherNotifier = {
				type: this.sOtherListener,
				data: this.nData
			};
			this.fpHandler = function ( oAction ) {
				if ( oAction.type === self.sListener ) {
					self.fpListen();
				}
			};
			this.oModule = {
				init: function () {},
				handleAction: this.fpHandler,
				destroy: function () {}
			};
			this.oErrorHandler = Hydra.errorHandler();
			sinon.stub( this.oErrorHandler, "log" );
			this.oAction = Hydra.action();
			this.oAction.__restore__();
			this.oAction.listen( [this.sListener], this.fpHandler, this.oModule );
		},
		tearDown: function () {
			this.oErrorHandler.log.restore();
			this.oAction.__restore__();
		},
		"test should not call the fpListen callback if the action called is test2": function () {
			this.oAction.notify( this.oOtherNotifier );

			assertEquals( 0, this.fpListen.callCount );
		},
		"test should call the fpListen callback if the action called is test": function () {
			this.oAction.notify( this.oNotifier );

			assertTrue( this.fpListen.calledOnce );
		},
		"test should not call ErrorHandler.log if debug mode is off": function () {
			this.oAction.notify( this.oNotifier );

			assertEquals( 0, this.oErrorHandler.log.callCount );
		},
		"test should call ErrorHandler.log one time if debug mode is active": function () {
			var oCall;
			Hydra.setDebug( true );
			this.oAction.notify( this.oNotifier );
			oCall = this.oErrorHandler.log.getCall( 0 );

			assertEquals( 1, this.oErrorHandler.log.callCount );
			assertEquals( this.oNotifier.type, oCall.args[0] );
			assertEquals( this.oNotifier.type, oCall.args[1].type );
			assertEquals( 1, oCall.args[1].executed.calls );
			assertSame( this.oModule, oCall.args[1].executed.actions[0].module );
			assertSame( this.fpHandler, oCall.args[1].executed.actions[0].handler );
			Hydra.setDebug( false );
		}
	} ) );

	oTestCase( "HydraActionStopListenTest", sinon.testCase( {
		setUp: function () {
			this.oAction = Hydra.action();
			var self = this;
			this.fpListen = sinon.stub();
			this.sListener = 'test';
			this.nData = 1;
			this.oNotifier = {
				type: this.sListener,
				data: this.nData
			};
			this.fpHandler = function ( oAction ) {
				if ( oAction.type === self.sListener ) {
					self.fpListen();
				}
			};
			this.oModule = {
				init: function () {},
				handleAction: function () {
					self.fpHandler();
				},
				destroy: function () {}
			};
			this.oAction = Hydra.action();
			this.oAction.__restore__();
			this.oAction.listen( [this.sListener], this.fpHandler, this.oModule );
		},
		tearDown: function () {
			this.oAction.__restore__();
		},
		"test should call the fpListen callback if the action called is test if not stopListen": function () {
			this.oAction.notify( this.oNotifier );

			assertEquals( 1, this.fpListen.callCount );
		},
		"test should not call the fpListen callback if the action called is test if stopListen is called before": function () {
			this.oAction.stopListen( [this.sListener], this.oModule );

			this.oAction.notify( this.oNotifier );

			assertEquals( 0, this.fpListen.callCount );
		}
	} ) );
}( Hydra ));