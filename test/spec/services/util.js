'use strict';

describe('Service: util', function () {

  // load the service's module
  beforeEach(module('node-spotify'));

  // instantiate service
  var util;
  beforeEach(inject(function (_util_) {
    util = _util_;
  }));

  it('should convert 0 of 2:30 to 0:00', function () {
    expect(util.percentToTimeString(0, 150)).toBe('0:00');
  });

  it('should convert 50 of 2:30 to 1:15', function () {
    expect(util.percentToTimeString(50, 150)).toBe('1:15');
  });

  it('should convert 100 of 2:30 to 2:30', function () {
    expect(util.percentToTimeString(100, 150)).toBe('2:30');
  });

  it('should convert 100 of 11:00 to 11:00', function () {
    expect(util.percentToTimeString(100, 660)).toBe('11:00');
  });

});
