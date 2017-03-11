// Function to create a function that formats the deciles based on options
/**
 *
 * @param {{
 *  measureName: string,
 *  qualityId: string,
 *  submissionMethod: string,
 *  measureType: string,
 *  benchmark: string,
 *  decile3: string,
 *  decile4: string,
 *  decile5: string,
 *  decile6: string,
 *  decile7: string,
 *  decile8: string,
 *  decile9: string,
 *  decile10: string,
 *  isToppedOut: string}} record
 *  @returns {function}
 */
var formatDecileGenerator = function formatDecileGenerator(record) {
  var range = record.decile3.match(/(\d{0,3}\.?\d{2,})/g);
  var isInverseMeasure = range && range[1] && range[0] - range[1] > 0;
  var top = null;
  if (record.isToppedOut) top = isInverseMeasure ? 0 : 100;

  /**
   * @param {string | null} decileString - from csv
   * @param {number} index
   * @return {number | null}
   */
  return function(decileString, index) {
    if (!decileString) return null;
    var range = decileString.trim().match(/(\d{0,3}\.?\d{2,})/g);
    if (range) {
      // NOTE: There is an assumption here that the max is 100
      // (or min of 0 for inverse measures).
      if (index === 9) return isInverseMeasure ? 0 : 100;
      return parseFloat(range[0]);
    }

    return top;
  };
};

module.exports = formatDecileGenerator;
