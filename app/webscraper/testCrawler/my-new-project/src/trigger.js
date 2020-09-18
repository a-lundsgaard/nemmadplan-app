

const { promisify } = require('util'); // tillader os at bruge async / await
const  exec = promisify(require("child_process").exec);
const shellCommand = "apify run -p";
//const { execSync } = require("exec-sync");

//let url1 = null;

async function triggerWebScraper() {

  let info;
  try {
    info = await exec(shellCommand);
  } catch (e) {
    console.log('Data kunne ikke hentes')
    console.log(e)
  }

  return info;


}

module.exports = triggerWebScraper;