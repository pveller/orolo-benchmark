# Orolo Benchmark

A simple script that shows how [Orolo](https://github.com/pveller/orolo) compares to [chrono](https://github.com/wanasit/chrono) and [recognizers-date-time](https://github.com/Microsoft/Recognizers-Text/tree/master/JavaScript/packages/recognizers-date-time) and hopefully explains why _orolo_ was needed.

## How To Run

```shell
$ npm install
$ node index.js
```

## Test Cases

All tests are in [`benchmark.json`](/benchmark.json).

## Apples to Apples

To get as close to "apples to apples" comparison as possible, I wrapped all engines under benchmark with converters that process "native" outputs into a collection of dates like _orolo_ does.

## Results

```
Orolo: 76%
Chrono: 24%
Microsoft: 12%
```

To get a detailed report and see what the engines guess wrong you will have to run the script.
