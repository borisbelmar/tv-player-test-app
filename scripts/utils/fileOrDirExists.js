const { fs } = require('./promisified')

const fileOrDirExists = async (path) => {
  let pathStat
  try {
    pathStat = await fs.stat(path)
  } catch {}
  return !!pathStat
}

module.exports = fileOrDirExists
