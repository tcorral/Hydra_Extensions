define(['hydra'], function (Hydra) {
  'use strict';
  var getPaths, getDatas, oPaths;
  getPaths = function (arr) {
    var paths = [],
      index,
      item,
      lenArr = arr.length;
    for (index = 0; index < lenArr; index++) {
      item = arr[index];
      if(oPaths && oPaths[item.name]){
        paths.push(oPaths[item.name]);
      }
    }
    return paths;
  };
  getDatas = function (arr) {
    var datas = [],
      index,
      item,
      lenArr = arr.length;
    for (index = 0; index < lenArr; index++) {
      item = arr[index];
      datas.push(item.data);
    }
    return datas;
  };
  start = Hydra.module.start;
  module = Hydra.module;

  Hydra.addExtensionBeforeInit({
    'dependencies': function (oModule, oData, bSingle) {
      var init = oModule.init;
      oModule.init = function () {
        var dependencies, paths, datas;
        dependencies = oModule.dependencies;
        paths = getPaths(dependencies);
        datas = getDatas(dependencies);
        require(paths, function () {
          start.call(module, paths, datas, oData, bSingle);
          init.apply(module, arguments);
        });
      };
    }
  });

  Hydra.extend('getPathsObject', function () {
    return oPaths;
  });
  Hydra.extend('setPathsObject', function (oPathsObject) {
    oPaths = oPathsObject;
    return this;
  });
});