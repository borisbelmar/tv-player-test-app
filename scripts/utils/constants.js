const path = require('path')

const ROOT_DIR = process.cwd()
const CERTS_DIR = path.join(ROOT_DIR, 'certs')
const BUILD_DIR = path.join(ROOT_DIR, 'build')
const CERT_FILE = path.join(CERTS_DIR, 'author.p12')

module.exports = {
  ROOT_DIR,
  CERT_FILE,
  BUILD_DIR
}
