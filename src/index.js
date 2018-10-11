const merger = require('./merger')

const jsonSchemaBigquery = module.exports = {}

// Json schema on the left, bigquery on the right
const typeMapping = {
  'string': 'STRING',
  'boolean': 'BOOLEAN',
  'date-time': 'TIMESTAMP',
  'integer': 'INTEGER',
  'number': 'FLOAT',
  'object': 'RECORD'
}

jsonSchemaBigquery.convert = (jsonSchema) => {
  if (!jsonSchema) {
    throw new Error('No schema given')
  }
  return {
    schema: {
      fields: jsonSchemaBigquery._convertProperties(jsonSchema.properties, jsonSchema.required)
    }
  }
}

jsonSchemaBigquery._isNested = (schema) => schema.type === 'object'
jsonSchemaBigquery._isRepeated = (schema) => schema.type === 'array'
jsonSchemaBigquery._isCombined = (schema) => Boolean(schema.allOf || schema.anyOf || schema.oneOf)

jsonSchemaBigquery._convertProperties = (schema, required = []) => {
  return Object.keys(schema).map((item) => {
    let property = schema[item]
    if (jsonSchemaBigquery._isCombined(schema[item])) {
      property = merger.merge(schema[item])
    }
    if (jsonSchemaBigquery._isNested(property)) {
      return jsonSchemaBigquery._convertNestedProperty(item, property)
    } else if (jsonSchemaBigquery._isRepeated(property)) {
      return jsonSchemaBigquery._convertRepeatedProperty(item, property)
    }
    const mode = jsonSchemaBigquery._getMode(required, item, property)
    return jsonSchemaBigquery._convertProperty(item, property, mode)
  })
}

jsonSchemaBigquery._getMode = (required, name, item) => {
  if (Array.isArray(item.type) && item.type.includes('null')) {
    return 'NULLABLE'
  }
  return required.includes(name) ? 'REQUIRED' : 'NULLABLE'
}

jsonSchemaBigquery._convertProperty = (name, value, mode) => {
  let field = {
    name: name,
    type: jsonSchemaBigquery._getType(value),
    mode: mode
  }
  if (value.description) {
    field.description = value.description
  }
  return field
}

jsonSchemaBigquery._getType = (field) => {
  let type
  if (Array.isArray(field.type)) {
    const notNullTypes = field.type.filter(item => item !== 'null')
    if (notNullTypes.length > 1) {
      throw new Error('Multiple types are not allowed')
    }
    type = notNullTypes[0]
  } else {
    type = field.type
  }
  if (field.format === 'date-time') {
    type = field.format
  }
  return typeMapping[type]
}

jsonSchemaBigquery._convertNestedProperty = (name, contents, mode) => {
  let field = {
    name: name,
    type: jsonSchemaBigquery._getType(contents),
    fields: jsonSchemaBigquery._convertProperties(contents.properties)
  }
  if (mode) {
    field.mode = mode
  }
  if (contents.description) {
    field.description = contents.description
  }
  return field
}

jsonSchemaBigquery._convertRepeatedProperty = (name, contents) => {
  if (jsonSchemaBigquery._isNested(contents.items)) {
    return jsonSchemaBigquery._convertNestedProperty(name, contents.items, 'REPEATED')
  }
  return jsonSchemaBigquery._convertProperty(name, contents.items, 'REPEATED')
}
