const { BUILD_DIR } = require('./constants')
const { fs } = require('./promisified')

const renamePackage = async ext => {
  const files = await fs.readdir(BUILD_DIR)
  const filename = files.filter(fn => fn.endsWith(`.${ext}`))[0]
  const newFileName = `${'tv-test-app'}_${'0.0.1'}.${ext}`
  await fs.rename(`${BUILD_DIR}/${filename}`, `${BUILD_DIR}/${newFileName}`)
  return `${BUILD_DIR}/${newFileName}`
}

module.exports = renamePackage
