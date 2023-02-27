const { BUILD_DIR } = require('./constants')
const { childProcess } = require('./promisified')
const renamePackage = require('./renamePackage')

const webosPackager = async () => {
  try {
    await childProcess.exec(`ares-package ${BUILD_DIR} -o ${BUILD_DIR}`)
    const filePath = await renamePackage('ipk')
    console.log(`WebOS package created: ${filePath}`)
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = webosPackager
