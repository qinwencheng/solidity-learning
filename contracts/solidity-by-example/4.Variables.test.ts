import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Variables } from '../../typechain-types';

describe('Variables', function () {
    let variables: Variables;

    beforeEach(async function () {
        const Variables = await ethers.getContractFactory('Variables');
        variables = await Variables.deploy();
    });

    it('should have initial values', async function () {
        expect(await variables.text()).to.equal('Hello');
        expect(await variables.num()).to.equal(123);
    });

    it('should do something', async function () {
        const [owner] = await ethers.getSigners();
        // 相当于 await variables.doSomething()
        // 因为默认使用第一个签名者
        const [i, timestamp, sender] = await variables.connect(owner).doSomething();
        expect(i).to.equal(456);

        const blockNumber = await ethers.provider.getBlockNumber();
        const block = await ethers.provider.getBlock(blockNumber);
        const blockTimestamp = block?.timestamp;
        expect(timestamp).to.equal(blockTimestamp);

        expect(sender).to.equal(owner.address);
    });
});