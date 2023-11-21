import { ethers } from "hardhat";
import { expect } from "chai";
import { DataLocations } from "../../typechain-types";

describe("DataLocations", function () {
    let dataLocations: DataLocations;

    beforeEach(async function () {
        const DataLocations = await ethers.getContractFactory("DataLocations");
        dataLocations = await DataLocations.deploy();
    });

    describe("Correct setup", () => {

        it("should be able to call function f", async function () {
            await expect(dataLocations.f()).to.not.be.reverted;
        });

        it("should be able to call function g", async function () {
            await expect(dataLocations.g()).to.not.be.reverted;
        });

        it("should be able to call function h", async function () {
            await expect(dataLocations.h([1,2], 1)).to.not.be.reverted;
        });
    });
});
