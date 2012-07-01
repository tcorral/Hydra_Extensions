(function ( win, doc, Hydra ) {
	'use strict';
	TestCase( "HydraAjaxCallTest", sinon.testCase( {
		setUp: function () {
			sinon.stub( Ajax, 'Request' );
			this.oConfig = {};
		},
		tearDown: function () {
			Ajax.Request.restore();
		},
		'test should call jQuery ajax with the config': function () {
			Hydra.ajax.call( this.oConfig );

			assertEquals( 1, Ajax.Request.callCount );
			assertSame( this.oConfig, Ajax.Request.getCall( 0 ).args[1] );
		}
	} ) );

	TestCase( "HydraAjaxGetJSONTest", sinon.testCase( {
		setUp: function () {
			sinon.stub( Ajax, 'Request' ).yieldsTo("onSuccess");
			this.oConfig = {};
		},
		tearDown: function () {
			Ajax.Request.restore();
		},
		'test should call jQuery ajax with the config and dataType is json': function () {
			var sUrl = 'http://www.google.es',
				fpOnSuccess = sinon.stub(),
				sData = '';

			Hydra.ajax.getJSON( sUrl, fpOnSuccess, sData );

			assertEquals( 1, Ajax.Request.callCount );
			assertEquals( sUrl, Ajax.Request.getCall( 0 ).args[0] );
			assertEquals(1, fpOnSuccess.callCount );
			assertEquals( sData, Ajax.Request.getCall( 0 ).args[1].parameters );
		}
	} ) );

	TestCase( "HydraAjaxGetScriptTest", sinon.testCase( {
		setUp: function () {
			sinon.stub( Ajax, 'Request' ).yieldsTo("onSuccess");
			this.oConfig = {};
		},
		tearDown: function () {
			Ajax.Request.restore();
		},
		'test should call jQuery ajax with the config and dataType is script': function () {
			var sUrl = 'http://www.google.es',
				fpOnSuccess = sinon.stub();
			Hydra.ajax.getScript( sUrl, fpOnSuccess );

			assertEquals( 1, Ajax.Request.callCount );
			assertSame( sUrl, Ajax.Request.getCall( 0 ).args[0] );
			assertEquals(1, fpOnSuccess.callCount );
		}
	} ) );
}( window, document, Hydra ));