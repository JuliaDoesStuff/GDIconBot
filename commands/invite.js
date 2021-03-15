const { Command, Embed } = require("../client");

module.exports = new Command({
	name: "invite",
	description: "Sends an invite link to the bot.",
	usage: "invite",
	examples: ["invite"],
	execute(client, message) {
		message.channel.send(new Embed({
			title: "Invite the bot!",
			url: "https://discord.com/api/oauth2/authorize?client_id=820703766356820018&permissions=8192&scope=bot"
		}));
	}
});