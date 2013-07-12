(function ( win, doc, Hydra )
{
  'use strict';
  TestCase( 'Profiler subscribersCount', sinon.testCase( {
    setUp: function ()
    {
      Hydra.module.remove( 'test' );
      Hydra.bus.reset();
    },
    tearDown: function ()
    {
    },
    'test should check that subscribersCount returns 0 if there are no modules started even if they are registered': function ()
    {
      Hydra.module.register( 'test', function ()
      {
        return {
          events: {
            global: {
              'test': function ()
              {
              }
            }
          }
        }
      } );
      assertEquals( 0, Hydra.profiler.subscribersCount() );
    },
    'test should check that subscribersCount returns 1 if a module is started with the current signature': function ()
    {
      Hydra.module.register( 'test', function ()
      {
        return {
          events: {
            global: {
              'test': function ()
              {
              }
            }
          }
        }
      } );
      Hydra.module.start( 'test' );
      assertEquals( 1, Hydra.profiler.subscribersCount() );
    },
    'test should check that if we call subscribersCount with a true param it will return an object with all the events and the number of subscribers': function ()
    {
      var oSubscribers;
      Hydra.module.register( 'test', function ()
      {
        return {
          events: {
            global: {
              'test': function ()
              {
              }
            }
          }
        }
      } );
      Hydra.module.start( 'test' );
      oSubscribers = Hydra.profiler.subscribersCount( true );
      assertObject( oSubscribers );
      assertEquals( 1, oSubscribers.TOTAL );
      assertEquals( 1, oSubscribers['global|test'] );
    }
  } ) );

  TestCase( 'Profiler modulesCount', sinon.testCase( {
    setUp: function ()
    {
      Hydra.module.remove( 'test' );
    },
    tearDown: function ()
    {
    },
    'test should check that modulesCount returns 0 if there are no modules registered': function ()
    {
      assertEquals( 0, Hydra.profiler.modulesCount() );
    },
    'test should check that modulesCount returns 0 if there are modules registered but no started': function ()
    {
      Hydra.module.register( 'test', function ()
      {
        return {
          events: {
            global: {
              'test': function ()
              {
              }
            }
          }
        }
      } );
      assertEquals( 0, Hydra.profiler.modulesCount() );
    },
    'test should check that modulesCount returns 1 if a module is registered and started': function ()
    {
      Hydra.module.register( 'test', function ()
      {
        return {
          events: {
            global: {
              'test': function ()
              {
              }
            }
          }
        }
      } );
      Hydra.module.start( 'test' );
      assertEquals( 1, Hydra.profiler.modulesCount() );
    },
    'test should check that modulesCount returns 2 if a module is registered but is started two times': function ()
    {
      Hydra.module.register( 'test', function ()
      {
        return {
          events: {
            global: {
              'test': function ()
              {
              }
            }
          }
        }
      } );
      Hydra.module.start( 'test' );
      Hydra.module.start( 'test' );
      assertEquals( 2, Hydra.profiler.modulesCount() );
    },
    'test should check that if we call modulesCount with a true param it will return an object with all the modules and the number of modules instanciated': function ()
    {
      var oModules;
      Hydra.module.register( 'test', function ()
      {
        return {
          events: {
            global: {
              'test': function ()
              {
              }
            }
          }
        }
      } );
      Hydra.module.start( 'test' );
      oModules = Hydra.profiler.modulesCount( true );
      assertObject( oModules );
      assertEquals( 1, oModules.TOTAL );
      assertEquals( 1, Object.keys( oModules.test.instances ).length );
    },
    'test should check that if we call modulesCount with a true param it will return an object with all the modules and the number of modules instanciated called two times': function ()
    {
      var oModules;
      Hydra.module.register( 'test', function ()
      {
        return {
          events: {
            global: {
              'test': function ()
              {
              }
            }
          }
        }
      } );
      Hydra.module.start( 'test' );
      Hydra.module.start( 'test' );
      oModules = Hydra.profiler.modulesCount( true );
      assertEquals( 2, oModules.TOTAL );
      assertEquals( 2, Object.keys( oModules.test.instances ).length );
    }
  } ) );
}( window, document, Hydra ));