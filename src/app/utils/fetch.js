const fetchData = async url => {
  try {
    const response = await fetch(url)

    if (response.status !== 200) {
      return console.log('Non-200 response: ' + response.status) // eslint-disable-line
    }

    const json = await response.json()
    if (!json) return

    return json
  } catch (error) {
    console.log('Error parsing json:' + error) // eslint-disable-line
  }
}

export default fetchData
