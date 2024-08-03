const utils = require('../../src/utils')
const assert = require('assert')

describe('utils', () => {
  describe('get_table_id()', () => {
    it('it supports a short path', () => {
      assert.equal(
        utils.get_table_id('/events/one/two/v1.2.3/schema.json'),
        'one_two_v1',
      )
    })

    it('it supports a long path', () => {
      assert.equal(
        utils.get_table_id('/events/one/two/three/four/v1.2.3/schema.json'),
        'one_two_three_four_v1',
      )
    })
  })
})
