const util = require('util')
const utils = (module.exports = {})

// Expected format is "id": "/events/server/ecommerce/v5.1.5/schema.json"
utils.get_table_id = (id) => {
  const idArr = id.split('/').slice(2, -1)
  const version = idArr.pop()
  return idArr.join('_') + '_' + version.split('.')[0]
}

utils.inspector = (obj) =>
  util.inspect(obj, {
    depth: null,
    colors: process.stdout.isTTY, // Add colours if in an interactive terminal
    compact: false,
    breakLength: Infinity,
  })
