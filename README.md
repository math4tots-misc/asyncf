# asyncf

Tools for being able to code like you already have async/await in ES6.

Where you would use 'async function', you can use 'asyncf(function*...)'.
Where you would use 'await ...', you can use 'yield ...'.

Example

```javascript
const asyncf = require('asyncf');

const asyncMain = asyncf(function*() {

  // Using 'yield' on a Promise causes the function to
  // wait *asynchronously* until that promise is resolved.
  //
  // If the promise resolves successfully,
  // the yield expression will return the resolved value,
  //
  // If the promise rejects, an exception will throw be at the
  // yield site.


  yield asyncSleep(100);  // should return 'waking up now!'

  console.log('async main after sleeping');
});

// Any function that always returns a Promise is an
// asynchronous function. So you don't need to use the 'asyncf' function
// to create more of them.
const asyncSleep = function(timeInMillis) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("waking up now!");
    }, timeInMillis);
  });
}


// You can just start asyncMain by calling it, or
asyncMain();

// if you wanted for asyncMain to finish, you can
// start a local 'async' context.
asyncf.start(function*() {
  yield asyncMain();
  console.error("asyncMian has finished!");
});
```

An asynchronous function is just a function that returns a Promise.

