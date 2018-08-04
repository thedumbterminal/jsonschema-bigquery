const merger = module.exports = {}

merger.merge = (schema) => {
	return schema.allOf.shift()
}
