const electron = {
  require: jest.fn(),
  match: jest.fn(),
  app: jest.fn(),
  remote: jest.fn(),
  shell: jest.fn(),
  dialog: jest.fn()
}

const remote = {
  getCurrentWindow: jest.fn()
}

// for the shell module above
const shell = {
  openExternal: jest.fn()
}

module.exports = {
  electron,
  remote,
  shell
}
