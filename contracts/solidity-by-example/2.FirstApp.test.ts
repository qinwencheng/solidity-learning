import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Counter } from '../../typechain-types';

describe('Counter', function () {
    let counter: Counter;

    beforeEach(async function () {
        const Counter = await ethers.getContractFactory('Counter');
        counter = await Counter.deploy();
    });

    it('should return the current count', async function () {
        expect(await counter.get()).to.equal(0);
    });

    it('should return the current count', async function () {
        expect(await counter.count()).to.equal(0);
    });

    it('should increment the count by 1', async function () {
        await counter.inc();
        expect(await counter.get()).to.equal(1);
    });

    it('should revert with a custom error when trying to decrement below zero', async function () {
        // except 在外面
        // https://hardhat.org/hardhat-chai-matchers/docs/overview
        await expect(counter.dec()).to.be.revertedWithCustomError(counter, "NotNegativeNumber");
    });
});