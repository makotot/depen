const path = require('path'),
  fs = require('fs'),
  _ = require('lodash');


function createDepsList (pkgJSON) {
  var depList = [
    'dependencies',
    'devDependencies',
    'bundledDependencies',
    'optionalDependencies'
  ];

  return _.filter(depList, function (dep) {
    return pkgJSON[dep];
  });
}

function getDepPkgJSON (dependencies, dir, pkgJSON) {
  var pkgs = Object.keys(pkgJSON[dependencies]),
    moduleDir = path.resolve(dir, 'node_modules');

  var pkgJSONs = [];

  _.forEach(pkgs, function (pkg) {
    if (fs.existsSync(path.resolve(moduleDir, pkg, 'package.json'))) {
      pkgJSONs.push(require(path.resolve(moduleDir, pkg, 'package.json')));
    } else {
      pkgJSONs.push({
        name: pkg,
        version: '---',
        description: '---',
        homepage: '---'
      });
    }
  });

  return pkgJSONs;
}

function getDeps (pkgJSON, dir) {
  var name = pkgJSON.name,
    depsList = createDepsList(pkgJSON);

  var dep = _.map(depsList, function (dependepncy) {
    return {
      type: dependepncy,
      package: getDepPkgJSON(dependepncy, dir, pkgJSON)
    };
  });

  return {
    name: name,
    path: path.resolve(dir),
    dependency: dep
  };
}


module.exports = function (targetDir, cb) {
  var dir = targetDir ? path.resolve(targetDir) : path.resolve(process.cwd()),
    pkg = require(path.resolve(dir, 'package.json'));

  cb(null, getDeps(pkg, dir));
};

