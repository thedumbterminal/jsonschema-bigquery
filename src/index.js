const jsonSchemaBigquery = module.exports = {}

//Json schema on the left, bigquery on the right
const typeMapping = {
	'string': 'string',
	'boolean': 'boolean'
}

jsonSchemaBigquery.convert = (jsonSchema) => {
	if(!jsonSchema){
		throw new Error('No schema given')
	}
	return {
		schema: {
			fields: jsonSchemaBigquery._convertProperties(jsonSchema.properties)
		}
	}
}

jsonSchemaBigquery._convertProperties = (schema) => {
	return Object.keys(schema).map((item) => {
		return jsonSchemaBigquery._convertProperty(item, schema[item])
	})
}

jsonSchemaBigquery._convertProperty = (name, value) => {
	return {
		name: name,
		type: typeMapping[value.type]
	}
}
