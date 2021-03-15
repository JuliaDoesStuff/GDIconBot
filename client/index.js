const BotClient = require("./lib/BotClient");
const BotCommand = require("./lib/BotCommand");
const BotEmbed = require("./lib/BotEmbed");
const BotEvent = require("./lib/BotEvent");

class GDIconBot {
	constructor() {
		throw new Error("No constructor is used for class GDIconBot")
	}

	static Client = BotClient;
	static Command = BotCommand;
	static Embed = BotEmbed;
	static Event = BotEvent;
}

module.exports = GDIconBot;