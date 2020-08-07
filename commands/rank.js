const { handleRank } = require("../game/rank");


module.exports = {
	name: "rank",
	description: "Shows best players based upon various ranking systems",

	async execute(message, args, user) {
		const allowedTypes = ["xp", "elo", "army", "quest", "sfa"];
		let rankType;
		if (allowedTypes.includes(args.join(""))) {
			rankType = args.join("");
		}
		else {
			rankType = "help";
		}
		const result = await handleRank(rankType, user);


		return message.channel.send(result);
	},
};