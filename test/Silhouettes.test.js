const Silhouettes = artifacts.require('./Silhouettes.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Silhouettes', ([deployer, owner, fee]) => {
  let sil

  before(async () => {
    sil = await Silhouettes.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await sil.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await sil.name()
      assert.equal(name, 'Silhouettes')
    })
  })

  describe('PNGs', async () => {
    let result, Increment
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await sil.uploadPNG(hash, 'PNG tags', { from: owner })
      Increment = await sil.Increment()
    })

    //check event
    it('creates PNGs', async () => {
      // SUCESS
      assert.equal(Increment, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), Increment.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.tags, 'PNG tags', 'tags is correct')
      assert.equal(event.fee, '0', 'fee amount is correct')
      assert.equal(event.owner, owner, 'owner is correct')


      // FAILURE: PNG must have hash
      await sil.uploadPNG('', 'PNG tags', { from: owner }).should.be.rejected;

      // FAILURE: PNG must have tags
      await sil.uploadPNG('PNG hash', '', { from: owner }).should.be.rejected;
    })

    //check from Struct
    it('lists PNGs', async () => {
      const PNG = await sil.PNGs(Increment)
      assert.equal(PNG.id.toNumber(), Increment.toNumber(), 'id is correct')
      assert.equal(PNG.hash, hash, 'Hash is correct')
      assert.equal(PNG.tags, 'PNG tags', 'tags is correct')
      assert.equal(PNG.fee, '0', 'fee amount is correct')
      assert.equal(PNG.owner, owner, 'owner is correct')
    })
  })
})