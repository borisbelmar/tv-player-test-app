const { BUILD_DIR } = require('./constants')
const { childProcess } = require('./promisified')
const renamePackage = require('./renamePackage')

const tizenPackager = async () => {
  const securityProfileName = 'Test'
  try {
    await childProcess.exec(`tizen package -t wgt -- ${BUILD_DIR} --sign ${securityProfileName}`)
    const filePath = await renamePackage('wgt')
    console.log(`Tizen package created: ${filePath}`)
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = tizenPackager
