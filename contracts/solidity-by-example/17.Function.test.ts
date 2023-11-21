import { ethers } from "hardhat";
import { expect } from "chai";
import { Function, XYZ } from "../../typechain-types";

describe("Function", function () {
    let func: Function;

    beforeEach(async function () {
        const Function = await ethers.getContractFactory("Function");
        func = await Function.deploy();
    });

    it("should return many values", async function () {
        expect(await func.returnMany()).to.deep.equal([1, true, 2]);
    });

    it("should return named values", async function () {
        expect(await func.named()).to.deep.equal([1, true, 2]);
    });

    it("should return assigned values", async function () {
        expect(await func.assigned()).to.deep.equal([1, true, 2]);
    });

    it("should return destructuring assignments", async function () {
        expect(await func.destructuringAssignments()).to.deep.equal([1, true, 2, 4, 6]);
    });

    it("should return array output", async function () {
        expect(await func.arrayOutput()).to.deep.equal([]);
    });
});

describe("XYZ", function () {
    let xyz: XYZ;

    beforeEach(async function () {
        const XYZ = await ethers.getContractFactory("XYZ");
        xyz = await XYZ.deploy();
    });

    it("should call function with many inputs", async function () {
        expect(await xyz.callFunc()).to.equal(0);
    });

    it("should call function with key-value inputs", async function () {
        expect(await xyz.callFuncWithKeyValue()).to.equal(0);
    });
});