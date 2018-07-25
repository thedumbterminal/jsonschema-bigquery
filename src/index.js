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
		const mode = jsonSchemaBigquery._getMode(required, item, schema[item])
		return jsonSchemaBigquery._convertProperty(item, schema[item], mode)
	})
}

jsonSchemaBigquery._getMode = (required, name, item) => {
	if(Array.isArray(item.type) && item.type.includes('null')){
		return 'NULLABLE'
	}
	return required.includes(name) ? 'REQUIRED' : 'NULLABLE'
}

jsonSchemaBigquery._convertProperty = (name, value, mode) => {
	let field = {
		name: name,
		type: jsonSchemaBigquery._getType(value.type),
		mode: mode
	}
	if(value.description){
		field.description = value.description
	}
	return field
}

jsonSchemaBigquery._getType = (types) => {
	if(!Array.isArray(types)){
		return typeMapping[types]
	}
	const notNullTypes = types.filter(item => item !== 'null')
	if(notNullTypes.length > 1){
		throw new Error('Multiple types are not allowed')
	}
	return typeMapping[notNullTypes[0]]
}

jsonSchemaBigquery._convertComplexProperty = (name, contents) => {
	return {
		name: name,
		type: 'RECORD',
		fields: jsonSchemaBigquery._convertProperties(contents.properties)
	}
}
