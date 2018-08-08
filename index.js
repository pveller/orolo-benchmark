'use strict';

const _ = require('lodash');
const { format, parse } = require('date-fns');
const colors = require('colors/safe');

const engines = [
  require('./engines/chrono'),
  require('./engines/recognizers-text-date-time'),
  require('./engines/orolo')
];
const benchmark = require('./benchmark.json');

const context = parse(benchmark.context);

const compare = (recognized, expected) =>
  recognized.length === expected.length &&
  _.differenceWith(recognized, expected, _.isEqual).length === 0;

const scores = {};
for (let test of benchmark.tests) {
  console.log(test.utterance);
  for (let ai of engines) {
    const recognized = ai.recognize(test.utterance, context);
    const expected = test.dates.map(parse);
    const passed = compare(recognized, expected);

    if (passed) {
      console.log(colors.green(`\t${ai.title}: OK`));
    } else {
      console.log(colors.red(`\t${ai.title}: FAILED`));
      console.log(
        `\t\tExpected ${expected.map(date => format(date, 'YYYY-MM-DD'))}`
      );
      console.log(
        `\t\tReceived: ${recognized.map(date => format(date, 'YYYY-MM-DD'))}`
      );
    }

    scores[ai.title] = (scores[ai.title] || 0) + (passed ? 1 : 0);
  }
}

console.log('\n\n**** RESULTS ****');
for (let ai of engines) {
  const score = (100 * scores[ai.title]) / benchmark.tests.length;

  let highlight = colors.green;
  if (score < 70) {
    highlight = colors.yellow;
  }
  if (score < 50) {
    highlight = colors.red;
  }

  console.log(highlight.call(colors, `${ai.title}: ${score}%`));
}
