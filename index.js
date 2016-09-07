// Utilities for making asynchronous programming simpler.

// NOTE: A major downside to using asyncf instead of a natively supported
// async, is that this method makes it difficult to get a good stack trace.
// TODO: Think of a solution to make debugging easier.

// On the other hand, async/await isn't available on ECMA2015 at all.

function asyncf(generator) {
  "use strict";
  return function() {
    return new Promise((resolve, reject) => {
      try {
        const generatorObject = generator.apply(null, arguments);
        _asyncfHelper(generatorObject, resolve, reject);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  };
}

function _asyncfHelper(generatorObject, resolve, reject, arg, isErr) {
  "use strict";
  try {
    const {done, value} =
        isErr ?
        generatorObject.throw(arg) :
        generatorObject.next(arg);
    if (done) {
      resolve(value);
      return;
    }
    // if done is false, 'value' must be a Promise
    value.then(result => {
      _asyncfHelper(generatorObject, resolve, reject, result);
    }).catch(err => {
      _asyncfHelper(generatorObject, resolve, reject, err, true);
    });
  } catch (err) {
    console.error(err);
    reject(err);
  }
}

function start(generator) {
  "use strict";
  return asyncf(generator)();
}

function sleep(timeInMillis) {
  "use strict";
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeInMillis);
  });
}

asyncf.start = start;
asyncf.sleep = sleep;
module.exports = asyncf;
