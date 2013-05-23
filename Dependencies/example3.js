Hydra.module.register('example3', function(bus){
  return {
    init: function(){
      console.log('init example3');
    }
  };
}).start();