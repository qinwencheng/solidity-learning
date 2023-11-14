import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Loop } from '../../typechain-types';

describe('Loop', function () {
    let loop: Loop;

    beforeEach(async function () {
        const LoopFactory = await ethers.getContractFactory('Loop');
        loop = await LoopFactory.deploy();
    });

    it('should execute loop function without reverting', async function () {
        await expect(loop.loop()).to.not.be.reverted;
    });
});