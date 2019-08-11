const util = require('util')
const utils = module.exports = {}

// Expected format is "id": "/events/server/ecommerce/v5.1.5/schema.json"
utils.get_table_id = id => {
  const idArr = id.split('/')
  const type = idArr.slice(-4, -3)[0]
  const name = idArr.slice(-3, -2)[0]
  const version = idArr.slice(-2, -1)[0]
  return type + '_' + name + '_' + version.split('.')[0]
}

utils.inspector = obj => util.inspect(obj, {
  depth: null,
  colors: process.stdout.isTTY, // Add colours if in an interactive terminal
  compact: false,
  breakLength: Infinity
})
