const { shell } = require('electron')

const openUrl = url => {
  shell.openExternal(url)
}

export { openUrl }
