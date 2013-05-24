(function ( Hydra ) {
  'use strict';
  var module, start, injectJquery;
  injectJquery = function(callback) {
    if(typeof jQuery === 'undefined'){
      var script = document.createElement("script");
      var head = document.getElementsByTagName('head')[0];
      script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
      /* If you need callback */
      script.onload = script.onreadystatechange = callback || function(){ };
      /* end */
      head.insertBefore( script, head.childNodes[0] );
    }
  };
  start = Hydra.module.start;
  module = Hydra.module;
  Hydra.module.start = function(sModule, sIdInstance, oData, bSingle){
    var oMod = Hydra.module.getInstance(sModule);
    if(oMod.element){
      injectJquery( function(){
        start.call(module, sModule, sIdInstance, oData, bSingle, function(oModule){
          var init = oModule.init;
          oModule.init = function(){
            var key, events = oModule.events, aParts;
            for(key in events){
              if(events.hasOwnProperty(key)){
                aParts = key.split(" ");
                jQuery(oModule.element).on(aParts[0], aParts[1], events[key]);
              }
            }
            init.apply(this, arguments);
          };
        });
      });
    }else{
      start.call(module, sModule, sIdInstance, oData, bSingle);
    }
  };
}( Hydra ));