define( ['domready', 'hydra'], function ( DomReady, Hydra ) {
	'use strict';
	var oRoutes = {},
		fpDefault;
	DomReady.ready( function () {
		var fpCallback = oRoutes[document.body.id];
		if ( typeof fpCallback !== 'undefined' ) {
			fpCallback();
		} else {
			fpDefault();
		}
	} );
	var Router = {
		add: function ( sIdRoute, fpCallback ) {
			oRoutes[sIdRoute] = fpCallback;
		},
		setDefault: function ( fpCallback ) {
			fpDefault = fpCallback;
		}
	};
	Hydra.extend( 'router', Router );
} );