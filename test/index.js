const jsonSchemaBigquery = require('../src/index')
const assert = require('assert')
const fs = require('fs')

describe('index', () => {

	describe('convert()', () => {
		const sampleDir = './test/samples'
		const testDirs = fs.readdirSync(sampleDir)

		testDirs.forEach(dir => {

			describe(dir, () => {
				const inJson = require(`../${sampleDir}/${dir}/input.json`)
				const expected = require(`../${sampleDir}/${dir}/expected.json`)
				let result

				before(() => {
					result = jsonSchemaBigquery.convert(inJson)
				})

				it('converts to big query', () => {
					//console.log(JSON.stringify(result, null, 2))
					assert.deepEqual(result, expected)
				})
			})
			
		})

	})
})
