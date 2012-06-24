define(['jquery', 'hydra'], function($, Hydra)
{
	'use strict';
	var oRoutes = {};
	$(document).ready(function () {
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
});