const fs = require('fs')
const path = require('path')

const readFile = (fileName) => {
  return fs.readFileSync(path.resolve(__dirname, fileName)).toString().split('\r\n')
}

module.exports = {
  readFile
}