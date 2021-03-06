async function init() {
  const response = await fetch('/api/github')
  const release = await response.json()
  replaceDom(release)
}
window.addEventListener('load', () => init())

function replaceDom(release) {
  if (!release) return

  const releaseTagElement = document.querySelector('.release__tag')
  const releaseDateElement = document.querySelector('.release__date')
  const downloadsElement = document.querySelector('.downloads')
  const dateFormatted = new Date(release.published_at).toLocaleDateString()

  releaseTagElement.innerHTML = release.tag_name
  releaseDateElement.innerHTML = `on ${dateFormatted}`

  downloadsElement.innerHTML = ''

  const isMac = navigator.userAgent.includes('Mac OS')
  const isWin = navigator.userAgent.includes('Windows')
  const isLinux = navigator.userAgent.includes('Linux')

  const downloadAll = release.downloads.map(download => {
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
