const converter = require('../../src/converter')
const assert = require('assert')
const fs = require('fs')

describe('converter integration', () => {
  describe('default options', () => {
    let sampleDir
    let testDirs

    before(() => {
      sampleDir = './test/integration/samples'
      testDirs = fs.readdirSync(sampleDir)
    })

    testDirs.forEach((dir) => { // eslint-disable-line mocha/no-setup-in-describe
      describe(dir, () => {
        let expected
        let result

        before(() => {
          const inJson = require(`../../${sampleDir}/${dir}/input.json`)
          expected = require(`../../${sampleDir}/${dir}/expected.json`)
          result = converter.run(inJson, 'p', 't')
        })

        it('converts to big query', () => {
          assert.deepStrictEqual(result, expected)
        })
      })
    })
  })

  describe('continueOnError option', () => {
    let sampleDir
    let testDirs

    before(() => {
      sampleDir = './test/integration/continueOnError'
      testDirs = fs.readdirSync(sampleDir)
    })

    testDirs.forEach((dir) => { // eslint-disable-line mocha/no-setup-in-describe
      describe(dir, () => {
        let expected
        let result

        before(() => {
          const inJson = require(`../../${sampleDir}/${dir}/input.json`)
          expected = require(`../../${sampleDir}/${dir}/expected.json`)
          const options = {
            continueOnError: true,
          }
          result = converter.run(inJson, options, 'p', 't')
        })

        it('converts to big query', () => {
          assert.deepStrictEqual(result, expected)
        })
      })
    })
  })
})
