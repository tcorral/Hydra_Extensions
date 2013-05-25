(function (Hydra) {
  'use strict';
  Hydra.addExtensionBeforeInit({
    'element': function (oModule, oData, bSingle) {
      var key, events = oModule.events, aParts;
      for (key in events) {
        if (events.hasOwnProperty(key)) {
          aParts = key.split(" ");
          jQuery(oModule.element).on(aParts[0], aParts[1], events[key]);
        }
      }
    }
  });
}(Hydra));