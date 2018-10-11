const util = module.exports = {}

// Expected format is "id": "/events/server/ecommerce/v5.1.5/schema.json"
util.get_table_id = id => {
  const idArr = id.split('/')
  const name = idArr.slice(-3, -2)[0]
  const version = idArr.slice(-2, -1)[0]
  return name + '_' + version.split('.')[0]
}
