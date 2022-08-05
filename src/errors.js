const utils = require('./utils')

class SchemaError extends Error {
  constructor(message, node) {
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SchemaError)
    }

    this.name = 'SchemaError'
    if (node) {
      this.message += ':\n' + utils.inspector(node)
    }
  }
}

module.exports = {
  SchemaError,
}
