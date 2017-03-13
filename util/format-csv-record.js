// Utility functions for formatting the csv records
// Constants
var QUALITY_ID_TO_MEASURE_MAP = require('./constants/quality-id-to-measure-map');
// Utils
var formatSubmissionMethod  = require('./format-submission-method');
var formatDecileGenerator   = require('./format-decile-generator');
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
 *  isToppedOut: string}} record - csv record object
 * @param {{
 *  benchmarkYear: string,
 *  performanceYear: string
 * }} options - 4 digit year strings for benchmark and performance years
 * @returns {{
 *  measureId: string,
 *  benchmarkYear: string,
 *  performanceYear: string,
 *  submissionMethod: string,
 *  deciles: Array} | undefined} - benchmark object
 */
var formatCsvRecord = function formatCsvRecord(record, options) {
  var measure = QUALITY_ID_TO_MEASURE_MAP[record.qualityId];

  /**
   * NOTE: Some of the benchmarks don't correspond to
   * any of the measures currently in our json.
   */
  if (!measure) return;

  return {
    measureId: measure.measureId,
    benchmarkYear: options.benchmarkYear,
    performanceYear: options.performanceYear,
    submissionMethod: formatSubmissionMethod(record.submissionMethod),
    /**
     * NOTE: Deciles are offset by one because they use the lower bound
     * of the next decile to determine the exclusive upper bound of
     * the current decile.
     * 2016 benchmarks do not have decile 1 or decile 2 information.
     * Decile 2 exclusive upper bound is implied from the
     * inclusive lower bound of decile 3.
     */
    deciles: [
      null,
      record.decile3,
      record.decile4,
      record.decile5,
      record.decile6,
      record.decile7,
      record.decile8,
      record.decile9,
      record.decile10,
      record.decile10
    ].map(formatDecileGenerator(record))
  };
};

module.exports = formatCsvRecord;
