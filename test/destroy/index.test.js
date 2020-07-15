/* eslint-disable no-undef */

const { expect } = require("chai");
const User = require("../../models/User");
const destroyCommand = require("../../commands/destroy");
const { destroyHandler, checkIfDestroyIsPossible } = require("../../game/destroy/destroy");
const { createTestUser, generateDiscordMessage } = require("../helper");


describe("destroy commands", () => {
	beforeEach("beforeEach, cleaning db", async ()=>{
		await User.deleteMany();
	});

	it("destroy command should exist", () => {
		expect(destroyCommand).to.not.equal(undefined);
	});

	it("destroy handler should exist", () => {
		expect(destroyHandler).to.not.equal(undefined);
	});

	it("checkIfDestroyIsPossible should exist", () => {
		expect(checkIfDestroyIsPossible).to.not.equal(undefined);
	});

	it("should be denied if the arguments match no buildings of the user", async ()=>{
		const testUser = await createTestUser();
		const { response } = checkIfDestroyIsPossible(testUser, "yolo");

		expect(response).to.be.equal(false);
	});

	it("should be denied if the argument coordinates match no building coordinates of the user", async ()=>{
		const testUser = await createTestUser();
		const { response } = checkIfDestroyIsPossible(testUser, "1.1");

		expect(response).to.be.equal(false);
	});

	it("should be denied if the argument name match no building name of the user", async ()=>{
		const testUser = await createTestUser();
		const { response } = checkIfDestroyIsPossible(testUser, "farm");

		expect(response).to.be.equal(false);
	});

	it("should have barracks at position 0.0 as default for testUser", async ()=>{
		const testUser = await createTestUser();

		const check = (user) => {
			if(user.empire.length === 1 && user.empire[0].name === "barracks" && user.empire[0].position[0] === 0 && user.empire[0].position[1] === 0) return true;
			return false;
		};

		expect(check(testUser)).to.be.equal(true);
	});

	it("should remove a building if the correct coordinates are applied", async ()=>{
		const testUser = await createTestUser();

		const mockMessage = generateDiscordMessage(testUser);

		await destroyCommand.execute(mockMessage, ["0.0"], testUser);

		expect(testUser.empire.length).to.be.equal(0);
	});

	it("should remove a building if the correct name is applied", async ()=>{
		const testUser = await createTestUser();

		const mockMessage = generateDiscordMessage(testUser);

		await destroyCommand.execute(mockMessage, ["barracks"], testUser);

		expect(testUser.empire.length).to.be.equal(0);
	});

	it("should not remove building if no arguments are applied", async ()=>{
		const testUser = await createTestUser();

		const mockMessage = generateDiscordMessage(testUser);

		await destroyCommand.execute(mockMessage, [], testUser);

		expect(testUser.empire.length).to.be.equal(1);
	});

	it("should not remove building if incorrect name is applied", async ()=>{
		const testUser = await createTestUser();

		const mockMessage = generateDiscordMessage(testUser);

		await destroyCommand.execute(mockMessage, ["farm"], testUser);

		expect(testUser.empire.length).to.be.equal(1);
	});
});
