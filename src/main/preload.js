const { webFrame, ipcRenderer } = require('electron')
const Store = require('electron-store')

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  const store = new Store()

  global.ipcRenderer = ipcRenderer
  global.webFrame = webFrame
  global.store = store
})
