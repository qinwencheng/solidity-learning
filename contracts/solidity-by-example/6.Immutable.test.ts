import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Immutable } from '../../typechain-types';

describe('Immutable', function () {
    let immutable: Immutable;
    const MY_UINT = Math.round(Math.random() * 100);

    beforeEach(async function () {
        const Immutable = await ethers.getContractFactory('Immutable');
        immutable = await Immutable.deploy(MY_UINT);
    });

    it('should have the correct sender address and uint value', async function () {
        const [owner] = await ethers.getSigners();
        expect(await immutable.MY_ADDRESS()).to.equal(owner.address);
        expect(await immutable.MY_UINT()).to.equal(MY_UINT);
    });
});