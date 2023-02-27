const { installCert } = require('./certHelpers')

const tizenCertInstaller = async () => {
  const certPassword = 'Test2023'
  const securityProfileName = 'Test'
  await installCert(securityProfileName, certPassword)
}

module.exports = tizenCertInstaller
