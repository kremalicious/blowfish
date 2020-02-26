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
        name: `Download (${isMac ? 'macOS' : isWin ? 'Windows' : 'Linux'})`,
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
  releaseDateElement.innerHTML = dateFormatted

  const downloads = getDownloads(release)
  downloadsElement.innerHTML = ''

  downloads.map(download => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = download.url
    a.className = 'button'
    a.appendChild(document.createTextNode(download.name))
    downloadsElement.appendChild(li).appendChild(a)
  })
}

async function init() {
  const release = await getLatestRelease()
  replaceDom(release)
}

init()
