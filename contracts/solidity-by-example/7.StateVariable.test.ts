import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SimpleStorage } from '../../typechain-types';

describe('SimpleStorage', function () {
    let simpleStorage: SimpleStorage;

    beforeEach(async function () {
        const SimpleStorage = await ethers.getContractFactory('SimpleStorage');
        simpleStorage = await SimpleStorage.deploy();
    });

    it('should have initial value as 0', async function () {
        expect(await simpleStorage.num()).to.equal(0);
    });

    it('should set the value of num correctly', async function () {
        await simpleStorage.set(5);
        expect(await simpleStorage.num()).to.equal(5);
    });

    it('should be accessible by different users', async function () {
        const [_, user1, user2] = await ethers.getSigners();

        expect(await simpleStorage.connect(user1).num()).to.equal(0);
        expect(await simpleStorage.connect(user2).num()).to.equal(0);

        const randomNum = Math.floor(Math.random() * 100);
        await simpleStorage.set(randomNum);

        expect(await simpleStorage.num()).to.equal(randomNum);
        expect(await simpleStorage.connect(user2).num()).to.equal(randomNum);
    });

    // it('should not be modifiable by different users', async function () {
    //     const [_, user1] = await ethers.getSigners();
    //     await expect(simpleStorage.connect(user1).set(10)).to.be.reverted;
    // });

    it('should not be modifiable without sending a transaction', async function () {
        await expect(simpleStorage.get()).to.be.reverted;
    });
});