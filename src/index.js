const jsonSchemaBigquery = module.exports = {}

//Json schema on the left, bigquery on the right
const typeMapping = {
	'string': 'STRING',
	'boolean': 'BOOLEAN',
	'date-time': 'TIMESTAMP',
	'integer': 'INTEGER',
	'number': 'FLOAT'
}

jsonSchemaBigquery.convert = (jsonSchema) => {
	if(!jsonSchema){
		throw new Error('No schema given')
	}
	return {
		schema: {
			fields: jsonSchemaBigquery._convertProperties(jsonSchema.properties, jsonSchema.required)
		}
	}
}

jsonSchemaBigquery._isComplex = (schema) => schema.type === 'object'

jsonSchemaBigquery._convertProperties = (schema, required = []) => {
	return Object.keys(schema).map((item) => {
		if(jsonSchemaBigquery._isComplex(schema[item])){
			return jsonSchemaBigquery._convertComplexProperty(item, schema[item])
		}
		const initialMode = jsonSchemaBigquery._initialMode(required, item)
		return jsonSchemaBigquery._convertProperty(item, schema[item], initialMode)
	})
}

jsonSchemaBigquery._initialMode = (required, field) => {
	return required.includes(field) ? 'REQUIRED' : 'NULLABLE'
}

jsonSchemaBigquery._convertProperty = (name, value, mode) => {
	return {
		name: name,
		type: typeMapping[value.type],
		mode: mode
	}
}

jsonSchemaBigquery._convertComplexProperty = (name, contents) => {
	return {
		name: name,
		type: 'RECORD',
		fields: jsonSchemaBigquery._convertProperties(contents.properties)
	}
}
