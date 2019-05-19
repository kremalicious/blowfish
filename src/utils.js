const { shell } = require('electron')

const openUrl = url => {
  shell.openExternal(url)
}

const rgbaToHex = color => {
  const r = color.substr(0, 2)
  const g = color.substr(2, 2)
  const b = color.substr(4, 2)
  // const a = color.substr(6, 2)

  return '#' + r + g + b
}

module.exports = { openUrl, rgbaToHex }
