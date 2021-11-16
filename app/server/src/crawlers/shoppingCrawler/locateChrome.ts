const locateChrome = require('locate-chrome');

// Use a callback
/*  locateChrome(function(l) {
  console.log(l);
});  */

module.exports = async function chromePath() {
    const path = await locateChrome();
    console.log('Got chrome path: ', path);
    return path;
}

