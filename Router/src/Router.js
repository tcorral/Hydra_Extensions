(function ( Hydra, DomReady ) {
	'use strict';
	var oRoutes = {};
	DomReady.ready(function () {
		var fpCallback = oRoutes[document.body.id];
		if ( typeof fpCallback !== 'undefined' ) {
			fpCallback();
		}
	});
	var Router = {
		add: function ( sIdRoute, fpCallback ) {
			oRoutes[sIdRoute] = fpCallback;
		}
	};
	Hydra.extend( 'router', Router );
}( Hydra, DomReady ));