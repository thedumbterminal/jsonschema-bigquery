# jsonschema-bigquery

[![npm](https://img.shields.io/npm/v/jsonschema-bigquery.svg)](https://www.npmjs.com/package/jsonschema-bigquery)
[![Build Status](https://travis-ci.org/thedumbterminal/jsonschema-bigquery.svg?branch=master)](https://travis-ci.org/thedumbterminal/jsonschema-bigquery)

Convert JSON schema to Google BigQuery schema

## Install

    npm install jsonschema-bigquery

## Consume

    const jsonSchemaBigquery = require('jsonschema-bigquery')
    
    const inJson = {
    	"description": "Example description",
    	"type": "object",
    	"properties": {
    		"first_name": { "type": "string" },
    		"address": {
    			"type": "object",
    			"properties": {
    				"street_address": { "type": "string" }
    			}
    		}
    	}
    }
    
    const bigquery = jsonSchemaBigquery.convert(inJson)

Please ensure that the input JSON schema is dereferenced so that all external references have been resolved. [json-schema-ref-parser](https://www.npmjs.com/package/json-schema-ref-parser) can do this, prior to using this module.

## Test

    npm test

## TODO

* Error messages.
* Handle `oneOf`, `anyOf` and `allOf`.
