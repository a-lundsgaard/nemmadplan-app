const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const i18nextBackend = require("i18next-electron-fs-backend");
const Store = require("secure-electron-store").default;
const ContextMenu = require("secure-electron-context-menu").default;

const { promisify } = require('util'); // tillader os at bruge async/await
const exec = promisify(require("child_process").exec); // Node-funktion der tager en shell command og returnerer et promise

// Create the electron store to be made available in the renderer process
let store = new Store();
//let server = require('../api/testApp');
//let server2 = require('../api/app')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer),
  store: store.preloadBindings(ipcRenderer, fs),
  contextMenu: ContextMenu.preloadBindings(ipcRenderer)
});



// Shell command that starts the server and connects to Mongo-db
const shellCommand= `npm start`;
// Funktion der automatisk eksekverer vores shell command i terminalen
triggerWebScraper(shellCommand);

async function triggerWebScraper(commandToRun){
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

