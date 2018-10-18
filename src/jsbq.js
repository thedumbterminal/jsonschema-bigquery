const jsbq = module.exports = {}

const jsonSchemaBigquery = require('./index')
const gbq = require('./gbq')
const util = require('./util')
const logger = require('log-driver').logger

jsbq.process = async (project, datasetName, jsonSchema) => {
  logger.info('Processing json schema...')
  const tableOptions = jsonSchemaBigquery.convert(jsonSchema)
  logger.info(JSON.stringify(tableOptions))
  
  logger.info('Extracting table name from schema...')
  const tableName = util.get_table_id(jsonSchema.id)
  logger.info('Table name is ' + tableName)

  logger.info('Setting table options...')
  tableOptions.friendly_name = jsonSchema.title
  tableOptions.description = jsonSchema.description || jsonSchema.title
  tableOptions.timePartitioning = {
    'type': 'DAY'
  }

  logger.info('Checking if table exists...')
  const tableExists = await gbq.tableExists(project, datasetName, tableName)
  if (tableExists) {
    logger.info('Patching table ' + tableName)
    await gbq.patchTable(project, datasetName, tableName, tableOptions)
  } else {
    logger.info('Creating table ' + tableName)
    await gbq.createTable(project, datasetName, tableName, tableOptions)
  }
  logger.info('Finished')
}

jsbq.run = async () => {
  const fs = require('fs')
  const p = require('util')
  const readFile = p.promisify(fs.readFile)

  const argv = require('yargs')
  .usage('Usage: $0 -p [project] -d [dataset] -j [json schema file]')
  .demandOption(['p', 'd', 'j'])
  .argv

  const jsonSchema = require('./' + argv.j)
  logger.debug('Schema is: ' + JSON.stringify(jsonSchema))
  await jsbq.process(argv.p, argv.d, jsonSchema)
}

jsbq.run()

