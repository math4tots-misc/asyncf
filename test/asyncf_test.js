const {expect} = require('chai');
const asyncf = require('../index.js');


(function() {
"use strict";


describe('asyncf', () => {

  // 'waitAndPush' waits for 'millis' milliseconds before
  // pushing 'item' into the array 'arr'
  const waitAndPush = asyncf(function*(millis, arr, item) {
    yield asyncf.sleep(millis);
    arr.push(item);
    return item;
  });

  it('returns a function', () => {
    expect(waitAndPush).to.be.a('function');
  });

  const someArray = [];

  const promise = waitAndPush(100, someArray, 'item');

  // If 'waitAndPush' rusn asynchronously, 'someArray' should still be
  // empty.
  it('runs asynchronously', () => {
    expect(someArray).to.deep.equal([]);
  });

  it('the async function returns a promise', () => {
    expect(promise).to.be.an.instanceof(Promise);
  });

  it ('finishes after being awaited on', () => {
    asyncf.start(function*() {
      const result = yield promise;
      expect(result).to.equal('item');
      expect(someArray).to.deep.equal(['item']);
    });
  });
});




})();

