const _ = require('lodash');
const merger = module.exports = {}

merger.merge = (schema) => {
	let combined = {}
	schema.allOf.forEach((item) => {
		combined = _.assignWith(combined, item, merger._mergeProperties)
	})
	return combined
}

merger._mergeProperties = (dst, src) => {
	if(typeof dst === 'object' && typeof src === 'object'){
		return Object.assign({}, dst, src)
	}
	return undefined
}
