const weaponInformation = {
	"slash": {
		name: "slash",
		type: "attack",
		answer: null,
		chanceforSuccess: 0.95,
		damage: 1,
		description: "\n95% chance of slashing the enemy",
	},
	"strike": {
		name: "strike",
		type: "attack",
		answer: null,
		chanceforSuccess: 0.80,
		damage: 2,
		description: "\n80% chance of causing a strong attack",
	},
	"critical": {
		name: "critical",
		type: "attack",
		answer: null,
		chanceforSuccess: 0.40,
		damage: 4,
		description: "\n40% chance of causing a brutal attack",
	},
	"heal": {
		name: "heal",
		type: "heal",
		answer: null,
		chanceforSuccess: 0.90,
		damage: 0.25,
		description: "\n90% chance of healing a teammate",
	},
	"poke": {
		name: "poke",
		type: "attack",
		answer: null,
		chanceforSuccess: 0.1,
		damage: 0.05,
		description: "\n10% chance of poking the enemy",
	},
};

const getWeaponInfo = (weapon, num = null) => {
	if (num) {
		const alphabet = ["a", "b", "c", "d", "e", "f", "g"];
		const shuffled = Object
			.entries(weaponInformation)
			.sort(() => 0.5 - Math.random())
			.slice(0, num)
			.reduce((obj, [k, v]) => ({
				...obj,
				[k]: v,
			}), {});
		// Sorry
		for (const i in Object.keys(shuffled)) {
			shuffled[Object.keys(shuffled)[i]].answer = alphabet[i];
		}
		return shuffled;
	}
	if (weapon && weaponInformation[weapon]) {
		return weaponInformation[weapon];
	}
	return weaponInformation;
};

module.exports = { getWeaponInfo };