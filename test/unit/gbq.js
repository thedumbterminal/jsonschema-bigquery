const gbq = require('../../src/gbq')
const assert = require('assert')
const { BigQuery } = require('@google-cloud/bigquery')
const sinon = require('sinon')

describe('gbq', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('createTable()', () => {
    context('when a table is created successfully', () => {
      beforeEach(() => {
        sinon.stub(BigQuery.prototype, 'dataset').returns({
          createTable: sinon.stub().returns([
            {
              id: 'FAKE',
            },
          ]),
        })
      })

      it('it does not throw', async () => {
        await assert.doesNotReject(async () => {
          await gbq.createTable(
            'dummy-project',
            'dummy-dataset',
            'dummy-table',
            {
              schema: { fields: [] },
            },
          )
        })
      })
    })
  })

  describe('patchTable()', () => {
    context('when a table is patched successfully', () => {
      beforeEach(() => {
        sinon.stub(BigQuery.prototype, 'dataset').returns({
          table: sinon.stub().returns({
            setMetadata: sinon.stub().returns({
              id: 'FAKE',
            }),
          }),
        })
      })

      it('it does not throw', async () => {
        await assert.doesNotReject(async () => {
          await gbq.patchTable(
            'dummy-project',
            'dummy-dataset',
            'dummy-table',
            {
              schema: { fields: [] },
            },
          )
        })
      })
    })
  })

  describe('tableExists()', () => {
    context('when the table exists', () => {
      beforeEach(() => {
        sinon.stub(BigQuery.prototype, 'dataset').returns({
          table: sinon.stub().returns({
            exists: sinon.stub().returns([true]),
          }),
        })
      })

      it('it returns true', async () => {
        const result = await gbq.tableExists(
          'dummy-project',
          'dummy-dataset',
          'dummy-table',
        )
        assert.strictEqual(result, true)
      })
    })
  })
})
