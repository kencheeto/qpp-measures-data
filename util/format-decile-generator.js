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
  /** NOTE: TODO(sung):
   * Is the toppedOut property meaningful?
   * What should the 9th decile be in this case:
   * qualityId: 109
   * submissionMethod: qcdrOrQualifiedRegistry (Registry/QCDR)
   * decile3: 5.16 - 14.84
   * decile4: 14.85 - 37.78
   * decile5: 37.79 - 65.33
   * decile6: 65.34 - 88.04
   * decile7: 88.05 - 97.81
   * decile8: 97.82 - 99.99
   * decile9: --
   * decile10: 100
   * isToppedOut: No
   *
   * Seems like it should be 100 as it is now.
   * Does it just mean that it is not possible to get a score greater than 100?
   */
  // var top = null;
  // if (record.isToppedOut.trim().toLowerCase() === 'yes') top = isInverseMeasure ? 0 : 100;
  var top = isInverseMeasure ? 0 : 100;
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
