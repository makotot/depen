# Depen

[![npm version](http://img.shields.io/npm/v/depen.svg?style=flat-square)](https://www.npmjs.com/package/depen)
[![travis](http://img.shields.io/travis/makotot/depen.svg?style=flat-square)](https://travis-ci.org/makotot/depen)
[![dependencies](http://img.shields.io/david/makotot/depen.svg?style=flat-square)](https://github.com/makotot/depen)
[![devDependencies](http://img.shields.io/david/dev/makotot/depen.svg?style=flat-square)](https://github.com/makotot/depen)
[![License](http://img.shields.io/npm/l/depen.svg?style=flat-square)](https://github.com/makotot/depen)

> Get the infomation of dependencies in the project.

<img src="./screenshot.png" />

## Install

```sh
$ npm i --save depen
```
or
```sh
$ npm i -g depen
```

## Usage

```js
var depen = require('depen');

depen('./', function (err, dependencies) {
  if (err) {
    throw err;
  }

  console.log(dependencies);
});
```

## CLI

```sh
$ depen [-r] [target project]
```


## License

MIT
