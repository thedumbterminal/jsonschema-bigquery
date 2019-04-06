const converter = require('../../src/converter')
const assert = require('assert')

describe('converter', () => {
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

  describe('_scalar()', () => {
    context('with an unknown type', () => {
      it('throws an error', () => {
        assert.throws(() => {
          converter._scalar('a_name', undefined, 'NULLABLE', 'a description')
        }, /Invalid type given: undefined for 'a_name'/)
      })
    })
  })
})
