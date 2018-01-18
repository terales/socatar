const os = require('os')
const { spawn } = require('child_process')

module.exports = function imageMagicCompare (sample, received) {
  return new Promise((resolve, reject) => {
    // magick compare -fuzz 2% -metric AE {{sample}} {{received}} null:

    if (os.platform() === 'win32') {
      const imagemagic = spawn('magick', ['compare', '-fuzz', '2%', '-metric', 'AE', sample, received, 'null:'])
    } else {
      const imagemagic = spawn('compare', ['-fuzz', '2%', '-metric', 'AE', sample, received, 'null:'])
    }


    imagemagic.stderr.on('data', data => {
      if (Number.isNaN(data)) { reject(new Error(`imagemagic error:\n  ${data}`)) }
      resolve(parseInt(data) === 0)
    })

    imagemagic.on('close', code => code !== 0 ? reject(new Error(`imagemagic process exited with code: ${code}`)) : null)
    imagemagic.on('error', error => reject(new Error('Failed to imagemagic subprocess\n' + error)))
  })
}
