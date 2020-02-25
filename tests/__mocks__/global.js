const global = {
  ipcRenderer: {
    on: () => jest.fn()
  },
  store: {
    has: () => jest.fn()
  }
}

module.exports = global
