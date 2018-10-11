const jsbq = module.exports = {}

const jsonSchemaBigquery = require('./index')
const gbq = require('./gbq')
const util = require('./util')

jsbq.process = async (project, datasetName, jsonSchema) => {
  console.log('Processing json schema...')
  const tableOptions = jsonSchemaBigquery.convert(jsonSchema)

  console.log('Extracting table name from schema...')
  const tableName = util.get_table_id(jsonSchema.id)
  console.log('Table name is: ' + tableName)

  console.log('Setting table options...')
  tableOptions.friendly_name = jsonSchema.title
  tableOptions.description = jsonSchema.description || jsonSchema.title
  tableOptions.timePartitioning = {
    'type': 'DAY'
  }

  console.log('Checking if table exists...')
  const tableExists = await gbq.tableExists(project, datasetName, tableName)
  if (tableExists) {
    console.log('Patching table ' + tableName)
    await gbq.patchTable(project, datasetName, tableName, tableOptions)
  } else {
    console.log('Creating table' + tableName)
    await gbq.createTable(project, datasetName, tableName, tableOptions)
  }
  console.log('Finished')
}

jsbq.run = async () => {
  const fs = require('fs')
  const p = require('util')
  const readFile = p.promisify(fs.readFile)

  const argv = require('yargs')
  .usage('Usage: $0 -p [project] -d [dataset] -j [json schema file]')
  .demandOption(['p', 'd', 'j'])
  .argv

  const jsonSchema = await readFile(argv.j)
  await jsbq.process(argv.p, argv.d, JSON.parse(jsonSchema.toString()))
}

jsbq.run()

