const utils = require('./utils')

class SchemaError extends Error {
  constructor(message, node) {
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SchemaError)
    }

    this.name = 'SchemaError'
    this._node = node
  }

  toString() {
    let msg = super.toString()
    if (!this._node) {
      return msg
    }
    msg += ':\n' + utils.inspector(this._node)
    return msg
  }
}

module.exports = {
  SchemaError
}
