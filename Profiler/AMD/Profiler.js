define(['hydra'], function(Hydra){
	'use strict';
  var Profiler = function(){};
  Profiler.prototype = {
    subscribersCount: function(){
      var nSubscribers = 0,
        oCurrentChannel,
        sChannel,
        sEvent,
        oChannels = Hydra.getCopyChannels();
      for(sChannel in oChannels){
        if(oChannels.hasOwnProperty(sChannel)){
          oCurrentChannel = oChannels[sChannel];
          for(sEvent in oCurrentChannel){
            if(oCurrentChannel.hasOwnProperty(sEvent)){
              nSubscribers += oCurrentChannel[sEvent].length;
            }
          }
        }
      }
      return nSubscribers;
    },
    modulesCount: function(){
      var nInstances = 0,
        sModule,
        oModules = Hydra.getCopyModules();
      for(sModule in oModules){
        if(oModules.hasOwnProperty(sModule)){
          nInstances += Object.keys(oModules[sModule].instances ).length;
        }
      }
      return nInstances;
    }
  };

  Hydra.extend("profiler", new Profiler());
});