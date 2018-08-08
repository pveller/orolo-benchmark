'use strict';

const chrono = require('chrono-node');
const _ = require('lodash');
const { eachDay, parse } = require('date-fns');

const convert = parsed => {
  if (!parsed) {
    return undefined;
  }

  const date = Object.assign({}, parsed.impliedValues, parsed.knownValues);
  return parse(`${date.year}-${date.month}-${date.day}`);
};

module.exports = {
  title: 'Chrono',
  recognize: (utterance, context) => {
    const results = chrono.parse(utterance, context);

    if (!results || results.length === 0) {
      return [];
    }

    return _.chain(results)
      .flatMap(({ start, end }) => {
        const dateStart = convert(start);
        const dateEnd = convert(end);

        if (dateStart && dateEnd) {
          return eachDay(dateStart, dateEnd);
        }
        if (dateStart || dateEnd) {
          return [dateStart || dateEnd];
        }

        return [];
      })
      .value();
  }
};
