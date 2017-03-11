// Libraries
var keyBy = require('lodash/keyBy');
// Data
var measures = require('../../measures/measures-data.json');

/**
 * @type {{}} - mapping of integer qualityIds to corresponding measure
 */
var QUALITY_ID_TO_MEASURE_MAP = keyBy(measures, function(o) {
  return parseInt(o.qualityId);
});

module.exports = QUALITY_ID_TO_MEASURE_MAP;
