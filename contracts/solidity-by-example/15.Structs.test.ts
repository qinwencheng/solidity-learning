import { ethers } from "hardhat";
import { expect } from "chai";
import { Todos } from "../../typechain-types";

describe("Todos", function () {
    let todos: Todos;

    beforeEach(async function () {
        const Todos = await ethers.getContractFactory("Todos");
        todos = await Todos.deploy();
    });

    describe("create", () => {
        it("should create a new todo", async function () {
            await todos.create("Test Todo");
            const todo = await todos.get(0);
            expect(todo.text).to.equal("Test Todo");
            expect(todo.completed).to.equal(false);
            expect(await todos.todo2()).to.eql(["", false]);
        });
    });

    describe("get", () => {
        it("should get a todo", async function () {
            await todos.create("Test Todo");
            const todo = await todos.get(0);
            expect(todo.text).to.equal("Test Todo");
            expect(todo.completed).to.equal(false);
        });

        it("should revert if index is out of bounds", async function () {
            await expect(todos.get(0)).to.be.revertedWithPanic(0x32)
        });
    });

    describe("updateText", () => {
        it("should update the text of a todo", async function () {
            await todos.create("Test Todo");
            await todos.updateText(0, "Updated Todo");
            const todo = await todos.get(0);
            expect(todo.text).to.equal("Updated Todo");
        });

        it("should revert if index is out of bounds", async function () {
            await expect(todos.updateText(0, "Updated Todo")).to.be.revertedWithPanic(0x32);
        });
    });

    describe("toggleCompleted", () => {
        it("should toggle the completed status of a todo", async function () {
            await todos.create("Test Todo");
            await todos.toggleCompleted(0);
            const todo = await todos.get(0);
            expect(todo.completed).to.equal(true);
        });

        it("should revert if index is out of bounds", async function () {
            await expect(todos.toggleCompleted(0)).to.be.revertedWithPanic(0x32)
        });
    });
});