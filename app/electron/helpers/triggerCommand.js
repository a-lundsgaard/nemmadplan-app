const { promisify } = require('util'); // tillader os at bruge async/await
const exec = promisify(require("child_process").exec); // Node-funktion der tager en shell command og returnerer et promise

module.exports = async function triggerCommand(commandToRun){
    let result;
    try {
      result = await exec(commandToRun);
    } catch(e) {
      console.log(`Fejl i kommando, tjek at den er stavet rigtigt: "${commandToRun}"`)
      throw e
    }
    console.log('Server running and MongoDB connected succesfully')
    return result;
  }