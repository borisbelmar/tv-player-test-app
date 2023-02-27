const fs = require('fs')
const childProcess = require('child_process')
const { promisify } = require('util')

// fs
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const readdir = promisify(fs.readdir)
const mkdir = promisify(fs.mkdir)
const stat = promisify(fs.stat)
const rename = promisify(fs.rename)
const unlink = promisify(fs.unlink)
const rmdir = promisify(fs.rmdir)
const createWriteStream = promisify(fs.createWriteStream)

// child_process
const exec = promisify(childProcess.exec)

module.exports = {
  fs: { readFile, writeFile, readdir, mkdir, stat, rename, unlink, createWriteStream, rmdir },
  childProcess: { exec }
}
