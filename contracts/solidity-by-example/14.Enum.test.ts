import { ethers } from "hardhat";
import { expect } from "chai";
import { Enum } from "../../typechain-types";

describe("Enum", function () {
    let enumContract: Enum;

    enum Status {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }

    beforeEach(async function () {
        const Enum = await ethers.getContractFactory("Enum");
        enumContract = await Enum.deploy();
    });

    describe("Correct setup", () => {
        it("should have initial status as Pending", async function () {
            expect(await enumContract.get()).to.equal(Status.Pending);
        });
    });

    describe("Status updates", () => {
        it("should update status to Shipped", async function () {
            await enumContract.set(Status.Shipped);
            expect(await enumContract.get()).to.equal(Status.Shipped);
        });

        it("should update status to Accepted", async function () {
            await enumContract.set(2);
            expect(await enumContract.get()).to.equal(Status.Accepted);
        });

        it("should update status to Rejected", async function () {
            await enumContract.set(3);
            expect(await enumContract.get()).to.equal(Status.Rejected);
        });

        it("should update status to Canceled", async function () {
            await enumContract.cancel();
            expect(await enumContract.get()).to.equal(Status.Canceled);
        });

        it("should reset status to Pending", async function () {
            await enumContract.reset();
            expect(await enumContract.get()).to.equal(Status.Pending);
        });
    });

    describe("Error scenarios", () => {
        it("should revert if status is set to an invalid enum value", async function () {
            await expect(enumContract.set(5)).to.be.reverted;
        });
    });
});