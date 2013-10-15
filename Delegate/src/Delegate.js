(function (Hydra)
{
  'use strict';
  /**
   * Events object to store the events that have been delegated
   * @static
   * @member Hydra
   * @type {object}
   */
  Hydra.extend( 'events', { delegated: {} } );

  /**
   * Boolean value that returns true if jQuery is available and false if it does not.
   * @type {boolean}
   */
  var hasJquery = typeof jQuery !== 'undefined';

  /**
   * Base Module to delegate events to document.
   */
  Hydra.module.register( 'delegate-base-module', function ( oBus )
  {
    return {
      /**
       * domEvents hold the events to be delegated
       * Uses the same system you can use in Backbone.js to delegate events.
       * i.e. "event selectorCSS3"  -> "click .layer"
       * @type {Object}
       */
      domEvents: {},
      /**
       * Object that stores all the generatedCallbacks to remove them when the module
       * is stopped.
       * @private
       * @type {Object}
       */
      _generatedCallbacks: {},
      /**
       * Returns a function to be used in delegation.
       * Checks if jQuery exist to return elements and checks for the element that
       * shares the CSS3 selector.
       * @param sEvent
       * @param sSelector
       * @param fpCallback
       * @returns {Function}
       * @private
       */
      _getDelegatedCallback: function( sEvent, sSelector, fpCallback )
      {
        if ( !fpCallback )
        {
          return function (){};
        }
        return ( this._generatedCallbacks[sEvent + ' ' + sSelector] = function( eEvent )
        {
          var oNodeList, aNodeList, oTarget = eEvent.target;
          if(hasJquery)
          {
            oNodeList = jQuery( sSelector, document );
          }else if ( document.querySelectorAll )
          {
            oNodeList = document.querySelectorAll( sSelector );
          }
          if( oNodeList.length === 0 && sSelector !== 'document')
          {
            return false;
          }
          aNodeList = getArray( oNodeList );
          while( oTarget !== document )
          {
            if( aNodeList.indexOf( oTarget ) !== -1 )
            {
              break;
            }
            oTarget = oTarget.parentNode;
          }
          if( oTarget === document && sSelector !== 'document' )
          {
            return false;
          }
          fpCallback.call( oTarget, eEvent);

        });
      },
      /**
       * Method that delegates events to document to improve memory usage.
       * An event is only attached one time to DOM. When the event is triggered
       * an Hydra.js event is triggered to notify all the modules that extends this.
       * @private
       */
      _delegateToDocument: function()
      {
        var sKey, sBusChannel = 'domEvents', oDomEvents = this.domEvents, aEventParts, sEvent, sBusEvent, sSelector;
        if ( oDomEvents )
        {
          for ( sKey in oDomEvents )
          {
            if ( oDomEvents.hasOwnProperty( sKey ) )
            {
              aEventParts = sKey.split(' ');
              sEvent = aEventParts[0];
              sSelector = aEventParts[1];
              sBusEvent = 'document:' + sEvent;
              if ( Hydra.events.delegated[sBusEvent] !== true )
              {
                addEvent( document, sEvent, function( eEvent )
                {
                  oBus.publish( sBusChannel, sBusEvent, eEvent );
                } );
                Hydra.events.delegated[sBusEvent] = true;
              }
              oBus.subscribeTo( sBusChannel, sBusEvent, this._getDelegatedCallback( sEvent, sSelector, oDomEvents[sKey] ), this );
            }
          }
        }
      },
      /**
       * Method that unbind events from document to improve memory usage.
       * @private
       */
      _undelegateFromDocument: function()
      {
        var sKey, sBusChannel = 'domEvents', oCallbacks = this._generatedCallbacks, sEvent, sBusEvent;
        for ( sKey in oCallbacks )
        {
          if ( oCallbacks.hasOwnProperty( sKey ) )
          {
            sEvent = sKey.split(' ')[0];
            sBusEvent = 'document:' + sEvent;

            oBus.unsubscribeFrom( sBusChannel, sBusEvent, oCallbacks[sKey], this );
          }
        }
      },
      /**
       * This method delegates the events to DOM when the module is started.
       */
      init: function ()
      {
        this._delegateToDocument();
      },
      /**
       * This method removes the events when the module is stopped.
       */
      onDestroy: function ()
      {
        this._undelegateFromDocument();
      }
    };
  } );
}(Hydra));