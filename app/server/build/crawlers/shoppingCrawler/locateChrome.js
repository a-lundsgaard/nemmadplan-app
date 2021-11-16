"use strict";
const locateChrome = require('locate-chrome');
module.exports = async function chromePath() {
    const path = await locateChrome();
    console.log('Got chrome path: ', path);
    return path;
};
