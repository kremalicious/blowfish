async function init() {
  const release = await getLatestRelease()
  replaceDom(release)
}

window.addEventListener('load', () => init())

async function getLatestRelease() {
  const response = await fetch(
    'https://api.github.com/repos/kremalicious/blowfish/releases/latest'
  )

  if (response.status !== 200) {
    console.error(`Non-200 response code from GitHub: ${response.status}`)
    return null
  }

  const json = await response.json()
  return json
}

function getDownloads(release) {
  const downloads = release.assets
    .filter(
      asset =>
        asset.name.includes('mac.zip') |
        (asset.name.includes('.exe') && !asset.name.includes('.exe.blockmap')) |
        asset.name.includes('.deb')
    )
    .map(asset => {
      const isMac = asset.name.includes('mac.zip')
      const isWin = asset.name.includes('.exe')

      return {
        name: isMac ? 'macOS' : isWin ? 'Windows' : 'Linux, deb',
        url: asset.browser_download_url
      }
    })

  return downloads
}

function replaceDom(release) {
  if (!release) return

  const releaseTagElement = document.querySelector('.release__tag')
  const releaseDateElement = document.querySelector('.release__date')
  const downloadsElement = document.querySelector('.downloads')
  const dateFormatted = new Date(release.published_at).toLocaleDateString()

  releaseTagElement.innerHTML = release.tag_name
  releaseDateElement.innerHTML = `on ${dateFormatted}`

  const downloads = getDownloads(release)
  downloadsElement.innerHTML = ''

  const isMac = navigator.userAgent.includes('Mac OS')
  const isWin = navigator.userAgent.includes('Windows')
  const isLinux = navigator.userAgent.includes('Linux')

  const downloadAll = downloads.map(download => {
    const isTargetOs =
      isMac & download.name.includes('mac') ||
      isWin & download.name.includes('Windows') ||
      isLinux & download.name.includes('Linux')

    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = download.url

    if (isTargetOs) {
      a.className = 'button'
      a.innerHTML = `Download <span>${download.name}</span>`
    } else {
      a.appendChild(document.createTextNode(download.name))
    }

    li.appendChild(a)

    return li
  })

  const downloadMain = downloadAll.filter(
    link => link.querySelector('a').className === 'button'
  )
  const downloadSecondary = downloadAll.filter(
    link => link.querySelector('a').className !== 'button'
  )

  downloadsElement.append(downloadMain[0])
  downloadSecondary.forEach(download => downloadsElement.append(download))
}
