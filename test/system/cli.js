const assert = require('assert')
const execSync = require('child_process').execSync

describe('CLI', () => {
  context('without args', () => {
    it('shows help', () => {
      try {
        execSync('bin/jsbq')
      } catch (e) {
        const output = e.stderr.toString()
        assert.match(output, /Usage:/)
      }
    })
  })

  context('with a schema', () => {
    it('shows GBQ output', () => {
      const output = execSync(
        'bin/jsbq -j test/integration/samples/allOf/input.json',
      ).toString()
      assert.match(output, /RECORD/)
    })
  })
})
