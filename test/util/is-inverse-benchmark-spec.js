// Libraries
var chai = require('chai');
var expect = chai.expect;
// Utils
var isInverseBenchmark = require('./../../util/is-inverse-benchmark');

describe('isInverseBenchmark', function() {
  it('should default to false', function() {
    expect(isInverseBenchmark({})).to.be.false;
  });
  it('should return false when decile 10 is equal to 100', function() {
    var isInverse = isInverseBenchmark({decile10: '100'});

    expect(isInverse).to.be.false;

    var isInverse2 = isInverseBenchmark({
      decile3: '53.73 - 75.75',
      decile4: '75.76 - 88.45',
      decile5: '88.46 - 98.07',
      decile6: '98.08 - 99.99',
      decile7: '--',
      decile8: '--',
      decile9: '--',
      decile10: '100'
    });

    expect(isInverse2).to.be.false;
  });
  it('should return true when decile 10 is equal to 0', function() {
    var isInverse = isInverseBenchmark({decile10: '0'});

    expect(isInverse).to.be.true;

    var isInverse2 = isInverseBenchmark({
      decile3: '54.67 - 35.91',
      decile4: '35.90 - 25.63',
      decile5: '25.62 - 19.34',
      decile6: '19.33 - 14.15',
      decile7: '14.14 -  9.10',
      decile8: '9.09 -  3.34',
      decile9: '3.33 -  0.01',
      decile10: '0'
    });

    expect(isInverse2).to.be.true;
  });
  it('should return true when decile 10 is <= x', function() {
    var isInverse = isInverseBenchmark({decile10: '<= 4.00'});

    expect(isInverse, 'case1').to.be.true;

    var isInverse2 = isInverseBenchmark({
      decile3: '35.00 - 25.72',
      decile4: '25.71 - 20.32',
      decile5: '20.31 - 16.23',
      decile6: '16.22 - 13.05',
      decile7: '13.04 - 10.01',
      decile8: '10.00 -  7.42',
      decile9: '7.41 -  4.01',
      decile10: '<=  4.00'
    });

    expect(isInverse2, 'case2').to.be.true;
  });
  it('should return false when decile 10 is >= x', function() {
    var isInverse = isInverseBenchmark({decile10: '>= 5.00'});

    expect(isInverse).to.be.false;

    var isInverse2 = isInverseBenchmark({

    });

    expect(isInverse2).to.be.false;
  });
  it('should return true when a decreasing range is given for any of the deciles', function() {
    expect(isInverseBenchmark({decile1: '54.67 - 35.91'}), 'decile1').to.be.true;
    expect(isInverseBenchmark({decile2: '54.67 - 35.91'}), 'decile2').to.be.true;
    expect(isInverseBenchmark({decile3: '54.67 - 35.91'}), 'decile3').to.be.true;
    expect(isInverseBenchmark({decile4: '54.67 - 35.91'}), 'decile4').to.be.true;
    expect(isInverseBenchmark({decile5: '54.67 - 35.91'}), 'decile5').to.be.true;
    expect(isInverseBenchmark({decile6: '54.67 - 35.91'}), 'decile6').to.be.true;
    expect(isInverseBenchmark({decile7: '54.67 - 35.91'}), 'decile7').to.be.true;
    expect(isInverseBenchmark({decile8: '54.67 - 35.91'}), 'decile8').to.be.true;
    expect(isInverseBenchmark({decile9: '54.67 - 35.91'}), 'decile9').to.be.true;
    expect(isInverseBenchmark({decile10: '54.67 - 35.91'}), 'decile10').to.be.true;
  });
  it('should return false when an increasing range is given for any of the deciles', function() {
    expect(isInverseBenchmark({decile1: '53.73 - 75.75'}), 'decile1').to.be.false;
    expect(isInverseBenchmark({decile2: '53.73 - 75.75'}), 'decile2').to.be.false;
    expect(isInverseBenchmark({decile3: '53.73 - 75.75'}), 'decile3').to.be.false;
    expect(isInverseBenchmark({decile4: '53.73 - 75.75'}), 'decile4').to.be.false;
    expect(isInverseBenchmark({decile5: '53.73 - 75.75'}), 'decile5').to.be.false;
    expect(isInverseBenchmark({decile6: '53.73 - 75.75'}), 'decile6').to.be.false;
    expect(isInverseBenchmark({decile7: '53.73 - 75.75'}), 'decile7').to.be.false;
    expect(isInverseBenchmark({decile8: '53.73 - 75.75'}), 'decile8').to.be.false;
    expect(isInverseBenchmark({decile9: '53.73 - 75.75'}), 'decile9').to.be.false;
    expect(isInverseBenchmark({decile10: '53.73 - 75.75'}), 'decile10').to.be.false;
  });
  it('should return true when any decile below 10 is >= x', function() {
    expect(isInverseBenchmark({decile1: '>= 4.00'}), 'decile1').to.be.true;
    expect(isInverseBenchmark({decile2: '>= 4.00'}), 'decile2').to.be.true;
    expect(isInverseBenchmark({decile3: '>= 4.00'}), 'decile3').to.be.true;
    expect(isInverseBenchmark({decile4: '>= 4.00'}), 'decile4').to.be.true;
    expect(isInverseBenchmark({decile5: '>= 4.00'}), 'decile5').to.be.true;
    expect(isInverseBenchmark({decile6: '>= 4.00'}), 'decile6').to.be.true;
    expect(isInverseBenchmark({decile7: '>= 4.00'}), 'decile7').to.be.true;
    expect(isInverseBenchmark({decile8: '>= 4.00'}), 'decile8').to.be.true;
    expect(isInverseBenchmark({decile9: '>= 4.00'}), 'decile9').to.be.true;
  });
  it('should return false when any decile below 10 is <= x', function() {
    expect(isInverseBenchmark({decile1: '<= 4.00'}), 'decile1').to.be.false;
    expect(isInverseBenchmark({decile2: '<= 4.00'}), 'decile2').to.be.false;
    expect(isInverseBenchmark({decile3: '<= 4.00'}), 'decile3').to.be.false;
    expect(isInverseBenchmark({decile4: '<= 4.00'}), 'decile4').to.be.false;
    expect(isInverseBenchmark({decile5: '<= 4.00'}), 'decile5').to.be.false;
    expect(isInverseBenchmark({decile6: '<= 4.00'}), 'decile6').to.be.false;
    expect(isInverseBenchmark({decile7: '<= 4.00'}), 'decile7').to.be.false;
    expect(isInverseBenchmark({decile8: '<= 4.00'}), 'decile8').to.be.false;
    expect(isInverseBenchmark({decile9: '<= 4.00'}), 'decile9').to.be.false;
  });
});
