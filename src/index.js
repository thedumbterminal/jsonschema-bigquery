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

jsonSchemaBigquery._isComplex = (schema) => schema.type === 'object'

jsonSchemaBigquery._convertProperties = (schema) => {
	return Object.keys(schema).map((item) => {
		if(jsonSchemaBigquery._isComplex(schema[item])){
			return jsonSchemaBigquery._convertComplexProperty(item, schema[item])
		}
		return jsonSchemaBigquery._convertProperty(item, schema[item])
	})
}

jsonSchemaBigquery._convertProperty = (name, value) => {
	return {
		name: name,
		type: typeMapping[value.type]
	}
}

jsonSchemaBigquery._convertComplexProperty = (name, contents) => {
	return {
		name: name,
		type: 'record',
		fields: jsonSchemaBigquery._convertProperties(contents.properties)
	}
}
