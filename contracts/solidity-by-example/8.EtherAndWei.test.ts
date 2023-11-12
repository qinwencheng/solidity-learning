import { ethers } from 'hardhat';
import { expect } from 'chai';
import { EtherUnits } from '../../typechain-types';

describe('EtherUnits', function () {
    let etherUnits: EtherUnits;

    beforeEach(async function () {
        const EtherUnits = await ethers.getContractFactory('EtherUnits');
        etherUnits = await EtherUnits.deploy();
    });

    it('should have initial values', async function () {
        expect(await etherUnits.oneWei()).to.equal(1);
        expect(await etherUnits.isOneWei()).to.be.true;

        expect(await etherUnits.oneGwei()).to.equal(BigInt(1e9).valueOf());
        expect(await etherUnits.isOneGwei()).to.be.true;
        
        expect(await etherUnits.oneEther()).to.equal(BigInt(1e18).valueOf());
        expect(await etherUnits.isOneEther()).to.be.true;
    });
});