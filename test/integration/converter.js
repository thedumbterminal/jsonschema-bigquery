const converter = require('../../src/converter')
const assert = require('assert')
const fs = require('fs')

describe('converter integration', () => {
  describe('default options', () => {
    const sampleDir = './test/integration/samples'
    // eslint-disable-next-line mocha/no-setup-in-describe
    const testDirs = fs.readdirSync(sampleDir)

    // eslint-disable-next-line mocha/no-setup-in-describe
    testDirs.forEach((dir) => {
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
    const sampleDir = './test/integration/continueOnError'
    // eslint-disable-next-line mocha/no-setup-in-describe
    const testDirs = fs.readdirSync(sampleDir)

    // eslint-disable-next-line mocha/no-setup-in-describe
    testDirs.forEach((dir) => {
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

  describe('continueOnError and preventAdditionalObjectProperties options', () => {
    const sampleDir =
      './test/integration/continueOnErrorAndPreventAdditionalObjectProperties'
    // eslint-disable-next-line mocha/no-setup-in-describe
    const testDirs = fs.readdirSync(sampleDir)

    // eslint-disable-next-line mocha/no-setup-in-describe
    testDirs.forEach((dir) => {
      describe(dir, () => {
        let expected
        let result

        before(() => {
          const inJson = require(`../../${sampleDir}/${dir}/input.json`)
          expected = require(`../../${sampleDir}/${dir}/expected.json`)
          const options = {
            continueOnError: true,
            preventAdditionalObjectProperties: true,
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
