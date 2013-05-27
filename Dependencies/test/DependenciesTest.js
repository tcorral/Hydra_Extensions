(function (win, doc, Hydra) {
  'use strict';
  TestCase('HydraDependencies_starting_module', sinon.testCase({
    setUp: function(){
      sinon.spy(win, 'require');
      Hydra.setPathsObject({
        example: 'http://requirejs.org/docs/release/2.1.6/comments/require.js'
      });
    },
    tearDown: function(){
      win.require.restore();
      Hydra.module.remove('example');
    },
    'test should check that Hydra.module.oModifyInit has the key dependencies': function(){
      assertFunction(Hydra.module.oModifyInit.dependencies);
    },
    'test should check that require is called when starting': function(){
      assertEquals(0, win.require.callCount);
      Hydra.module.register('example', function(){
        return {
          dependencies: [{
            name: 'example',
            data: null
          }],
          init: function(){
            console.log('initialized');
          }
        }
      });
      Hydra.module.start('example');
      assertEquals(1, win.require.callCount);
    }
  }));
  TestCase('HydraDependencies_execute_callback', sinon.testCase({
    setUp: function(){
      this.dependencies = Hydra.module.oModifyInit.dependencies;
      Hydra.module.oModifyInit.dependencies = sinon.stub();
      Hydra.setPathsObject({
        example: 'http://requirejs.org/docs/release/2.1.6/comments/require.js'
      });
    },
    tearDown: function(){
      Hydra.module.oModifyInit.dependencies = this.dependencies;
      Hydra.module.remove('example');
    },
    'test should check that callback is executed': function(){
      assertEquals(0, Hydra.module.oModifyInit.dependencies.callCount);
      Hydra.module.register('example', function(){
        return {
          dependencies: [{
            name: 'example',
            data: null
          }],
          init: function(){
            console.log('initialized');
          }
        }
      });
      Hydra.module.start('example');
      assertEquals(1, Hydra.module.oModifyInit.dependencies.callCount);
    }
  }));
  TestCase('HydraDependencies_SetPathsObject', sinon.testCase({
    setUp: function(){
      Hydra.setPathsObject({
        example2: 'example2.js'
      });
    },
    tearDown: function(){},
    'test should check that setPathsObject exist': function(){
      assertFunction(Hydra.setPathsObject);
    },
    'test should check that setPathsObject stores the object passed as argument': function(){

      var result = Hydra.getPathsObject();
      assertEquals('example2.js', result.example2);
    }
  }));
  TestCase('HydraDependencies_GetPathObject', sinon.testCase({
    setUp: function(){
      Hydra.setPathsObject({
        example3: 'example3.js'
      });
    },
    tearDown: function(){
      Hydra.setPathsObject({});
    },
    'test should check that getPathsObject exist': function(){
      assertFunction(Hydra.getPathsObject);
    },
    'test should check that Hydra.getPathsObject return the correct paths': function(){
      var result = Hydra.getPathsObject();
      assertEquals('example3.js', result.example3);
    }
  }));
}(window, document, Hydra));