const { CERT_FILE } = require('./constants')
const { childProcess } = require('./promisified')

const installCert = async (profileName, password) => {
  try {
    await childProcess.exec(`tizen security-profiles add -n ${profileName} -p ${password} -a ${CERT_FILE}`)
  } catch (err) {
    console.log(err)
    if (err.message.includes('already exists')) {
      console.log('> Security profile already exists')
    }
    console.error('> Error installing cert')
    throw err
  }
}

module.exports = {
  installCert
}
