# asyncf

async/await shims for ES6.

Where you would use 'async function', you can use 'asyncf(function*...)'.
Where you would use 'await ...', you can use 'yield ...'.

Example

    const asyncf = require('asyncf');

    const asyncMain = asyncf(function*() {

      // calling 'yield' on a Promise means that this part of the code
      // will wait until that promise is resolved.
      //
      // If it succeeds, the 'yield' expression will return the resolved
      // value,
      // If it fails, it will throw an exception.
      //

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


An asynchronous function is just a function that returns a Promise.

