(function ( win, Hydra ) {
	'use strict';
	var Action,
		oActions,
		sNotDefined = 'undefined',
		_null_ = null;
	/**
	 * Property that will save the actions to be listened
	 * @private
	 * @type {Object}
	 */
	oActions = {};
	/**
	 * Mediator/Bus class that manages the listeners and notifications
	 * @constructor
	 * @deprecated
	 * @class Action
	 * @name Action
	 */
	Action = function () {};

	Action.prototype = {
		/**
		 * type is a property to be able to know the class type.
		 * @member Action.prototype
		 * @type String
		 */
		type: 'Action',
		/**
		 * listen is the method that will add a new action to the oActions object
		 * and that will activate the listener.
		 * @member Action.prototype
		 * @param {Array} aNotificationsToListen
		 * @param {Function} fpHandler
		 * @param {Object} oModule
		 */
		listen: function ( aNotificationsToListen, fpHandler, oModule ) {
			var sNotification, nNotification, nLenNotificationsToListen;
			sNotification = '';
			nLenNotificationsToListen = aNotificationsToListen.length;

			for ( nNotification = 0; nNotification < nLenNotificationsToListen; nNotification = nNotification + 1 ) {
				sNotification = aNotificationsToListen[nNotification];
				if ( typeof oActions[sNotification] === 'undefined' ) {
					oActions[sNotification] = [];
				}
				oActions[sNotification].push( {
					module: oModule,
					handler: fpHandler
				} );
			}
		},
		/**
		 * notify is the method that will launch the actions that are listening the notified action
		 * @member Action.prototype
		 * @param oNotifier - Notifier.type and Notifier.data are needed
		 */
		notify: function ( oNotifier ) {
			var sType, oAction, aActions, nAction, nLenActions, oLog;
			oLog = {};
			sType = oNotifier.type;
			oAction = _null_;

			if ( typeof oActions[sType] === sNotDefined ) {
				return;
			}
			// Duplicate actions array in order to avoid broken references when removing listeners.
			aActions = oActions[sType].slice();
			nLenActions = aActions.length;

			if ( Hydra.getDebug() ) {
				oLog.type = sType;
				oLog.executed = { calls: nLenActions, actions: aActions };
				Hydra.errorHandler().log( sType, oLog );
			}

			for ( nAction = 0; nAction < nLenActions; nAction = nAction + 1 ) {
				oAction = aActions[nAction];
				oAction.handler.call( oAction.module, oNotifier );
			}


			sType = aActions = nAction = nLenActions = oAction = _null_;
		},
		/**
		 * stopListen removes the actions that are listening the aNotificationsToStopListen in the oModule
		 * @member Action.prototype
		 * @param {Array} aNotificationsToStopListen
		 * @param {Object} oModule
		 */
		stopListen: function ( aNotificationsToStopListen, oModule ) {
			var sNotification, aAuxActions, nNotification, nLenNotificationsToListen, nAction, nLenActions;
			sNotification = '';
			aAuxActions = [];
			nLenNotificationsToListen = aNotificationsToStopListen.length;
			nAction = 0;
			nLenActions = 0;

			for ( nNotification = 0; nNotification < nLenNotificationsToListen; nNotification = nNotification + 1 ) {
				aAuxActions = [];
				sNotification = aNotificationsToStopListen[nNotification];
				nLenActions = oActions[sNotification].length;
				for ( nAction = 0; nAction < nLenActions; nAction = nAction + 1 ) {
					if ( oModule !== oActions[sNotification][nAction].module ) {
						aAuxActions.push( oActions[sNotification][nAction] );
					}
				}
				oActions[sNotification] = aAuxActions;
				if ( oActions[sNotification].length === 0 ) {
					delete oActions[sNotification];
				}
			}

			sNotification = aAuxActions = nNotification = nLenNotificationsToListen = nAction = nLenActions = _null_;
		},
		/**
		 * __restore__ is a private method to reset the oActions object to an empty object.
		 * @private
		 * @member Action.prototype
		 */
		__restore__: function () {
			oActions = {};
		}
	};
	/**
	 * action is a method to get a new instance of Action
	 * @static
	 * @member Hydra
	 * @return {Action} Action instance
	 */
	Hydra.extend('action', function () {
		return new Action();
	});
}( window, Hydra ));