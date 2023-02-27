const getLiveJsonUrl = (host, id) => `https://${host}/live-stream/${id}.json`
const getMediaJsonUrl = (host, id) => `https://${host}/video/${id}.json`

const getContentJson = async (host, id, type) => {
  const url = type === 'live' ? getLiveJsonUrl(host, id) : getMediaJsonUrl(host, id)
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export default getContentJson