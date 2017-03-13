// Script to generate benchmark.json file from csv
// Libraries
var fs    = require('fs');
var parse = require('csv-parse');
var path  = require('path');
// Constants
var DEMO_CSV_COLUMNS          = require('./../util/constants/demo-csv-columns');
var QUALITY_ID_TO_MEASURE_MAP = require('./../util/constants/quality-id-to-measure-map');
// Utils
var formatCsvRecord         = require('./../util/format-csv-record');
var formatSubmissionMethod  = require('./../util/format-submission-method');
// Data
var benchmarksData  = fs.readFileSync(path.join(__dirname, './../data/historical-benchmarks/demo.csv'), 'utf8');

var benchmarks = {};

parse(benchmarksData, {columns: DEMO_CSV_COLUMNS, from: 4}, function(err, records) {
  if (err) {
    console.log(err);
  } else {
    records.forEach(function(record) {
      var measure = QUALITY_ID_TO_MEASURE_MAP[record.qualityId];

      if (measure && measure.measureId) {
        var measureId = measure.measureId;

        if (!benchmarks[measureId]) benchmarks[measureId] = {};
        benchmarks[measureId][formatSubmissionMethod(record.submissionMethod)] = formatCsvRecord(record, {benchmarkYear: '2016', performanceYear: '2018'});
      }
    });

    fs.writeFileSync(path.join(__dirname, '../benchmarks/demo.json'), JSON.stringify(benchmarks), 'utf8');
  }
});
