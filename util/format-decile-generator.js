// Utils
var isInverseBenchmark = require('./is-inverse-benchmark');

/**
 * Generator function to create a
 * function that formats the deciles based on options
 *
 * @param {{
 *  measureName: string,
 *  qualityId: string,
 *  submissionMethod: string,
 *  measureType: string,
 *  benchmark: string,
 *  decile1: string?,
 *  decile2: string?,
 *  decile3: string?,
 *  decile4: string?,
 *  decile5: string?,
 *  decile6: string?,
 *  decile7: string?,
 *  decile8: string?,
 *  decile9: string,
 *  decile10: string,
 *  isToppedOut: string}} record
 *  @returns {function}
 */
var formatDecileGenerator = function formatDecileGenerator(record) {
  var isInverseMeasure = isInverseBenchmark(record);
  var top = isInverseMeasure ? 0 : 100;

  /**
   * Params correspond to the Array.map signature
   * @param {string?} decileString - from csv
   * @param {number} index
   * @param {Array} array
   * @return {number | null}
   */
  return function(decileString, index, array) {
    var range           =  decileString ? decileString.match(/([0-9]*[.]?[0-9]+)/g) : null;
    var nextIndex       = index + 1;
    var nextDecile      = array[index + 1];
    var nextDecileRange = nextDecile ? nextDecile.match(/([0-9]*[.]?[0-9]+)/g) : null;
    // if self is undefined and a previous decile is defined, return null.
    // if self is undefined and no previous decile is defined, but nextDecile is defined, return nextDecile's lowerbound.
    // if self is undefined, and the nextDecile is undefined, return null.
    // if self is defined, but nextDecile is not, find the next defined decile above.
    // if self is defined and self is Decile 10 return the explicit upper bound or top.

    if (!decileString || !range) {
      var hasDefinedPredecessors = false;

      for (var i = index - 1; i > -1; i--) {
        if (array[i] && array[i].match(/([0-9]*[.]?[0-9]+)/g)) hasDefinedPredecessors = true;
      }

      if (nextDecile && !hasDefinedPredecessors && nextDecileRange) {
        return parseFloat(nextDecileRange[0]);
      }
    } else {
      if (index === 9) {
        return range && range.length > 1 ? parseFloat(range[1]) : top;
      }

      while (!nextDecileRange && nextIndex < array.length) {
        nextIndex++;
        nextDecile = array[nextIndex];
        nextDecileRange = nextDecile ? nextDecile.match(/([0-9]*[.]?[0-9]+)/g) : null;
      }

      if (nextDecileRange) return parseFloat(nextDecileRange[0]);
    }

    return null;
  };
};

module.exports = formatDecileGenerator;
