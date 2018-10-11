const gbq = module.exports = {}

const BigQuery = require('@google-cloud/bigquery')

gbq.createTable = async (projectId, datasetId, tableId, schema) => {
  const bigquery = new BigQuery({ projectId })

  const [table] = await bigquery
    .dataset(datasetId)
    .createTable(tableId, schema)

  console.log(`Table ${table.id} created.`)
}

gbq.patchTable = async (projectId, datasetId, tableId, schema) => {
  const bigquery = new BigQuery({ projectId })

  const res = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .setMetadata(schema)

  console.log(res)
}

gbq.tableExists = async (projectId, datasetId, tableId) => {
  const bigquery = new BigQuery({ projectId })

  const table = await bigquery
    .dataset(datasetId)
    .table(tableId)

  return table.exists()
}
