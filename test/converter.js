const converter = require('../src/converter')
const assert = require('assert')
const fs = require('fs')

describe('converter', () => {
  describe('run()', () => {
    const sampleDir = './test/samples'
    const testDirs = fs.readdirSync(sampleDir)

    testDirs.forEach(dir => {
      describe(dir, () => {
        const inJson = require(`../${sampleDir}/${dir}/input.json`)
        const expected = require(`../${sampleDir}/${dir}/expected.json`)
        let result

        before(() => {
          result = converter.run(inJson,'p','t')
        })

        it('converts to big query', () => {
          assert.deepStrictEqual(result, expected)
        })
      })
    })
  })

  describe('_visit()', () => {
    context('when multiple types are given', () => {
      it('throws an error', () => {
        assert.throws(() => {
          const node = {
            type: [
              'string',
              'boolean'
            ]
          }
          converter._visit('test', node)
        }, /union type not supported/)
      })
    })
  })
})
