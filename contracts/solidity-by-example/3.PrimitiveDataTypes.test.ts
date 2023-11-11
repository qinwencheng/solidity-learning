import { ethers } from "hardhat";
import { expect } from "chai";
import { Primitives } from "../../typechain-types";

describe("Primitives", function () {
    let primitives: Primitives;

    beforeEach(async function () {
        const Primitives = await ethers.getContractFactory("Primitives");
        primitives = await Primitives.deploy();
    });

    it("should have correct default values", async function () {
        expect(await primitives.defaultBoo()).to.equal(false);
        expect(await primitives.defaultUint()).to.equal(0);
        expect(await primitives.defaultInt()).to.equal(0);
        expect(await primitives.defaultAddr()).to.equal(
            "0x0000000000000000000000000000000000000000"
        );
    });

    it("should have correct values for bool", async function () {
        expect(await primitives.boo()).to.equal(true);
    });

    it("should have correct values for uint", async function () {
        expect(await primitives.u8()).to.equal(1);
        expect(await primitives.u256()).to.equal(456);
        expect(await primitives.u()).to.equal(123);
    });

    it("should have correct values for int", async function () {
        expect(await primitives.i8()).to.equal(-1);
        expect(await primitives.i256()).to.equal(456);
        expect(await primitives.i()).to.equal(-123);
        expect(await primitives.minInt()).to.equal(
            "-57896044618658097711785492504343953926634992332820282019728792003956564819968"
        );
        expect(await primitives.maxInt()).to.equal(
            "57896044618658097711785492504343953926634992332820282019728792003956564819967"
        );
    });

    it("should have correct values for address", async function () {
        expect(await primitives.addr()).to.equal(
            "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c"
        );
    });

    it("should have correct values for bytes", async function () {
        expect(await primitives.a()).to.equal("0xb5");
        expect(await primitives.b()).to.equal("0x56");
    });
});