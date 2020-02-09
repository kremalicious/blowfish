const { webFrame, ipcRenderer } = require('electron')
const Store = require('electron-store')

const store = new Store()

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer
  global.webFrame = webFrame
  global.store = store
})
