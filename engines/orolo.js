'use strict';

const { Orolo } = require('orolo');

module.exports = {
  title: 'Orolo',
  recognize: (utterance, context) => new Orolo().recognize(utterance, context)
};
