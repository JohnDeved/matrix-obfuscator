const fs = require('fs')
const http = require('http')
const request = require('request')
const matrixObfuscator = require('./index')

request.get('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', (e, res) => {
  let encode = matrixObfuscator.encode(res.body, 'secret password')
  fs.writeFileSync('./test.matrix', encode)

  let decode = matrixObfuscator.decode(encode, 'secret password')
  fs.writeFileSync('./test.text', decode)
  console.info('done')
})
