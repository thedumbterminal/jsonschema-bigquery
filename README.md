# jsonschema-bigquery

[![npm](https://img.shields.io/npm/v/jsonschema-bigquery.svg)](https://www.npmjs.com/package/jsonschema-bigquery)
[![Build Status](https://travis-ci.org/thedumbterminal/jsonschema-bigquery.svg?branch=master)](https://travis-ci.org/thedumbterminal/jsonschema-bigquery)

Convert JSON schema to Google BigQuery schema

This includes the ability to:

1. Create tables
1. Patch tables

Further enhancements are planned: delete tables (dev only), create dataset, set data ACLs

Note that some features involve bespoke interpretation of schema details suited to our environment.

## Install

    npm install jsonschema-bigquery

## Consume

    jsbq -p <gbq project> -d <gbq dataset> -j <json schema file> --ignoreAdditional <boolean>

For embedded usage the following will allow and support runtime schema conversion and table maintenance:

    const jsonSchemaBigquery = require('jsonschema-bigquery')
    const bigquerySchema = jsonSchemaBigquery.run(jsonSchemaObject, options)

Please ensure that the input JSON schema is dereferenced so that all external references have been resolved. [json-schema-ref-parser](https://www.npmjs.com/package/json-schema-ref-parser) can do this, prior to using this module.

### Options

```
{
  ignoreAdditional: true
}
```

* `ignoreAdditional` - boolean, skip checking for additional properties in schemas.

## Test

    npm test
