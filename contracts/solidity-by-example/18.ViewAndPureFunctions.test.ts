import { ethers } from "hardhat";
import { expect } from "chai";
import { ViewAndPure } from "../../typechain-types";

describe("ViewAndPure", function () {
    let viewAndPure: ViewAndPure;

    beforeEach(async function () {
        const ViewAndPure = await ethers.getContractFactory("ViewAndPure");
        viewAndPure = await ViewAndPure.deploy();
    });

    describe("Correct setup", () => {
        it("should have initial value of x as 1", async function () {
            expect(await viewAndPure.x()).to.equal(1);
        });
    });

    describe("addToX function", () => {
        it("should add input to x without modifying x", async function () {
            const y = 5;
            expect(await viewAndPure.addToX(y)).to.equal(1 + y);
            expect(await viewAndPure.x()).to.equal(1); // x should still be 1
        });
    });

    describe("add function", () => {
        it("should add two inputs correctly", async function () {
            const i = 7, j = 3;
            expect(await viewAndPure.add(i, j)).to.equal(i + j);
        });

        it("should handle zero inputs", async function () {
            const i = 0, j = 0;
            expect(await viewAndPure.add(i, j)).to.equal(0);
        });

        it("should handle large inputs", async function () {
            const i = ethers.MaxUint256;
            const j = ethers.MaxUint256;
            await expect(viewAndPure.add(i, j)).to.be.reverted; // overflow
        });
    });
});