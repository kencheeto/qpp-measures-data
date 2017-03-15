// Libraries
var fs    = require('fs');
var parse = require('csv-parse');
var path  = require('path');
// Constants
var DEMO_CSV_COLUMNS          = require('./../util/constants/demo-csv-columns');
// Utils
var formatCsvRecord         = require('./../util/format-csv-record');
var formatSubmissionMethod  = require('./../util/format-submission-method');
// Data
var benchmarksData  = fs.readFileSync(path.join(__dirname, './../data/historical-benchmarks/demo.csv'), 'utf8');

// Script to generate benchmark.json file from csv
var benchmarks = {};

parse(benchmarksData, {columns: DEMO_CSV_COLUMNS, from: 4}, function(err, records) {
  if (err) {
    console.log(err);
  } else {
    records.forEach(function(record) {
      var qualityId = record.qualityId;

      // NOTE: qualityId is being used here since not all benchmarks currently have corresponding measures.
      // This will prevent the loss of benchmarks during parsing.
      if (!benchmarks[qualityId]) benchmarks[record.qualityId] = {};
      benchmarks[qualityId][formatSubmissionMethod(record.submissionMethod)] = formatCsvRecord(record, {benchmarkYear: '2016', performanceYear: '2018'});
    });

    fs.writeFileSync(path.join(__dirname, '../benchmarks/demo.json'), JSON.stringify(benchmarks), 'utf8');
  }
});
