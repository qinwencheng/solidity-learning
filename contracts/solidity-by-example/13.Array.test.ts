import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Array } from '../../typechain-types';

describe('Array', function () {
    let array: Array;

    beforeEach(async function () {
        const Array = await ethers.getContractFactory('Array');
        array = await Array.deploy();
    });

    it('should initialize with correct values', async function () {
        expect(await array.arr2(0)).to.equal(1);
        expect(await array.arr2(1)).to.equal(2);
        expect(await array.arr2(2)).to.equal(3);
        expect(await array.myFixedSizeArr(0)).to.equal(0);
    });

    it('should return the entire array', async function () {
        const someEle: bigint[] = [5n, 6n]
        await array.push(someEle[0]);
        await array.push(someEle[1]);
        const arr = await array.getArr();
        expect(arr).to.eql(someEle);
    });

    it('should push value to array', async function () {
        await array.push(5);
        expect(await array.get(0)).to.equal(5);
    });

    it('should pop value from array', async function () {
        await array.push(5);
        await array.pop();
        expect(await array.getLength()).to.equal(0);
        expect(await array.getArr()).to.eql([]);
    });

    it('should return correct array length', async function () {
        await array.push(5);
        await array.push(6);
        await array.push(7);
        await array.push(8);
        expect(await array.getLength()).to.equal(4);
        expect((await array.getArr()).length).to.equal(4);
    });

    it('should remove value at index', async function () {
        await array.push(5);
        await array.remove(0);
        expect(await array.get(0)).to.equal(0);
    });
});