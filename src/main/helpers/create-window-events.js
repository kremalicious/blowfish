export default function createWindowEvents(mainWindow) {
  mainWindow.on('enter-full-screen', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName("html")[0].classList.add("fullscreen")'
    )
  )
  mainWindow.on('leave-full-screen', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName("html")[0].classList.remove("fullscreen")'
    )
  )
  mainWindow.on('blur', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName("html")[0].classList.add("blur")'
    )
  )
  mainWindow.on('focus', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName("html")[0].classList.remove("blur")'
    )
  )
}
