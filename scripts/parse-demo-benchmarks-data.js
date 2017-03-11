// Script to generate benchmark.json file from csv
// Libraries
var fs    = require('fs');
var parse = require('csv-parse');
// Utils
var formatCsvRecord         = require('./../util/format-csv-record');
var formatSubmissionMethod  = require('./../util/format-submission-method');
// Data
var benchmarksData  = fs.readFileSync('./../data/historical-benchmarks/demo.csv', 'utf8');

var columns = [
  'measureName',
  'qualityId',
  'submissionMethod',
  'measureType',
  'benchmark',
  'decile3',
  'decile4',
  'decile5',
  'decile6',
  'decile7',
  'decile8',
  'decile9',
  'decile10',
  'isToppedOut'
];
var benchmarks = {};

parse(benchmarksData, {columns: columns, from: 4}, function(err, records) {
  if (err) {
    console.log(err);
  } else {
    records.forEach(function(record) {
      if (!benchmarks[record.qualityId]) benchmarks[record.qualityId] = {};
      benchmarks[record.qualityId][formatSubmissionMethod(record.submissionMethod)] = formatCsvRecord(record, {benchmarkYear: '2016', performanceYear: '2018'});
    });
    fs.writeFileSync('../benchmarks/demo.json', JSON.stringify(benchmarks), 'utf8');
  }
});
