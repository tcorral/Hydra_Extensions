(function (win, doc, Hydra)
{
  'use strict';

  TestCase( 'Hydra events delegated existe', sinon.testCase( {
    'test should check that Hydra.events is an object': function ()
    {
      assertObject(Hydra.events);
      assertObject(Hydra.events.delegated);
    }
  } ) );

  TestCase( 'Hydra delegate-base-module is registered', sinon.testCase( {
    setUp: function ()
    {
      this.oModules = Hydra.getCopyModules();
    },
    tearDown: function ()
    {
      delete this.oModules;
    },
    'test should check that the module delegate-base-module has been registered': function ()
    {
      assertObject( this.oModules['delegate-base-module'] );
    }
  } ) );

  TestCase( 'Hydra delegate-base-module constructor', sinon.testCase( {
    setUp: function ()
    {
      this.oModule = Hydra.module.getInstance('delegate-base-module');
    },
    tearDown: function ()
    {
      Hydra.module.stop( 'delegate-base-module' );
      delete this.oModule;
    },
    'test should check that domEvents is an object': function ()
    {
      assertObject( this.oModule.domEvents );
    },
    'test should check that _generatedCallbacks is an object': function ()
    {
      assertObject( this.oModule._generatedCallbacks );
    },
    'test should check that _getDelegatedCallback is a function': function ()
    {
      assertFunction( this.oModule._getDelegatedCallback );
    },
    'test should check that _delegateToDocument is a function': function ()
    {
      assertFunction( this.oModule._delegateToDocument );
    },
    'test should check that _undelegateFromDocument is a function': function ()
    {
      assertFunction( this.oModule._undelegateFromDocument );
    },
    'test should check that init is a function': function ()
    {
      assertFunction( this.oModule.init );
    },
    'test should check that onDestroy is a function': function ()
    {
      assertFunction( this.oModule.onDestroy );
    }
  } ) );

  TestCase( 'Hydra delegate-base-module init', sinon.testCase( {
    setUp: function ()
    {
      this.oModule = Hydra.module.getInstance('delegate-base-module');
      this.stub( this.oModule, '_delegateToDocument' );
    },
    tearDown: function ()
    {
      Hydra.module.stop( 'delegate-base-module' );
      delete this.oModule;
    },
    'test should check that init method calls _delegateToDocument': function ()
    {
      this.oModule.init();
      assertEquals( 1, this.oModule._delegateToDocument.callCount );
    }
  } ) );

  TestCase( 'Hydra delegate-base-module onDestroy', sinon.testCase( {
    setUp: function ()
    {
      this.oModule = Hydra.module.getInstance('delegate-base-module');
      this.stub( this.oModule, '_undelegateFromDocument' );
    },
    tearDown: function ()
    {
      Hydra.module.stop( 'delegate-base-module' );
      delete this.oModule;
    },
    'test should check that onDestroy method calls _undelegateFromDocument': function ()
    {
      this.oModule.onDestroy();
      assertEquals( 1, this.oModule._undelegateFromDocument.callCount );
    }
  } ) );

  TestCase( 'Hydra delegate-base-module _delegateToDocument', sinon.testCase( {
    setUp: function ()
    {
      this.oModule = Hydra.module.getInstance('delegate-base-module');
      this.stub( Hydra.bus, 'subscribeTo' );
    },
    tearDown: function ()
    {
      Hydra.module.stop( 'delegate-base-module' );
      Hydra.events.delegated = {};
      delete this.oModule;
    },
    'test should check that _delegateToDocument method calls Bus.subscribeTo if it has a domEvents object has at least one event and it should set the event in Hydra.events.delegated': function ()
    {
      this.oModule.domEvents = {
        'click document': function(){}
      };

      this.oModule._delegateToDocument();

      assertEquals( 1, Hydra.bus.subscribeTo.callCount );
      assertTrue( Hydra.events.delegated['document:click'] );
    },
    'test should check that _delegateToDocument method calls Bus.subscribeTo if it has a domEvents object has at least one event and it should not set the event in Hydra.events.delegated': function ()
    {
      this.oModule.domEvents = {};

      this.oModule._delegateToDocument();

      assertEquals( 0, Hydra.bus.subscribeTo.callCount );
      assertUndefined( Hydra.events.delegated['document:click'] );
    }
  } ) );

  TestCase( 'Hydra delegate-base-module _undelegateFromDocument', sinon.testCase( {
    setUp: function ()
    {
      this.oModule = Hydra.module.getInstance('delegate-base-module');
      this.stub( Hydra.bus, 'unsubscribeFrom' );
    },
    tearDown: function ()
    {
      Hydra.module.stop( 'delegate-base-module' );
      Hydra.events.delegated = {};
      delete this.oModule;
    },
    'test should check that _undelegateFromDocument method calls Bus.unsubscribeFrom if a callback was registered': function ()
    {
      this.oModule._generatedCallbacks = {
        'click document': function(){}
      };

      this.oModule._undelegateFromDocument();

      assertEquals( 1, Hydra.bus.unsubscribeFrom.callCount );
    }
  } ) );

  TestCase( 'Hydra delegate-base-module _getDelegatedCallback', sinon.testCase( {
    setUp: function ()
    {
      this.oModule = Hydra.module.getInstance('delegate-base-module');
      this.fpCallback = this.stub();
    },
    tearDown: function ()
    {
      this.oModule._generatedCallbacks = {};
      delete this.oModule;
      delete this.fpCallback;
    },
    'test should check that _getDelegatedCallback returns a function and should set the generated callback': function ()
    {
      var fpCallback = this.oModule._getDelegatedCallback( 'click', 'document', this.fpCallback );

      assertFunction( fpCallback );
    },
    'test should check that the callback returned by _getDelegatedCallback executes the supplied callback if the node exist': function ()
    {
      var fpCallback = this.oModule._getDelegatedCallback( 'click', 'document', this.fpCallback );

      fpCallback( {
        target: document
      } );

      assertEquals( 1, this.fpCallback.callCount );
    },
    'test should check that the callback returned by _getDelegatedCallback does not execute the supplied callback if the node does not exist': function ()
    {
      var fpCallback = this.oModule._getDelegatedCallback( 'click', '.test', this.fpCallback );

      fpCallback( {
        target: document
      } );

      assertEquals( 0, this.fpCallback.callCount );
    }
  } ) );
}(window, document, Hydra));