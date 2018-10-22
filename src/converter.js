const converter = module.exports = {}
const _ = require('lodash')

const JSON_SCHEMA_TO_BIGQUERY_TYPE_DICT = {
    'boolean': 'BOOLEAN',
    'date-time': 'TIMESTAMP',
    'integer': 'INTEGER',
    'number': 'FLOAT',
    'string': 'STRING'
}

function isObject(candidate) {
    return typeof candidate === 'object' && !Array.isArray(candidate)
}

function merge_property(merge_type, property_name, destination_value, source_value){
    //Merges two properties.
    var destination_list
    if (destination_value === undefined && source_value === undefined){
        return undefined
    }
    if (destination_value === undefined){
        return source_value
    }
    if (source_value === undefined){
        return destination_value
    }
    if (isObject(destination_value) && isObject(source_value)){
        return merge_dicts(merge_type, destination_value, source_value)
    }
    if (Array.isArray(destination_value)) { 
        destination_list = copy(destination_value)
    } else {
        destination_list = [destination_value]
    }
    if (Array.isArray(source_value )){
        source_list = source_value
    } else {
        source_list = [source_value]
    }
    if (property_name === 'required' && ['anyOf', 'oneOf'].includes(merge_type) ){
        return destination_list.filter( v => source_list.includes(v) )
    }
    destination_list.push(...source_list.filter(v=>!destination_list.includes(v)))
    return destination_list
}

function copy(o) {
    return _.clone(o, false)
}

function deepcopy(o) {
    return _.clone(o, true)
}

/**
 * Cloned from the original merge_dicts from python-based bigjson
 * This method had variable expansion, varags  and two slightly different
 * usages which appeared to be incompatible.
 * 
 * Could be returned to a single method 
 * 
 * Ssee merge_dicts for the alternate call pattern
 */
function merge_dicts_array(merge_type, dest_dict, source_dicts){ //Array was *dicts, merges multiple
    const result = deepcopy(dest_dict)
    for (let i = 0; i < source_dicts.length; i++) { 
        const source_dict = source_dicts[i]
        const keys = Object.keys(source_dict)
        for(let j=0; j<keys.length;j++){
            const name = keys[j]
            const merged_property = merge_property(merge_type, name, result[name], source_dict[name])
            if (merged_property){
                result[name] = merged_property
            }
        }
    } 
    return result
}

/**
 * The original merge_dicts from python-based bigjson
 * This method had variable expansion, varags  and two slightly different
 * usages which appeared to be incompatible.
 * 
 * Could be returned to a single method 
 * 
 * See merge_dicts_array above for the alternate call pattern
 **/
function merge_dicts(merge_type, dest_dict, source_dict){ //Merges a single object
    const result = deepcopy(dest_dict)
    const keys = Object.keys(source_dict)
    for(let j=0; j<keys.length;j++){
        const name = keys[j]
        const merged_property = merge_property(merge_type, name, result[name], source_dict[name])
        if (merged_property){
            result[name] = merged_property
        }
    }
    return result
}

function scalar(name, type_, mode, description){
    const bigquery_type = JSON_SCHEMA_TO_BIGQUERY_TYPE_DICT[type_]
    return { 'name': name,
             'type': bigquery_type,
             'mode': mode,
             'description': description
    }
}

function array(name, node, mode){
    var items_with_description = deepcopy(node['items'])
    if (_.has(items_with_description,'description')){
        items_with_description['description'] = node['description']
    }
    return visit(name, items_with_description, 'REPEATED')
}

function object_(name, node, mode){
    const required_properties = node['required'] || []
    const properties = node['properties']

    const fields = Object.keys(properties).map( key => {
        const required = required_properties.includes(key) ? 'REQUIRED' : 'NULLABLE'
        return visit(key,properties[key], required)
    })

    return { 'name': name,
             'type': 'RECORD',
             'mode': mode,
             'description': node['description'],
             'fields': fields
    }
}

function simple(name, type_, node, mode){
    if (type_ === 'array'){
        return array(name, node, mode)
    }
    if (type_ === 'object'){
        return object_(name, node, mode)
    }

    var actual_type = type_
    const format_ = node['format']

    if (type_ === 'string' && format_ === 'date-time' ){
        actual_type = format_
    }
    return scalar(name, actual_type, mode, node['description'])
}

function visit(name, node, mode='NULLABLE'){
    var merged_node = node
    const ofs = ['allOf', 'anyOf', 'oneOf']
    for ( x=0 ; x<ofs.length ; x++ ){
        const x_of = ofs[x]
        if (_.has(node,x_of) ){
            merged_node = merge_dicts_array(x_of, node, _.get(node,x_of))
            delete merged_node[x_of]
        }
    }
    var type_ = merged_node['type']
    var actual_mode = mode
    if (Array.isArray(type_)){
        non_null_types = type_.filter( scalar_type => scalar_type !== 'null')
        if (non_null_types.length > 1){
            throw new Error('union type not supported: {node}')
        }
        if ( type_.includes('null')){
            actual_mode = 'NULLABLE'
        }
        type_ = non_null_types[0]
    }
    return simple(name, type_, merged_node,  actual_mode)
}

function convert(input_schema){
    return  {
        schema: {
          fields: visit('root', input_schema).fields
        }
    }
}

function get_table_id(schema){
    const id = schema['id'].split('/')
    const name = id[-4,-2]
    const version = id[-2].split('.')[0]
    return '_'.join(name + [version])
}

// The original bigjson entry point
converter.run = (input_schema, project, dataset) => {
    return convert(input_schema)
}