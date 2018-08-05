const crypto = require('crypto')

class MatrixLogic {
  get count () {
    if (typeof this._count === typeof 0) {
      if (this._count >= this._pass.length - 1) {
        this._count = 0
      } else {
        this._count++
      }
    } else {
      this._count = 0
    }
    return this._count
  }

  _processor (x, i, decode) {
    if (this._pass) {
      let key = this._pass[this.count]
      this._key = key.charCodeAt(0)
    }
    let d = x
    if (this._key) {
      if (!decode) {
        d += (this._key + 30000)
      } else {
        d -= (this._key + 30000)
      }
    }
    let char = String.fromCharCode(d)
    // console.log(i)

    if (!decode) {
      i++
      if (i % 10 === 0) {
        if (i % 30 === 0) {
          if (i % (30 * 10) === 0) {
            char += '\n\n\n\n\n'
          } else {
            char += '\n'
          }
        } else {
          char += '          '
        }
      } else {
        char += ' '
      }
    }

    // console.log(x, String.fromCharCode(x), d)
    return char
  }

  _toUnicodeArray (str) {
    let arr = str.split('')
    return arr.map(x => x.charCodeAt(0))
  }

  init (input, pass, decode) {
    if (typeof pass === typeof '') {
      this._pass = crypto.createHmac('sha256', pass)
        .digest('hex')
    }

    if (typeof input === typeof '') {
      if (decode) {
        input = input.split('\n').join('')
        input = input.split(' ').join('')
      }
      let array = this._toUnicodeArray(input)

      return array
        .map((x, i) => this._processor(x, i, decode))
        .join('')
    }
  }
}

class MatrixObfuscator {
  static _logic (input, pass, decode) {
    return new MatrixLogic()
      .init(input, pass, decode)
  }

  static encode (input, pass) {
    return this._logic(input, pass, false)
  }

  static decode (input, pass) {
    return this._logic(input, pass, true)
  }
}

module.exports = MatrixObfuscator
