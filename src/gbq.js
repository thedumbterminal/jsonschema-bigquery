const gbq = (module.exports = {});
const { BigQuery } = require("@google-cloud/bigquery");
const { logger } = require("./log");

gbq.createTable = async (projectId, datasetId, tableId, schema) => {
  const bigquery = new BigQuery({ projectId });

  const [table] = await bigquery
    .dataset(datasetId)
    .createTable(tableId, schema);

  logger.info(`Table ${table.id} created.`);
};

gbq.patchTable = async (projectId, datasetId, tableId, schema) => {
  const bigquery = new BigQuery({ projectId });

  const res = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .setMetadata(schema);

  logger.info("Patch result:", res);
};

gbq.tableExists = async (projectId, datasetId, tableId) => {
  const bigquery = new BigQuery({ projectId });

  const table = await bigquery.dataset(datasetId).table(tableId);
  const res = await table.exists();
  logger.debug("Table check:", res);
  return res[0];
};
