import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Mapping, NestedMapping } from '../../typechain-types';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

describe('Mapping', function () {
    let mapping: Mapping;
    let owner: HardhatEthersSigner;

    beforeEach(async function () {
        const Mapping = await ethers.getContractFactory('Mapping');
        mapping = await Mapping.deploy();
        [owner] = await ethers.getSigners();
    });

    it('should return default value for unset address', async function () {
        expect(await mapping.get(owner.address)).to.equal(0);
    });

    it('should add and get value for an address', async function () {
        await mapping.set(owner.address, 100);
        expect(await mapping.get(owner.address)).to.equal(100);
        expect(await mapping.myMap(owner.address)).to.equal(100);
    });

    it('should change value for an address', async function () {
        await mapping.set(owner.address, 100);
        await mapping.set(owner.address, 200);
        expect(await mapping.get(owner.address)).to.equal(200);
    });

    it('should remove value for an address', async function () {
        await mapping.set(owner.address, 100);
        await mapping.remove(owner.address);
        expect(await mapping.get(owner.address)).to.equal(0);
    });
});

describe('NestedMapping', function () {
    let nestedMapping: NestedMapping;
    let owner: HardhatEthersSigner;


    beforeEach(async function () {
        const NestedMapping = await ethers.getContractFactory('NestedMapping');
        nestedMapping = await NestedMapping.deploy();
        [owner] = await ethers.getSigners();
    });

    it('should return default value for unset address and key', async function () {
        expect(await nestedMapping.get(owner.address, 1)).to.equal(false);
    });

    it('should add and get value for an address and key', async function () {
        await nestedMapping.set(owner.address, 1, true);
        expect(await nestedMapping.get(owner.address, 1)).to.equal(true);
    });

    it('should change value for an address and key', async function () {
        await nestedMapping.set(owner.address, 1, true);
        await nestedMapping.set(owner.address, 1, false);
        expect(await nestedMapping.get(owner.address, 1)).to.equal(false);
    });

    it('should remove value for an address and key', async function () {
        await nestedMapping.set(owner.address, 1, true);
        await nestedMapping.remove(owner.address, 1);
        expect(await nestedMapping.get(owner.address, 1)).to.equal(false);
    });
});