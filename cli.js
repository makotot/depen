#!/usr/bin/env node

var meow = require('meow'),
  chalk = require('chalk'),
  figures = require('figures'),
  depen = require('./');

var cli = meow({
  help: [
    'Usage',
    ' $ depen <project dir>'
  ].join('\n')
});



depen(cli.input[0], function (err, dependencies) {
  if (err) {
    console.log(err);
  }

  dependencies.dependency.forEach(function (dep) {
    console.log(figures.pointer, chalk.white.underline(dep.type));

    dep.package.forEach(function (package) {
      console.log('   ', chalk.blue(package.name), chalk.yellow(package.version));
      console.log('     ', chalk.gray(package.description ? package.description : '---'), chalk.magenta(package.homepage ? package.homepage : '---'));
    });
    console.log('');
  });
});

