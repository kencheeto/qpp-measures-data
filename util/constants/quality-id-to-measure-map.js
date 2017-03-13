// Libraries
var keyBy = require('lodash/keyBy');
// Data
var measures = require('../../measures/measures-data.json');

/**
 * @type {{}} - mapping of integer qualityIds to corresponding measure
 */
var QUALITY_ID_TO_MEASURE_MAP = keyBy(measures, function(measure) {
  /**
   * NOTE(sung): The qualityId is usually a string integer.
   * There are non-integer qualityIds in the demo benchmarks csv,
   * e.g. '316A' and '316B'.
   * Fortunately, there aren't any like this in the measures-data.json
   * that this is working on, but non integer IDs seem to exist.
   * parseInt will "work" with '316A' and '316B', but they will both be
   * parsed into 316.
   */
  return parseInt(measure.qualityId);
});

module.exports = QUALITY_ID_TO_MEASURE_MAP;
