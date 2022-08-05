const converter = require('../../src/converter')
const assert = require('assert')

describe('converter unit', () => {
  describe('_visit()', () => {
    context('when multiple types are given', () => {
      it('throws an error', () => {
        assert.throws(() => {
          const node = {
            type: ['string', 'boolean'],
          }
          converter._visit('test', node)
        }, /Union type not supported/)
      })
    })
  })

  describe('_bigQueryType()', () => {
    context('with an unknown type', () => {
      it('throws an error', () => {
        assert.throws(() => {
          const node = {
            type: 'foo',
          }
          converter._bigQueryType(node, 'foo')
        }, /SchemaError: Invalid type given: foo/)
      })
    })
  })

  describe('_merge_dicts_array()', () => {
    context('with two string enums', () => {
      it('returns the correct structure', () => {
        const source = [
          {
            type: 'string',
            enum: ['sweets'],
          },
          {
            type: 'string',
            enum: ['shoes'],
          },
        ]
        const result = converter._merge_dicts_array('oneOf', {}, source)
        const expected = {
          enum: ['sweets', 'shoes'],
          type: ['string'],
        }
        assert.deepStrictEqual(result, expected)
      })
    })

    context('with a nested oneOf containing two string enums', () => {
      it('returns the correct structure', () => {
        const source = [
          {
            oneOf: [
              {
                type: 'string',
                enum: ['sweets'],
              },
              {
                type: 'string',
                enum: ['shoes'],
              },
            ],
          },
          {
            type: 'string',
            enum: ['bag'],
          },
        ]
        const result = converter._merge_dicts_array('oneOf', {}, source)
        const expected = {
          enum: ['sweets', 'shoes', 'bag'],
          type: ['string'],
        }
        assert.deepStrictEqual(result, expected)
      })
    })
  })

  describe('_object()', () => {
    beforeEach(() => {
      converter._options = {}
    })

    context('without the "preventAdditionalObjectProperties" option', () => {
      it('allows additional properties', () => {
        const node = {
          properties: {
            name: {
              type: 'string',
            },
          },
        }
        assert.doesNotThrow(() => {
          converter._object('test', node, 'NULLABLE')
        }, /"object" type properties must have an '"additionalProperties": false' property/)
      })
    })

    context('with the "ignoreAdditional" option', () => {
      beforeEach(() => {
        converter._options = {
          preventAdditionalObjectProperties: true,
        }
      })

      it('does not allow additional properties', () => {
        const node = {
          properties: {},
        }
        assert.throws(() => {
          converter._object('test', node, 'NULLABLE')
        }, /"object" type properties must have an '"additionalProperties": false' property/)
      })
    })

    context('with no properties', () => {
      it('does not allow objects to not have properties defined', () => {
        assert.throws(() => {
          converter._object('test', {}, 'NULLABLE')
        }, /No properties defined for object/)
      })
    })

    context('with zero properties', () => {
      it('does not allow objects to have zero properties defined', () => {
        const node = {
          properties: {},
        }
        assert.throws(() => {
          converter._object('test', node, 'NULLABLE')
        }, /Record fields must have one or more child fields/)
      })
    })

    context('with no properties continueOnError', () => {
      beforeEach(() => {
        converter._options = {
          continueOnError: true,
        }
      })

      it('does not allow objects to not have properties defined', () => {
        assert.doesNotThrow(() => {
          converter._object('test', {}, 'NULLABLE')
        }, /No properties defined for object/)
      })
    })

    context('with zero properties continueOnError', () => {
      beforeEach(() => {
        converter._options = {
          continueOnError: true,
        }
      })

      it('does not allow objects to have zero properties defined', () => {
        const node = {
          properties: {},
        }
        assert.doesNotThrow(() => {
          converter._object('test', node, 'NULLABLE')
        }, /Record fields must have one or more child fields/)
      })
    })
  })

  describe('run()', () => {
    beforeEach(() => {
      converter.run(
        {
          type: 'boolean',
        },
        {
          option: true,
        }
      )
    })

    it('sets given options', () => {
      assert.deepStrictEqual(converter._options, {
        option: true,
      })
    })
  })

  describe('_scalar()', () => {
    context('with a field beginning with a number', () => {
      it('throws an error', () => {
        assert.throws(() => {
          converter._scalar('123test', 'STRING', 'NULLABLE')
        }, /Invalid field name: 123test/)
      })
    })

    context('with a field containing non alphanumeric characters', () => {
      it('throws an error', () => {
        assert.throws(() => {
          converter._scalar('test!', 'STRING', 'NULLABLE')
        }, /Invalid field name: test!/)
      })
    })

    context('with an single character field', () => {
      it('returns a bigquery field object', () => {
        assert.deepStrictEqual(converter._scalar('t', 'STRING', 'NULLABLE'), {
          mode: 'NULLABLE',
          name: 't',
          type: 'STRING',
        })
      })
    })

    context('with a valid field', () => {
      it('returns a bigquery field object', () => {
        assert.deepStrictEqual(
          converter._scalar('test123', 'STRING', 'NULLABLE'),
          {
            mode: 'NULLABLE',
            name: 'test123',
            type: 'STRING',
          }
        )
      })
    })
  })
})
