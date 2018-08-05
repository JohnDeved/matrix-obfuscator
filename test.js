const fs = require('fs')
const matrixObfuscator = require('./index')

let test = `
class StaticMethodCall{
  constructor(){
      console.log(StaticMethodCall.staticMethod()); 
      // 'static method has been called' 
      
      console.log(this.constructor.staticMethod()); 
      // 'static method has been called' 
  }

  static  staticMethod(){
      return 'static method has been called.';
  }
}
`

let encode = matrixObfuscator.encode(test, 'secret password')
fs.writeFileSync('./test.matrix', encode)

let decode = matrixObfuscator.decode(encode, 'secret password')
fs.writeFileSync('./test.text', decode)

console.info('done')
