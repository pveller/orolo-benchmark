'use strict';

const { parse, isAfter, eachDay } = require('date-fns');
const _ = require('lodash');
const {
  recognizeDateTime,
  DateTimeOptions
} = require('@microsoft/recognizers-text-date-time');

const convert = value => {
  switch (value.type) {
    case 'date':
      return [parse(value.value)];
    case 'daterange': {
      const left = parse(value.start);
      const right = parse(value.end);

      return isAfter(right, left) ? eachDay(left, right) : eachDay(right, left);
    }
    default:
      // console.error(`Unsupported: ${JSON.stringify(value)}`);
      return [];
  }
};

module.exports = {
  title: 'Microsoft',
  recognize: (utterance, context) => {
    const results = recognizeDateTime(
      utterance,
      'English',
      DateTimeOptions.None,
      context
    );

    return (
      _.chain(results)
        .flatMap(result => result.resolution.values)
        .flatMap(convert)
        //.uniqWith(compareAsc)
        .value()
    );
  }
};
