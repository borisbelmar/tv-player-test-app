const tizenCertInstaller = require('./utils/tizenCertInstaller')
const webosPackager = require('./utils/webosPackager')
const tizenPackager = require('./utils/tizenPackager')
const purgePackagesIfExists = require('./utils/purgePackagesIfExists')
const fileOrDirExists = require('./utils/fileOrDirExists')
const { BUILD_DIR } = require('./utils/constants');

(async () => {
  const buildExists = await fileOrDirExists(BUILD_DIR)
  if (!buildExists) {
    console.log('> ERROR: Build folder does not exist. Please run "yarn build" first.')
    process.exit(1)
  }
  console.log('> Installing Tizen certificate...')
  await tizenCertInstaller()
  await purgePackagesIfExists('ipk', 'wgt')
  console.log('> Building Packages...')
  await Promise.all([
    webosPackager(),
    tizenPackager()
  ])
})()
