const converter = require('../../src/converter')
const assert = require('assert')
const fs = require('fs')

describe('converter integration', () => {
  describe('default options', () => {
    const sampleDir = './test/integration/samples'
    const testDirs = fs.readdirSync(sampleDir)

    testDirs.forEach((dir) => {
      describe(dir, () => {
        const inJson = require(`../../${sampleDir}/${dir}/input.json`)
        const expected = require(`../../${sampleDir}/${dir}/expected.json`)
        let result

        before(() => {
          result = converter.run(inJson, 'p', 't')
        })

        it('converts to big query', () => {
          assert.deepStrictEqual(result, expected)
        })
      })
    })
  })

  describe('continueOnError option', () => {
    const sampleDir = './test/integration/continueOnError'
    const testDirs = fs.readdirSync(sampleDir)

    testDirs.forEach((dir) => {
      describe(dir, () => {
        const inJson = require(`../../${sampleDir}/${dir}/input.json`)
        const expected = require(`../../${sampleDir}/${dir}/expected.json`)
        const options = {
          continueOnError: true,
        }

        let result

        before(() => {
          result = converter.run(inJson, options, 'p', 't')
        })

        it('converts to big query', () => {
          assert.deepStrictEqual(result, expected)
        })
      })
    })
  })
})
