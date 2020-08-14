const { handleBuyCommand } = require("../game/buy/buy-item");

module.exports = {
	name: "buy",
	aliases: ["shop"],
	description: "Used to buy consumables items from the shop. You can use the bought items with `!use <itemName`. This is useful to get your health back up on your hero. Try `!buy small healing potion` to buy your first item or `!buy` to display all your consumables. If you are missing a shop try `!build shop`.",
	usage: "!buy 2 small healing potion",
	shortcuts: {
		shp: "small healing potion",
		lhp: "large healing potion",
		ehp: "enourmous healing potion",
		qhp: "quality healing potion",
		mhp: "mega healing potion",
		uhp: "ultra healing potion",
		shs: "small healing salve",
		lhs: "large healing salve",
	},
	async execute(message, args, user) {
		const response = await handleBuyCommand(args, user);

		message.channel.send(`<@${message.author.id}>'s shop: \n ${response}`);
	},
};