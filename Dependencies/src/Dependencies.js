(function(Hydra){
  var module, start, getPaths, getDatas;
  getPaths = function(arr){
    var paths = [],
      index,
      item,
      lenArr = arr.length;
    for(index = 0; index < lenArr; index++){
      item = arr[index];
      paths.push(Hydra.getPathsObject()[item.name]);
    }
    return paths;
  };
  getDatas = function(arr){
    var datas = [],
      index,
      item,
      lenArr = arr.length;
    for(index = 0; index < lenArr; index++){
      item = arr[index];
      datas.push(item.data);
    }
    return datas;
  };
  start = Hydra.module.start;
  module = Hydra.module;
  Hydra.module.start = function(sModule, sIdInstance, oData, bSingle){
    var fpBeforeInit = function(oModule){
      if(oModule.dependencies){
        var init = oModule.init;
        oModule.init = function(){
          var dependencies, paths, datas;
          dependencies = oModule.dependencies;
          paths = getPaths(dependencies);
          datas = getDatas(dependencies);
          require(paths, function(){
            start.call(module, paths, datas, oData, bSingle);
            init.apply(module, arguments);
          });
        };
      }
    };
    start.call(module, sModule, sIdInstance, oData, bSingle, fpBeforeInit);
  };

  Hydra.extend('getPathsObject', function(){
    return this.oPaths;
  });
  Hydra.extend('setPathsObject', function(oPaths){
    this.oPaths = oPaths;
    return this;
  });
  Hydra.extend('module', Hydra.module);

}(Hydra));