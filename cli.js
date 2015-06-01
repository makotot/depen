#!/usr/bin/env node

var fs = require('fs'),
  meow = require('meow'),
  chalk = require('chalk'),
  figures = require('figures'),
  depen = require('./');

var cli = meow({
  help: [
    'Usage',
    ' $ depen [-r] [project dir]'
  ].join('\n')
});


function printDeps (root, indent, shiftwidth) {

  depen(root, function (err, dependencies) {
    if (err) {
      throw err;
    }

    dependencies.dependency.forEach(function (dep) {
      var offset = Array(shiftwidth).join('  ');

      console.log(offset + figures.pointer, chalk.white.underline(dep.type));

      dep.package.forEach(function (package) {
        console.log(offset + indent, chalk.cyan(package.name), chalk.yellow(package.version));
        console.log(offset + indent + indent, chalk.gray(package.description ? package.description : '---'), chalk.magenta(package.homepage ? package.homepage : '---'));

        if (cli.flags['r']) {
          var innerpath = root + '/node_modules/' + package.name;
          if (fs.existsSync(innerpath)) {
            printDeps(innerpath, indent, shiftwidth + 2);
          }
        }

      });
      console.log('');
    });
  });

}

printDeps(cli.input[0] || '.', '   ', 0);
