import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Gas } from '../../typechain-types';

describe('Gas', function () {
    let gas: Gas;

    beforeEach(async function () {
        const GasFactory = await ethers.getContractFactory('Gas');
        gas = await GasFactory.deploy();
    });

    it('should have initial value as 0', async function () {
        expect(await gas.i()).to.equal(0);
    });

    it('should fail due to gas exhaustion', async function () {
        const [owner] = await ethers.getSigners();
        await expect(gas.connect(owner).forever({gasLimit: 100000})).to.be.reverted;
    });

    it('should not increment i after failed transaction', async function () {
        const [owner] = await ethers.getSigners();
        const initialI = await gas.i();
        await expect(gas.connect(owner).forever({gasLimit: 100000})).to.be.reverted;
        expect(await gas.i()).to.equal(initialI);
    });
});