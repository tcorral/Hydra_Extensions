Hydra.module.register('example2', function(bus){
  return {
    dependencies: [
      {
        name: 'example3',
        data: null
      }
    ],
    init: function(){
      console.log('init example2');
    }
  };
}).start();