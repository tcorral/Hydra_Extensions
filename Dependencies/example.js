Hydra.module.register('example', function(bus){
  return {
    dependencies: [
      {
        name: 'example2',
        data: null
      }
    ],
    init: function(){
      console.log('init example');
    }
  };
}).start();