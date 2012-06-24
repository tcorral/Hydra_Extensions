define( ['jquery', 'hydra'], function ( $, Hydra ) {
	'use strict';
	var oRoutes = {},
		fpDefault;
	$( document ).ready( function () {
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