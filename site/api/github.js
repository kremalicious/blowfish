import axios from 'axios'
import 'dotenv'

export default async (req, res) => {
  try {
    const response = await axios(
      'https://api.github.com/repos/kremalicious/blowfish/releases/latest',
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      }
    )

    const { assets, published_at, tag_name } = response.data

    const downloads = assets
      .filter(
        asset =>
          asset.name.includes('mac.zip') |
          (asset.name.includes('.exe') &&
            !asset.name.includes('.exe.blockmap')) |
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

    res.status(200).json({ downloads, published_at, tag_name })
  } catch (error) {
    console.error(error.message)
    res.status(500).send(error.message)
  }
}
