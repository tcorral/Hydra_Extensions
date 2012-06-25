(function ( Hydra, DomReady ) {
	'use strict';
	var oRoutes = {},
		fpDefault = function() {};
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
}( Hydra, DomReady ));