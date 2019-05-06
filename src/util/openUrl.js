const { shell } = require('electron')

const openUrl = url => {
  shell.openExternal(url)
}

module.exports = { openUrl }
