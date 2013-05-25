(function (win, doc, Hydra) {
  'use strict';
  TestCase('HydraDependencies_starting_module', sinon.testCase({
    setUp: function(){
      this.spy(window, "jQuery");
      this.spy(jQuery.fn, "on");
    },
    tearDown: function(){
    },
    'test should check that Hydra.module.oModifyInit has the key element': function(){
      assertFunction(Hydra.module.oModifyInit.element);
    },
    'test should check that jQuery is called when starting a widget module': function(){
      Hydra.module.register('example', function(){
        return {
          element: document.body,
          events: {
            'click': function(event){
              console.log('click in body');
            }
          },
          init: function(){
            console.log('initialized');
          }
        }
      });
      Hydra.module.start('example');
      assertEquals(1, jQuery.callCount);
      assertEquals(1, jQuery.fn.on.callCount);
    }
  }));
}(window, document, Hydra));