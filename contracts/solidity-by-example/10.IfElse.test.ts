import { ethers } from 'hardhat';
import { expect } from 'chai';
import { IfElse } from '../../typechain-types';

describe('IfElse', function () {
    let ifElse: IfElse;

    beforeEach(async function () {
        const IfElseFactory = await ethers.getContractFactory('IfElse');
        ifElse = await IfElseFactory.deploy();
    });

    it('should return 0 if x < 10', async function () {
        expect(await ifElse.foo(5)).to.equal(0);
    });

    it('should return 1 if 10 <= x < 20', async function () {
        expect(await ifElse.foo(15)).to.equal(1);
    });

    it('should return 2 if x >= 20', async function () {
        expect(await ifElse.foo(25)).to.equal(2);
    });

    it('should return 1 if _x < 10', async function () {
        expect(await ifElse.ternary(5)).to.equal(1);
    });

    it('should return 2 if _x >= 10', async function () {
        expect(await ifElse.ternary(15)).to.equal(2);
    });

    it('should return same result for different users', async function () {
        const [owner, addr1] = await ethers.getSigners();
        expect(await ifElse.connect(owner).foo(5)).to.equal(await ifElse.connect(addr1).foo(5));
        expect(await ifElse.connect(owner).ternary(5)).to.equal(await ifElse.connect(addr1).ternary(5));
    });
});