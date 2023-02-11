const { assert } = require('chai')

const Certificate = artifacts.require('./Certificate.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Color', (accounts) => {

    let contract

    before(async() => {
        contract = await Certificate.deployed()
    })

    describe('deployment', async () => {
        // it('deploy sucessfully', async () => {
        //     const address = contract.address
        //     console.log(address)
        //     assert.notEqual(address, '')
        //     assert.notEqual(address, '0x0')
        //     assert.notEqual(address, null)
        //     assert.notEqual(address, undefined)
        // })

        // it('has a uri', async () => {
        //     const uri1 = await contract.uri(1)
        //     assert.equal(uri1, 'MyCollectible')

        //     const uri2 = await contract.uri(2)
        //     assert.equal(uri1, 'MyCollectible')
        // })
    })
    describe('mint', async () => { 
        it('creates new token', async () => {
            // const supply1 = await contract.balanceOf("0x136A44AbD18d3B95d59762012C17CE82330D94c9", 1)

            // assert.equal(supply1, 3000)

            // const supply2 = await contract.balanceOf("0x136A44AbD18d3B95d59762012C17CE82330D94c9", 2)

            // assert.equal(supply2, 2000)

            const url1 = await contract.uri(2)

            console.log(url1)
        })
    })
}) 