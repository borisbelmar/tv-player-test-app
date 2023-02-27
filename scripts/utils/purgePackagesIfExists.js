const { BUILD_DIR } = require('./constants')
const { fs } = require('./promisified')

const purgePackagesIfExists = async (...extensions) => {
  try {
    const files = await fs.readdir(BUILD_DIR)
    const filesToDelete = files.filter(fn => extensions.some(ext => fn.endsWith(`.${ext}`)))
    await Promise.all(filesToDelete.map(file => fs.unlink(`${BUILD_DIR}/${file}`)))
  } catch (err) {
    console.error('> Error purging packages')
    throw err
  }
}

module.exports = purgePackagesIfExists
