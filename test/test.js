var depen = require('../'),
  chai = require('chai'),
  expect = chai.expect;


describe('depen', function () {
  it('should have name prop', function () {
    depen(null, function (err, dependencies) {
      expect(dependencies.name).to.equal('depen');
    });
  });

  it('should set target dir with current working dir when target is not defined', function () {
    depen(null, function (err, dependencies) {
      expect(dependencies.path).to.equal(process.cwd());
    });
  });

  it('should get dependencies as an array', function () {
    depen(null, function (err, dependencies) {
      expect(dependencies.dependency).to.be.instanceof(Array);
    });
  });

  it('should get packages as an array', function () {
    depen(null, function (err, dependencies) {
      expect(dependencies.dependency[0].package).to.be.instanceof(Array);
    });
  });
});

