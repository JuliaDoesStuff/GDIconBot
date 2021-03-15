const { MessageEmbed } = require("discord.js");

class BotEmbed extends MessageEmbed {
	constructor(data) {
		super(data);

		this.color = Math.floor(Math.random() * 16777216);
		this.footer = { text: "GD Icon Bot by BokuWaBoingo" };
		this.timestamp = new Date();
	}
}

module.exports = BotEmbed;