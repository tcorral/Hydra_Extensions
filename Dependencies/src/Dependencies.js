(function(Hydra){
  var module, start, injectRequireJS, getPaths, getDatas;

  getPaths = function(arr){
    var paths = [],
      index,
      item,
      lenArr = arr.length;
    for(index = 0; index < lenArr; index++){
      item = arr[index];
      paths.push(basePathConfig[item.name]);
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
    var oMod, fpBeforeInit;
    oMod = Hydra.module.getInstance(sModule);
    fpBeforeInit = function(){};

    if(oMod.dependencies){
      fpBeforeInit = function(oModule){
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
      };
    }
    start.call(module, sModule, sIdInstance, oData, bSingle, fpBeforeInit);
  };
}(Hydra));