const axios = require('axios')
require('dotenv').config

module.exports = async (req, res) => {
  try {
    const response = await axios(
      'https://api.github.com/repos/kremalicious/blowfish/releases/latest',
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      }
    )
    res.status(200).send(response.data)
  } catch (error) {
    console.error(error.message)
  }
}
