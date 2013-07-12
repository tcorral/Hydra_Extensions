(function ( win, Hydra )
{
  'use strict';
  var Profiler = function ()
  {
  };
  Profiler.prototype = {
    subscribersCount: function ( bShowEvents )
    {
      var nSubscribers = 0,
        oCurrentChannel,
        sChannel,
        sEvent,
        oEvents = {},
        nLenSubscribers,
        oChannels = Hydra.getCopyChannels();

      for ( sChannel in oChannels )
      {
        if ( oChannels.hasOwnProperty( sChannel ) )
        {
          oCurrentChannel = oChannels[sChannel];
          for ( sEvent in oCurrentChannel )
          {
            if ( oCurrentChannel.hasOwnProperty( sEvent ) )
            {
              nLenSubscribers = oCurrentChannel[sEvent].length;
              oEvents[sChannel + '|' + sEvent] = nLenSubscribers;
              nSubscribers += nLenSubscribers;
            }
          }
        }
      }
      if ( bShowEvents )
      {
        oEvents.TOTAL = nSubscribers;
        return oEvents;
      }
      return nSubscribers;
    },
    modulesCount: function ( bShowModules )
    {
      var nInstances = 0,
        sModule,
        oModules = Hydra.getCopyModules(),
        nLenModules,
        oModulesToShow = {};
      for ( sModule in oModules )
      {
        if ( oModules.hasOwnProperty( sModule ) )
        {
          nLenModules = Object.keys( oModules[sModule].instances ).length;
          oModulesToShow[sModule] = nLenModules;
          nInstances += nLenModules;
        }
      }
      if ( bShowModules )
      {
        oModules.TOTAL = nInstances;
        return oModules;
      }
      return nInstances;
    }
  };

  Hydra.extend( "profiler", new Profiler() );
}( window, Hydra ));